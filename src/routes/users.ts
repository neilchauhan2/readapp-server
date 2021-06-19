import { Router } from "express";
import { user } from "../middleware/user";
import { getUserSubmissions } from "../controllers/user";

const router = Router();

router.get("/:username", user, getUserSubmissions);

export default router;
