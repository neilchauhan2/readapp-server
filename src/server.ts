import express, { Response } from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth";
import postRoutes from "./routes/post";
import subRoutes from "./routes/sub";

dotenv.config();

const app = express();
const port = process.env.PORT || 2000;
const mongoURI = process.env.MONGODB_URI!;
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(cors());

app.get("/", (_, res: Response) => res.send("Hello World"));
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/subs", subRoutes);

// db connection
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connected.");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
