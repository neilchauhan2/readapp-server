import mongoose, { Schema } from "mongoose";
import CommentInterface from "./interfaces/comment";

const CommentSchema: Schema = new Schema(
  {
    identifier: { type: String, required: true },
    body: { type: String, required: true },
    username: { type: String, required: true },
    post: { type: Schema.Types.ObjectId, ref: "Post", required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<CommentInterface>("Comment", CommentSchema);
