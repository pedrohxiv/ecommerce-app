import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { API_URL } from "@env";

import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext<
  { totalItems: number; updateCart: () => void } | undefined
>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState([]);

  const getProducts = async () => {
    try {
      const userId = await AsyncStorage.getItem("id");

      const response = await axios.get(
        `${API_URL}api/cart/find/${userId?.slice(1, -1)}`
      );

      const products = response.data[0].products;

      setCartItems(products);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const updateCart = () => {
    getProducts();
  };

  return (
    <CartContext.Provider value={{ totalItems: cartItems.length, updateCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): { totalItems: number; updateCart: () => void } => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart has to be inside the CartProvider");
  }
  return context;
};
