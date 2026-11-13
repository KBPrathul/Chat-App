import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    senderId:{
        // The senderID will be an id from the user model or the user collection.
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    receiverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    message:{
        type:String,
        required:true,
    },
    // We will get the createdAt and updatedAt fields automatically from the timestamps option, so we dont need to define them here. 
}, {timestamps:true});

// Create a Message collection with the schema (structure) as messageSchema
const Message = mongoose.model("Message", messageSchema);

export default Message;