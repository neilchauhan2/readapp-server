import { Router } from "express";
import { commentOnPost, getPostComment } from "../controllers/comment";
import { createPost, getPost, getPosts } from "../controllers/post";
import { auth } from "../middleware/auth";
const router = Router();

router.post("/", auth, createPost);
router.get("/", getPosts);
router.get("/:identifier/:slug", getPost);
router.post("/:identifier/:slug/comments", auth, commentOnPost);
router.get("/:identifier/:slug/comments", getPostComment);

export default router;
