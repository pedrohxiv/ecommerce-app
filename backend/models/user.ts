import mongoose from "mongoose";

interface User {
  username: string;
  email: string;
  password: string;
  location: string;
}

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
