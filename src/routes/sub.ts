import { Router } from "express";
import { createSub, getSub } from "../controllers/sub";
import { auth } from "../middleware/auth";
const router = Router();

router.post("/", auth, createSub);
router.get("/:name", getSub);

export default router;
