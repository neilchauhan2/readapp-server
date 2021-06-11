import { Router } from "express";
import { vote } from "../controllers/vote";
import { auth } from "../middleware/auth";
const router = Router();

router.post("/vote", auth, vote);

export default router;
