import { Document } from "mongoose";

export default interface SubInterface extends Document {
  name: string;
  title: string;
  description: string;
  imageUrn: string;
  bannerUrn: string;
  user: string;
}
