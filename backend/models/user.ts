import mongoose from "mongoose";

import { User } from "../types";

const UserSchema = new mongoose.Schema<User>(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    location: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
