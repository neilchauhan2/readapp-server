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
    const count = await countComments(post);
    const updatedPost = await Post.findByIdAndUpdate(post["id"], {
      commentCount: count,
    });
    await updatedPost.save();

    const updatedComment = await Comment.findById(comment["id"])
      .populate("post")
      .populate("user");

    return res.json(updatedComment);
  } catch (error) {
    console.log(error);
    return res.status(404).json({ error: "Post not found." });
  }
};

export const getPostComment = async (req: Request, res: Response) => {
  const { identifier, slug } = req.params;
  try {
    const post: object = await Post.findOne({ identifier, slug });

    const comments = await Comment.find({ post });

    return res.json(comments);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Something went wrong." });
  }
};

const countComments = async (post) => {
  try {
    const count = await Comment.countDocuments({ post });
    return count;
  } catch (error) {
    console.log(error);
    return 0;
  }
};
