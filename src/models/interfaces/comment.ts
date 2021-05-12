import { Document } from "mongoose";

export default interface CommentInterface extends Document {
  identifier: string;
  body: string;
  username: string;
  user: string;
  post: string;
}
