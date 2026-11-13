// Setting up JWT for authentication and authorization, so that only the logged in users can access the protected routes and perform the actions like sending msgs.
import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
    // We are creating a token using the user id and the secret key, which is stored in the .env file, and we are setting the expiration time of the token to 15 days.
    // It takes the payload (userId in our case), and it will be embedded in the JWT token, so that we can access it in the protected routes to identify the user and perform the actions accordingly.
    // The JWT secret is used to sign the token and verify it later when the user makes a request to the protected routes, so that we can ensure that the token is valid and has not been tampered with.
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn:"15d"});
    // We are setting the token in the cookie, so that we can access it in the frontend and send it in the headers of the requests to the protected routes.
    res.cookie("jwt", token, {
        httpOnly: true, // The cookie should only be http accessible and not accessible via JavaScript, so that it cannot be accessed by malicious scripts and can only be sent in the headers of the requests to the protected routes. Prevents XSS attacks (cross-site scripting attacks).
        secure: process.env.NODE_ENV === "production", // The cookie should only be sent in the requests made over HTTPS in production, so that it cannot be intercepted by attackers in transit. In development, we can allow it to be sent over HTTP for testing purposes.
        sameSite: "strict", // Used to prevent CSRF attacks (cross-site request forgery attacks), which is an attack that tricks the user into making a request to the server with the user's credentials, so that the attacker can perform actions on behalf of the user without their consent. By setting sameSite to "strict", we are ensuring that the cookie is only sent in the requests made from the same site, and not in the requests made from other sites, which helps in preventing CSRF attacks.
        maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in milliseconds
    });
}

export default generateTokenAndSetCookie;