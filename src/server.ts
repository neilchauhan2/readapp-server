import express, { Response } from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 2000;
const mongoURI = process.env.MONGODB_URI;
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (_, res: Response) => res.send("Hello World"));

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
