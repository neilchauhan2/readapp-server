import { Request, Response } from "express";
import Comment from "../models/Comment";
import Post from "../models/Post";
import { makeId } from "../util/helpers";

export const commentOnPost = async (req: Request, res: Response) => {
  const user = res.locals.user;
  try {
    const { identifier, slug } = req.params;
    const body = req.body.body;

    const post = await Post.findOne({ identifier, slug });
    const commentIdentifier = makeId(8);

    const comment = new Comment({
      body,
      identifier: commentIdentifier,
      username: user.username,
      post,
      user,
    });
    await comment.save();
    return res.json(comment);
  } catch (error) {
    console.log(error);
    return res.status(404).json({ error: "Post not found." });
  }
};
