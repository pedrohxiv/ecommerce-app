import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { API_URL } from "@env";

import { useEffect, useState } from "react";
import { Alert, FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { useStripe } from "@stripe/stripe-react-native";

import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import { CartTile } from "../components";
import { useCart } from "../contexts";

import type { ICart, IUser, RootStackParamList } from "../types";

import styles from "./styles/cart.style";

const Cart: React.FC<{
  navigation: NativeStackNavigationProp<RootStackParamList, "Cart">;
}> = ({ navigation }) => {
  const [cartItems, setCartItems] = useState<ICart[]>([]);
  const [checkout, setCheckout] = useState([]);
  const [userData, setUserData] = useState<IUser | null>(null);
  const [isLoading, setisLoading] = useState(false);
  const { updateCart } = useCart();
  const { initPaymentSheet, presentPaymentSheet } = useStripe();

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

      if (!userId) {
        return navigation.replace("Login");
      }

      const currentUser = await AsyncStorage.getItem(
        `user${JSON.parse(userId!)}`
      );

      if (currentUser) {
        setUserData(JSON.parse(currentUser));
      }

      axios
        .get(`${API_URL}api/cart/find/${userId?.slice(1, -1)}`)
        .then((response) => {
          setCartItems(response.data[0].products);
          setCheckout(
            response.data[0].products.map((product: any) => ({
              userId: response.data[0].userId,
              productId: product.cartItem._id,
              quantity: product.quantity,
              total:
                (product.quantity *
                  Math.floor(
                    Number(
                      product.cartItem.price.replace("$", "").replace(",", "")
                    ) * 100
                  )) /
                100,
            }))
          );
        })
        .catch((error) => console.error(error));
    };

    fetchCart();
  }, []);

  const handleCheckout = async () => {
    try {
      setisLoading(true);

      const response = await axios.post(`${API_URL}api/payments/intents`, {
        amount: Math.floor(totalPrice * 100),
        checkout,
      });

      await initPaymentSheet({
        merchantDisplayName: "pedrohxiv",
        paymentIntentClientSecret: response.data.paymentIntent,
        defaultBillingDetails: {
          name: userData?.username,
          email: userData?.email,
        },
      });

      const { error: paymentError } = await presentPaymentSheet();

      if (!paymentError) {
        const userId = await AsyncStorage.getItem("id");

        await axios.delete(`${API_URL}api/cart/clear/${userId?.slice(1, -1)}`);
        updateCart();

        navigation.navigate("Orders");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Something went wrong");
    } finally {
      setisLoading(false);
    }
  };

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
            <TouchableOpacity
              style={isLoading ? styles.checkoutBtnLoading : styles.checkoutBtn}
              onPress={handleCheckout}
              disabled={isLoading}
            >
              {isLoading ? (
                <Text style={styles.checkoutTxt}>Loading...</Text>
              ) : (
                <Text style={styles.checkoutTxt}>CHECKOUT</Text>
              )}
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default Cart;
