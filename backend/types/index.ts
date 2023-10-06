import type { Schema } from "mongoose";

export type Cart = {
  userId: string;
  products: {
    cartItem: Schema.Types.ObjectId;
    quantity: number;
  }[];

  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  _doc: Cart;
};

export type Order = {
  userId: string;
  customerId: string;
  productId: Schema.Types.ObjectId;
  quantity: number;
  total: number;
  delivery_status: string;
  payment_status: string;

  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  _doc: Order;
};

export type Product = {
  title: string;
  supplier: string;
  price: string;
  imageUrl: string;
  description: string;
  product_location: string;

  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  _doc: Product;
};

export type User = {
  username: string;
  email: string;
  password: string;
  location: string;

  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  _doc: User;
};
