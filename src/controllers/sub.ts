import { Request, Response } from "express";
import Sub from "../models/Sub";

export const createSub = async (req: Request, res: Response) => {
  const { name, title, description } = req.body;
  const user = res.locals.user;

  try {
    let errors: any = {};
    if (name.length === 0) errors.name = "Name must not be empty.";
    if (title.length === 0) errors.title = "Title must not be empty.";

    const sub = await Sub.findOne({ name });

    if (sub) errors.sub = "Sub already exists.";

    if (Object.keys(errors).length > 0) throw errors;
  } catch (error) {
    return res.status(400).json(error);
  }

  try {
    const sub = new Sub({
      name,
      title,
      description,
      user,
    });

    await sub.save();

    return res.json(sub);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Something went wrong." });
  }
};
