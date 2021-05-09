import { Router } from "express";
import { createSub } from "../controllers/sub";
import { auth } from "../middleware/auth";
const router = Router();

router.post("/", auth, createSub);

export default router;
