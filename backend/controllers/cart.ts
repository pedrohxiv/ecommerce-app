import { Request, Response } from "express";

import Cart from "../models/cart";

async function add(req: Request, res: Response) {
  try {
    const { userId, cartItem, quantity } = req.body;

    const cart = await Cart.findOne({ userId });

    if (cart) {
      const existingProduct = cart.products.find(
        (product) => product.cartItem.toString() === cartItem
      );

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        cart.products.push({ cartItem, quantity });
      }

      await cart.save();

      return res.status(200).json({ message: "Product successfully added" });
    } else {
      const newCart = new Cart({ userId, products: [{ cartItem, quantity }] });

      await newCart.save();
      return res.status(200).json({ message: "Product successfully added" });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Failed to add the product to cart" });
  }
}

async function get(req: Request, res: Response) {
  try {
    const cart = await Cart.find({ userId: req.params.id }).populate(
      "products.cartItem",
      "_id title supplier price imageUrl"
    );

    return res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to get the cart" });
  }
}

async function remove(req: Request, res: Response) {
  try {
    const updatedCart = await Cart.findOneAndUpdate(
      { "products._id": req.params.cartItemId },
      { $pull: { products: { _id: req.params.cartItemId } } },
      { new: true }
    );

    if (!updatedCart) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    return res.status(200).json(updatedCart);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to get the product" });
  }
}

async function decrement(req: Request, res: Response) {
  try {
    const { userId, cartItem } = req.body;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const existingProduct = cart.products.find(
      (product) => product.cartItem.toString() === cartItem
    );

    if (!existingProduct) {
      return res.status(404).json({ message: "Product in the cart not found" });
    }

    if (existingProduct.quantity === 1) {
      cart.products = cart.products.filter(
        (product) => product.cartItem.toString() !== cartItem
      );
    } else {
      existingProduct.quantity -= 1;
    }

    await cart.save();

    if (existingProduct.quantity === 0) {
      await Cart.updateOne({ userId }, { $pull: { products: { cartItem } } });
    }

    return res.status(200).json({ message: "Product successfully updated" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to search products" });
  }
}

export { add, get, remove, decrement };
