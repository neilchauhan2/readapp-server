import { Router } from "express";
import { createPost, getPost, getPosts } from "../controllers/post";
import { auth } from "../middleware/auth";
const router = Router();

router.post("/", auth, createPost);
router.get("/", getPosts);
router.get("/:identifier/:slug", getPost);

export default router;
