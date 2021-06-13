import { Request, Response } from "express";
import Post from "../models/Post";
import Vote from "../models/Vote";

export const vote = async (req: Request, res: Response) => {
  const { identifier, slug, value } = req.body;
  if (identifier.length === 0)
    return res.status(404).send({ error: "Post not found." });
  // validate vote value
  if (![-1, 0, 1].includes(value)) {
    return res.status(400).json({ value: "Value must be either -1, 0, or 1." });
  }

  try {
    const user = res.locals.user;
    let post: object | null = await Post.findOne({ identifier, slug });
    let vote;
    vote = await Vote.findOne({ user, post });
    if (!vote && value === 0) {
      // if vote not found and value = 0, return error
      return res.status(404).json({ error: "Vote not found." });
    } else if (!vote) {
      // if no vote, create new vote

      vote = new Vote({ user, value });
      vote.post = post;
      await vote.save();
    } else if (value === 0) {
      // if vote exists, and value is 0, then remove vote.
      await vote.remove();
    } else if (vote.value !== value) {
      // if vote exists and value has changed, update the vote
      vote.value = value;
      await vote.save();
    }

    vote = await await Vote.findOne({ post })
      .populate("post")
      .populate("user", "username");
    const count = await countVotes(post);
    return res.json({ vote, voteCount: count });
  } catch (error) {
    console.log(error);
    return res.json({ error: "Something went wrong." });
  }
};

export const countVotes = async (post) => {
  try {
    const count = await Vote.countDocuments({ post });
    if (count > 0) return count;
    else return 0;
  } catch (error) {
    console.log(error);
    return -1;
  }
};
