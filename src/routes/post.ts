import { Router } from "express";
import { commentOnPost } from "../controllers/comment";
import { createPost, getPost, getPosts } from "../controllers/post";
import { auth } from "../middleware/auth";
const router = Router();

router.post("/", auth, createPost);
router.get("/", getPosts);
router.get("/:identifier/:slug", getPost);
router.post("/:identifier/:slug/comments", auth, commentOnPost);

export default router;
