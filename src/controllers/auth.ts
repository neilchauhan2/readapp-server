import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookie from "cookie";

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    // validation
    let errors: any = {};

    if (username.length === 0)
      errors.username = "Please enter a valid username.";
    if (email.length === 0) errors.email = "Please enter a valid email.";
    if (password.length === 0)
      errors.password = "Please enter a valid password.";

    if (Object.keys(errors).length > 0) return res.status(400).json(errors);

    const emailUser = await User.findOne({
      email,
    });
    const usernameUser = await User.findOne({
      username,
    });

    if (password.length < 3)
      errors.password = "Password must be atleast 3 characters.";

    if (emailUser) errors.email = "Email is already taken.";
    if (usernameUser) errors.username = "Username is already taken.";

    if (Object.keys(errors).length > 0) return res.status(400).json(errors);

    // create user
    const hash: string = await bcrypt.hash(password, 6);

    const user = new User({
      username,
      email,
      password: hash,
    });
    await user.save();
    return res.json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    let errors: any = {};

    // validation
    if (username.length === 0) errors.username = "Username must not be empty.";
    if (password.length === 0) errors.password = "Password must not be empty.";

    if (Object.keys(errors).length > 0) return res.status(400).json(errors);

    if (!user) return res.status(404).json({ error: "User not found." });

    // match password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch)
      return res.status(401).json({ password: "Password incorrect." });

    const token = jwt.sign({ username }, process.env.JWT_SECRET!);

    res.set(
      "Set-Cookie",
      cookie.serialize("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production" ? true : false,
        sameSite: "strict",
        maxAge: 3600,
        path: "/",
      })
    );

    return res.json(user);
  } catch (error) {
    return res.status(500).json({
      error: "Please enter a valid username and password.",
    });
  }
};

export const me = (_: Request, res: Response) => {
  return res.json(res.locals.user);
};

export const logout = async (_: Request, res: Response) => {
  res.set(
    "Set-Cookie",
    cookie.serialize("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production" ? true : false,
      sameSite: "strict",
      expires: new Date(0),
      path: "/",
    })
  );
  res.status(200).json({ success: true });
};
