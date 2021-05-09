import mongoose, { Schema } from "mongoose";
import PostInterface from "./interfaces/post";

const PostSchema: Schema = new Schema(
  {
    identifier: { type: String, required: true },
    title: { type: String, required: true },
    slug: { type: String, required: true },
    body: { type: String },
    sub: { type: Schema.Types.ObjectId, ref: "Sub", required: true },
    user: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<PostInterface>("Post", PostSchema);
