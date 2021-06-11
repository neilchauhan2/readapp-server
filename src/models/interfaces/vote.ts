import { Document } from "mongoose";

export default interface VoteInterface extends Document {
  value: number;
  user: String;
  post: String;
}
