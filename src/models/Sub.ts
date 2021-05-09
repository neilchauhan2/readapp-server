import mongoose, { Schema } from "mongoose";
import SubInterface from "./interfaces/sub";

const SubSchema: Schema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageUrn: { type: String },
    bannerUrn: { type: String },
    user: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<SubInterface>("Sub", SubSchema);
