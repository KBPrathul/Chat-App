import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

/*
Simple req-res cycle: Client sends a request to the server, server processes the request and sends a response back to the client, and closes the connection.
                      This is a one-time and one-way communication. If the client wants to send another request, it has to repeat.

So, in a chatting app, the sender sends the message, but the receiver won't get the message in real time. They have to send a request to the server (refresh the page) to get the message.
So, every user has to keep sending requests (every second maybe) to the server to get the new messages, which is not efficient (too many req, so load on server inc) and good experience for the users. This method is called polling.

Solution for the above problem is WebSockets, which is a protocol that allows for full-duplex (duplex means bidirectional) communication channels over a single TCP connection.

TCP (Transmission Control Protocol) is a core internet standard that ensures reliable, ordered, and error-checked delivery of data between applications over a network.

socket.io (a library) makes it easy to implement WebSockets in our application.

With socket.io (WebSockets), we can have a two-way communication between the client and the server. The client can send a message to the server and the server can send a message to the client without the client having to send a request first. This is called real-time communication.
*/

// Socket server is added on top of our express server.
// Without this, the sent message is added to database but the receiver won't get the message in real time. They have to refresh the page to see the new message.
// With this, we can emit an event from the server whenever a message is sent and listen to that event on the client side.

const server = http.createServer(app);

// Socket gives us some cors errors, so we have to add some options to it, which is the below code
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

export const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
}

const userSocketMap = {}; // userId: socketId

// socket is going to be the user that is connected
io.on("connection", (socket) => {
    console.log("A user connected", socket.id);

    const userId = socket.handshake.query.userId;
    if (userId!="undefined") {
        userSocketMap[userId] = socket.id;
    }

    // We have to send an event to all the connected clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    // socket.on() is used to listen to an event, in this case, we are listening to the "disconnect" event.
    // We can also listen to other events, like when a message is sent, we can emit an event from the client side and listen to that event on the server side to update the chat in real time.
    // They can be used on both the server and clients side.
    socket.on("disconnect", () => {
        console.log("A user disconnected", socket.id);
        delete userSocketMap[userId];
        // Again we have to let everyone know that the user has disconnected.
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});

export {app,io,server};