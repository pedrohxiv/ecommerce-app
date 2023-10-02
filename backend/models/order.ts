import mongoose, { type Schema } from "mongoose";

interface Order {
  userId: string;
  customerId: string;
  productId: Schema.Types.ObjectId;
  quantity: number;
  total: number;
  delivery_status: string;
  payment_status: string;
}

const OrderSchema = new mongoose.Schema<Order>(
  {
    userId: { type: String, required: true },
    customerId: { type: String, required: true },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    quantity: { type: Number, required: true },
    total: { type: Number, required: true },
    delivery_status: { type: String, default: "pending" },
    payment_status: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Order", OrderSchema);
