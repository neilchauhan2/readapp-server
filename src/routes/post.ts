import { Router } from "express";
import { createPost } from "../controllers/post";
import { auth } from "../middleware/auth";
const router = Router();

router.post("/", auth, createPost);

export default router;
