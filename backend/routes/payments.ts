import { Request, Response, Router } from "express";

import Stripe from "stripe";

const router = Router();

router.post("/intents", async (req: Request, res: Response) => {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2023-08-16",
      typescript: true,
    });

    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
      metadata: {
        checkout: JSON.stringify(req.body.checkout),
      },
    });

    return res.json({ paymentIntent: paymentIntent.client_secret });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
});

export default router;
