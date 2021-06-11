import mongoose, { Schema } from "mongoose";
import VoteInterface from "./interfaces/vote";

const VoteSchema: Schema = new Schema(
  {
    value: { type: Number, required: true },
    post: { type: Schema.Types.ObjectId, ref: "Post" },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<VoteInterface>("Vote", VoteSchema);
