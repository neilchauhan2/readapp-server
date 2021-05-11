import { Request, Response } from "express";
import Post from "../models/Post";
import Sub from "../models/Sub";
import { makeId, slugify } from "../util/helpers";

export const createPost = async (req: Request, res: Response) => {
  try {
    const { title, body, sub } = req.body;

    const user = res.locals.user;

    if (title.length === 0)
      return res.status(400).json({ title: "Title must not be empty." });

    const subRecord = await Sub.findOne({ name: sub });
    const identifier = makeId(7);
    const slug = slugify(title);

    const post = new Post({
      title,
      body,
      user,
      identifier,
      slug,
      subName: sub,
      sub: subRecord,
    });
    await post.save();

    return res.json(post);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Something went wrong." });
  }
};

export const getPosts = async (_: Request, res: Response) => {
  try {
    const posts = await Post.find().sort({ updatedAt: "desc" });
    return res.json(posts);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Something went wrong." });
  }
};

export const getPost = async (req: Request, res: Response) => {
  const { identifier, slug } = req.params;
  try {
    const post = await Post.findOne({ identifier, slug }).populate("sub");
    return res.json(post);
  } catch (error) {
    console.log(error);
    return res.status(404).json({ error: "Post not found." });
  }
};
