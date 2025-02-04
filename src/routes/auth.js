import {Router} from "express";
import { fetchLoggedInUser, loginUser, registerUser } from "../app/controllers/auth.controller.js";
import authMiddleware from "../app/middleware/auth.middleware.js";
import rateLimiter from "../app/middleware/rateLimiter.middleware.js";
const router = Router();

router.post('/register', registerUser);
router.post('/login', rateLimiter, loginUser);
router.get("/user", authMiddleware, fetchLoggedInUser)


export const authRouter = router;