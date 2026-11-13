import Conversation from "../models/Conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
  try{
    // We are getting the message as an input from the user (req)
    const {message} = req.body;
    // const {id} = req.params;    is same as    const id = req.params.id;
    // Then we are renaming id to receiverId
    const {id:receiverId} = req.params;
    // We have added req.user in our protectRoute middleware, so we can access the authenticated user's information.
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
        // The below is mongoose syntax
        participants: { $all: [senderId, receiverId] }
    });

    // This is the first conversation between the sender and the receiver, so we need to create a new conversation document in the database
    if(!conversation){
        conversation = await Conversation.create({
            participants: [senderId, receiverId],
            // Messages has default value.
        });
    }

    const newMessage = new Message({
        senderId,
        receiverId,
        message,
    });

    // Pushing the new message to the conversation's message array, so that we can keep track of all the messages in the conversation.
    if(newMessage){
      conversation.messages.push(newMessage._id);
    }

    // Saving the conversation and the new message to the database.
    /*
    await conversation.save();
    await newMessage.save();
    */

    // This will run both the above in parallel, and so is more optimized.
    await Promise.all([conversation.save(), newMessage.save()]);

    const receiverSocketId = getReceiverSocketId(receiverId);
    if(receiverSocketId){
        // We are using to instead of emit as we want to sent this only to one particular client, not all of them.
        io.to(receiverSocketId).emit("newMessage",newMessage);
    }

    res.status(201).json(newMessage);
  }
  catch(error){
    console.error("Error in sendMessage controller: ", error.message);
    res.status(500).json({ error : "Internal server error" });
  }
}

export const getMessages = async (req, res) => {
  try{
    // The user we are chatting with (the one we click to get the messages)
    const {id:userToChatId} = req.params;
    const senderId = req.user._id;

    // Getting every message using the id we have stored using populate method of mongoose
    const conversation = await Conversation.findOne({
        participants: { $all: [senderId, userToChatId] }
    }).populate("messages");

    if(!conversation){
        return res.status(200).json([]);
    }

    res.status(200).json(conversation.messages);
  }
  catch(error){
    console.error("Error in getMessages controller: ", error.message);
    res.status(500).json({ error : "Internal server error" });
  }
}