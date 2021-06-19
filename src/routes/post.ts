import { Router } from "express";
import { commentOnPost, getPostComment } from "../controllers/comment";
import { createPost, getPost, getPosts } from "../controllers/post";
import { auth } from "../middleware/auth";
import { user } from "../middleware/user";
const router = Router();

router.post("/", user, auth, createPost);
router.get("/", user, getPosts);
router.get("/:identifier/:slug", user, getPost);
router.post("/:identifier/:slug/comments", user, auth, commentOnPost);
router.get("/:identifier/:slug/comments", user, getPostComment);

export default router;
