import express, { Response } from "express";
import morgan from "morgan";

const app = express();
const port = process.env.PORT || 2000;
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (_, res: Response) => res.send("Hello World"));

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
