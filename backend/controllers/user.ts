import { Request, Response } from "express";

import User from "../models/user";

async function remove(req: Request, res: Response) {
  try {
    await User.findByIdAndDelete(req.params.id);

    return res.status(200).json({ message: "User successfully deleted" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to delete the user" });
  }
}

async function getById(req: Request, res: Response) {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const { password, __v, createdAt, updatedAt, ...userData } = user._doc;

    return res.status(200).json(userData);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to get the user" });
  }
}

export { remove, getById };
