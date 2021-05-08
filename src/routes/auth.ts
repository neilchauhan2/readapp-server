import { Router } from "express";
import { login, me, register } from "../controllers/auth";
const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", me);

export default router;
