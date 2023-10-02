import { Request, Response } from "express";

import Order from "../models/order";

async function get(req: Request, res: Response) {
  try {
    const order = await Order.find({ userId: req.params.id })
      .populate({
        path: "productId",
        select: "-description -product_location",
      })
      .exec();

    return res.status(200).json(order);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to get the order" });
  }
}

export { get };
