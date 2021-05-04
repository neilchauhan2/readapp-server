import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    // validation
    let errors: any = {};
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
    return res.json({
      _id: user["_id"],
      username: user["username"],
      email: user["email"],
      createdAt: user["createdAt"],
      updatedAt: user["updatedAt"],
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};
