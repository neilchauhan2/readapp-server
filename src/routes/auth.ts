import { Router } from "express";
import { login, logout, me, register } from "../controllers/auth";
import { auth } from "../middleware/auth";
import { user } from "../middleware/user";
const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", user, auth, me);
router.get("/logout", user, auth, logout);

export default router;
