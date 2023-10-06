import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { type NavigationProp, useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { API_URL } from "@env";

import { COLORS } from "../../constants";
import type { Product, RootStackParamList } from "../../types";

import styles from "./styles/cartTile.style";

const CartTile: React.FC<{ item: Product }> = ({ item, setCartItems }) => {
  const navigation: NavigationProp<RootStackParamList> = useNavigation();

  const handleRemoveItem = async () => {
    const userId = await AsyncStorage.getItem("id");

    axios
      .get(`${API_URL}api/cart/find/${userId?.slice(1, -1)}`)
      .then((response) => {
        response.data[0].products.forEach((product) => {
          if (product.cartItem._id === item.cartItem._id) {
            axios
              .delete(`${API_URL}api/cart/${product._id}`)
              .then()
              .catch((error) => console.error(error));
          }
        });
      })
      .catch((error) => console.error(error))
      .finally(() =>
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
          .catch((error) => console.error(error))
      );
  };

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: item.cartItem.imageUrl }}
            style={styles.productImg}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.productTitle}>{item.cartItem.title}</Text>
          <Text style={styles.supplier}>{item.cartItem.supplier}</Text>
          <Text style={styles.supplier}>
            {item.cartItem.price} * {item.quantity}
          </Text>
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity onPress={handleRemoveItem}>
            <MaterialCommunityIcons
              name="trash-can-outline"
              size={22}
              color={COLORS.red}
            />
          </TouchableOpacity>
          <Text style={styles.checkoutTxt}>CHECKOUT</Text>
        </View>
      </View>
    </View>
  );
};

export default CartTile;
