import { Document } from "mongoose";

export default interface PostInterface extends Document {
  identifier: string;
  title: string;
  slug: string;
  body: string;
  subName: string;
  user: string;
  sub: string;
  voteScore: number;
  commentCount: number;
  userVote: number;
}
