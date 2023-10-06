import mongoose from "mongoose";

import { Cart } from "../types";

const CartSchema = new mongoose.Schema<Cart>(
  {
    userId: { type: String, required: true },
    products: [
      {
        cartItem: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, default: 1 },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Cart", CartSchema);
