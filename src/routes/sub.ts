import { Router } from "express";
import { createSub, getSub } from "../controllers/sub";
import { auth } from "../middleware/auth";
import { user } from "../middleware/user";
const router = Router();

router.post("/", user, auth, createSub);
router.get("/:name", getSub);

export default router;
