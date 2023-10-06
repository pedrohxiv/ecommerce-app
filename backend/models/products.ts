import mongoose from "mongoose";

import { Product } from "../types";

const ProductSchema = new mongoose.Schema<Product>(
  {
    title: { type: String, required: true },
    supplier: { type: String, required: true },
    price: { type: String, required: true },
    imageUrl: { type: String, required: true },
    description: { type: String, required: true },
    product_location: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Product", ProductSchema);
