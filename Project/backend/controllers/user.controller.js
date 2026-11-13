import User from "../models/user.model.js";

export const getUsersForSidebar = async (req, res) => {
    try{
        // Again we are able to use this because of the protectRoute middleware.
        const loggedInUserId = req.user._id;

        // Find every user in our db, excpet the one equal to the logged in user. (Because we dont want to send messages to ourselves)
        // ne means not equal
        // We also dont want the passwords of the users to be sent.
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

        res.status(200).json(filteredUsers);

    }
    catch(error){
        console.error("Error in getUsersForSidebar: ", error.message);
        res.status(500).json({ error : "Internal server error" });
    }
}