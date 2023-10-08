import { Request, Response, Router, raw } from "express";

import Stripe from "stripe";

import Order from "../models/order";

const router = Router();

router.post(
  "/",
  raw({ type: "application/json" }),
  async (req: Request, res: Response) => {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2023-08-16",
      typescript: true,
    });

    const signature = req.headers["stripe-signature"] as string;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET!
      );
    } catch (error: any) {
      console.error(error);
      return res.status(500).json({ message: error });
    }

    const session = event.data.object as Stripe.Checkout.Session;

    if (event.type === "charge.succeeded") {
      if (session?.metadata?.checkout) {
        const checkout = JSON.parse(session?.metadata?.checkout);

        checkout.forEach((item: any) => {
          const newOrder = new Order({
            userId: item.userId,
            customerId: item.userId,
            productId: item.productId,
            quantity: item.quantity,
            total: item.total,
            payment_status: "Paid",
          });

          newOrder.save();
        });
      }
    }
  }
);

export default router;
