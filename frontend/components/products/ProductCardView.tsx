import { Image, Text, TouchableOpacity, View } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { type NavigationProp, useNavigation } from "@react-navigation/native";
import { API_URL } from "@env";

import { COLORS } from "../../constants";
import type { Product, RootStackParamList } from "../../types";

import styles from "./styles/productCardView.style";

const ProductCardView: React.FC<{ item: Product }> = ({ item }) => {
  const navigation: NavigationProp<RootStackParamList> = useNavigation();

  const handleAddItemToCart = async () => {
    const userId = await AsyncStorage.getItem("id");

    if (userId === null) {
      return navigation.navigate("Login");
    }

    axios
      .post(`${API_URL}api/cart`, {
        userId: userId?.replace(/^"(.*)"$/, "$1"),
        cartItem: item,
        quantity: 1,
      })
      .then()
      .catch((error) => console.error(error));
  };

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("ProductDetails", { item })}
    >
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: item.imageUrl,
            }}
            style={styles.image}
          />
        </View>
        <View style={styles.datails}>
          <Text style={styles.title} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={styles.supplier} numberOfLines={1}>
            {item.supplier}
          </Text>
          <Text style={styles.price}>${item.price}</Text>
        </View>
        <TouchableOpacity style={styles.addBtn} onPress={handleAddItemToCart}>
          <Ionicons name="add-circle" size={35} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCardView;
