import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
    // It is going to be an array of user ids, which are the participants in the conversation.
    participants:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
        }
    ],
    messages:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Message",
            default:[],
        }
    ]
}, {timestamps:true});

const Conversation = mongoose.model("Conversation", conversationSchema);

export default Conversation;