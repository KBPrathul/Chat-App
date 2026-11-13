import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protectRoute = async (req, res, next) => {
    try{
        // Need the cookie parser library to access the cookies in the request, and then we can get the token from the cookies
        const token = req.cookies.jwt;

        if(!token){
            return res.status(401).json({ error:"Unauthorized - No Token Provided"})
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if(!decoded){
            return res.status(401).json({ error:"Unauthorized - Invalid Token"})
        }

        // userId because in generation of the token in generateToken.js, we have used userId as the payload
        // select controls which fields are returned from the query. By using -password, we are excluding the password field alone from being returned.
        const user = await User.findById(decoded.userId).select("-password");

        if(!user){
            return res.status(404).json({ error:"User Not Found"});
        }
        // Attaching the user object to the request, so that it can be accessed in the controllers of the protected routes (like message.controller.js)
        req.user = user;
        // Calling the next middleware or route handler, so that the request can proceed to the intended route handler after successful authentication. (sendMessage in our case)
        next();
    }
    catch(error){
        console.error("Error in protectRoute middleware:", error.message);
        res.status(500).json({ error : "Internal server error" });
    }
}

export default protectRoute;