import { Router } from "express";
import { getTopSubs } from "../controllers/sub";
import { vote } from "../controllers/vote";
import { auth } from "../middleware/auth";
const router = Router();

router.post("/vote", auth, vote);
router.get("/top-subs", getTopSubs);

export default router;
