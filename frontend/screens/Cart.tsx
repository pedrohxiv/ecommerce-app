import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Ionicons,
  MaterialCommunityIcons,
  Feather,
  Fontisto,
} from "@expo/vector-icons";
import { API_URL } from "@env";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { CartTile } from "../components";

import styles from "./styles/cart.style";
import type { Product, RootStackParamList } from "../types";

const Cart: React.FC<{
  navigation: NativeStackNavigationProp<RootStackParamList, "Cart">;
}> = ({ navigation }) => {
  const [cartItems, setCartItems] = useState<Product[]>([]);

  const totalPrice = cartItems.reduce((total, item) => {
    const itemPrice = parseFloat(
      item.cartItem.price.replace("$", "").replace(",", "")
    );
    const itemTotal = itemPrice * item.quantity;
    return total + itemTotal;
  }, 0);

  useEffect(() => {
    const fetchCart = async () => {
      const userId = await AsyncStorage.getItem("id");

      axios
        .get(`${API_URL}api/cart/find/${userId?.slice(1, -1)}`)
        .then((response) => {
          const consolidatedData = response.data.map((item) => {
            const productsMap = new Map();

            item.products.forEach((product) => {
              const existingProduct = productsMap.get(product.cartItem._id);
              if (existingProduct) {
                existingProduct.quantity += product.quantity;
              } else {
                productsMap.set(product.cartItem._id, { ...product });
              }
            });

            return {
              ...item,
              products: [...productsMap.values()],
            };
          });

          setCartItems(consolidatedData[0].products);
        })
        .catch((error) => console.error(error));
    };

    fetchCart();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.upperRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={30} />
        </TouchableOpacity>
        <Text style={styles.cartTitle}>Cart</Text>
      </View>
      {cartItems.length === 0 ? (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text style={styles.emptyText}>Your cart is empty!</Text>
          <MaterialCommunityIcons
            name="cart-remove"
            size={46}
            style={styles.emptyIcon}
          />
        </View>
      ) : (
        <>
          <FlatList
            data={cartItems}
            renderItem={({ item }) => (
              <CartTile
                key={item._id}
                item={item}
                setCartItems={setCartItems}
              />
            )}
            style={{ marginHorizontal: 12, marginVertical: 16 }}
          />
          <View style={styles.bottomRow}>
            <Text style={styles.orderInfoTitle}>Order Info</Text>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={styles.orderInfoSubtitle}>Subtotal</Text>
              <Text style={styles.subtotalPrice}>${totalPrice.toFixed(2)}</Text>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={styles.orderInfoSubtitle}>Total</Text>
              <Text style={styles.totalPrice}>${totalPrice.toFixed(2)}</Text>
            </View>
            <TouchableOpacity style={styles.checkoutBtn}>
              <Text style={styles.checkoutTxt}>CHECKOUT</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default Cart;
