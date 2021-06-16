import { Request, Response } from "express";
import Post from "../models/Post";
import Vote from "../models/Vote";

export const vote = async (req: Request, res: Response) => {
  const { identifier, slug, value } = req.body;
  if (identifier.length === 0)
    return res.status(404).send({ error: "Post not found." });
  if (![-1, 0, 1].includes(value)) {
    return res.status(400).json({ value: "Value must be either -1, 0, or 1." });
  }

  try {
    const user = res.locals.user;
    let post: object | null = await Post.findOne({ identifier, slug });
    let vote;
    vote = await Vote.findOne({ user, post });
    if (!vote && value === 0) {
      return res.status(404).json({ error: "Vote not found." });
    } else if (!vote) {
      vote = new Vote({ user, value });
      vote.post = post;
      await vote.save();
    } else if (value === 0) {
      await vote.remove();
    } else if (vote.value !== value) {
      vote.value = value;
      await vote.save();
    }

    const score = await countVotes(post);
    let updatedPost = await Post.findByIdAndUpdate(post["id"], {
      voteScore: score,
    });
    await updatedPost.save();

    vote = await Vote.findOne({ post })
      .populate("post")
      .populate("user", "username");

    return res.json(vote);
  } catch (error) {
    console.log(error);
    return res.json({ error: "Something went wrong." });
  }
};

export const countVotes = async (post) => {
  try {
    const votes = await Vote.find({ post });
    let count = 0;
    votes.forEach((vote) => {
      count += vote.value;
    });

    return count;
  } catch (error) {
    console.log(error);
    return 0;
  }
};
