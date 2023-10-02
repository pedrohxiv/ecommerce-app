import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";

import User from "../models/user";

async function create(req: Request, res: Response) {
  try {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: CryptoJS.AES.encrypt(
        req.body.password,
        process.env.SECRET!
      ).toString(),
      location: req.body.location,
    });

    await newUser.save();

    return res.status(201).json({ message: "User successfully created" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to create the user" });
  }
}

async function login(req: Request, res: Response) {
  try {
    const user: any = await User.findOne({ email: req.body.email });

    if (!user) {
      return res
        .status(401)
        .json({ message: "Wrong credentials, provide a valid email" });
    }

    const decryptedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.SECRET!
    ).toString(CryptoJS.enc.Utf8);

    if (decryptedPassword !== req.body.password) {
      return res
        .status(401)
        .json({ message: "Wrong password, provide a valid password" });
    }

    const userToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    });

    const { password, __v, createdAt, updatedAt, ...userData } = user._doc;

    return res.status(200).json({ ...userData, token: userToken });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to get the user" });
  }
}

export { create, login };
