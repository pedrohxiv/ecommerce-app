import axios from "axios";
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
    axios
      .delete(`${API_URL}api/cart/${item._id}`)
      .then((response) => setCartItems(response.data.products))
      .catch((error) => console.error(error));
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
