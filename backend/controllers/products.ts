import { Request, Response } from "express";

import Product from "../models/products";

async function create(req: Request, res: Response) {
  try {
    const newProduct = new Product(req.body);

    await newProduct.save();

    return res.status(201).json({ message: "Product successfully created" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to create the product" });
  }
}

async function getAll(_req: Request, res: Response) {
  try {
    const products = await Product.find().sort({ createdAt: -1 });

    return res.status(200).json(products);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to get the products" });
  }
}

async function getById(req: Request, res: Response) {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(400).json({ message: "Product not found" });
    }

    return res.status(200).json(product);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to get the product" });
  }
}

async function search(req: Request, res: Response) {
  try {
    const result = await Product.aggregate([
      {
        $search: {
          index: "default",
          text: {
            query: req.params.key,
            path: {
              wildcard: "*",
            },
          },
        },
      },
    ]);

    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to search products" });
  }
}

export { create, getAll, getById, search };
