import { Request, Response } from "express";
import Comment from "../models/Comment";
import Post from "../models/Post";
import User from "../models/User";

export const getUserSubmissions = async (req: Request, res: Response) => {
  try {
    const user: object = await User.findOne({
      username: req.params.username,
    }).select("-password");

    const posts = await Post.find({ user }).populate("sub").populate("user");

    const comments = await Comment.find({ user }).populate("post");

    let submissions: any[] = [];
    posts.forEach((p) => submissions.push({ type: "Post", ...p.toJSON() }));
    comments.forEach((c) =>
      submissions.push({ type: "Comment", ...c.toJSON() })
    );

    submissions.sort((a, b) => {
      if (b.createdAt > a.createdAt) return 1;
      if (b.createdAt < a.createdAt) return -1;
      return 0;
    });

    return res.json({ user, submissions });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};
