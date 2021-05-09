import { Document } from "mongoose";

export default interface PostInterface extends Document {
  identifier: string;
  title: string;
  slug: string;
  body: string;
  user: string;
  sub: string;
}
