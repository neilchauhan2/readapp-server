import { Document } from "mongoose";

export default interface UserInterface extends Document {
  email: string;
  username: string;
  password: string;
}
