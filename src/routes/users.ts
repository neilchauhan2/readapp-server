import { Router } from "express";
import { getUserSubmissions } from "../controllers/user";

const router = Router();

router.get("/:username", getUserSubmissions);

export default router;
