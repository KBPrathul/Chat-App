import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        minlength:6,
    },
    gender:{
        type:String,
        required:true,
        // So that only certain values are allowed
        enum:["male","female"],
    },
    profilePic:{
        type:String,
        default:"",
    },
}, {timestamps:true});

// This will create a collection named "users" in the database, and the documents in that collection will follow the structure defined in userSchema
const User = mongoose.model("User", userSchema);

export default User;