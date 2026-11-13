import express from "express";
import { login, logout, signup } from "../controllers/auth.controller.js";

const router = express.Router();

// Controllers are used to write all the function we use to handle the requests
router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

export default router;