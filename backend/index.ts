import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

import authRouter from "./routes/auth";
import cartRouter from "./routes/cart";
import orderRouter from "./routes/order";
import productRouter from "./routes/products";
import userRouter from "./routes/user";

const app = express();

dotenv.config();
mongoose
  .connect(process.env.MONGO_URL!)
  .then(() => console.log("Database connected!"))
  .catch((err) => console.log(err));

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cors());

app.use("/api", authRouter);
app.use("/api/cart", cartRouter);
app.use("/api/orders", orderRouter);
app.use("/api/products", productRouter);
app.use("/api/users", userRouter);

app.listen(process.env.PORT || 3000, () =>
  console.log(`App listening on port ${process.env.PORT || 3000}!`)
);
