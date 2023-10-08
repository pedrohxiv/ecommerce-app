import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { API_URL } from "@env";

import { Dispatch, SetStateAction } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { type NavigationProp, useNavigation } from "@react-navigation/native";

import { Ionicons } from "@expo/vector-icons";

import { COLORS } from "../../constants";

import type { IProduct, RootStackParamList } from "../../types";

import styles from "./styles/favoriteTile.style";

const FavoriteTile: React.FC<{
  item: IProduct;
  setFavorites: Dispatch<SetStateAction<IProduct[]>>;
}> = ({ item, setFavorites }) => {
  const navigation: NavigationProp<RootStackParamList> = useNavigation();

  const handleRemoveFavorite = async () => {
    const userId = await AsyncStorage.getItem("id");
    const favoritesKey = `favorites${JSON.parse(userId!)}`;
    const favorites = await AsyncStorage.getItem(favoritesKey);

    const updatedFavorites = JSON.parse(favorites!).filter(
      (favorite: string) => favorite !== item._id
    );

    await AsyncStorage.setItem(favoritesKey, JSON.stringify(updatedFavorites));

    const response = await axios.get(`${API_URL}api/products`);
    const products = response.data;

    const favoritedProducts = products.filter((product: IProduct) =>
      updatedFavorites.includes(product._id)
    );
    setFavorites(favoritedProducts);
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.container}
        onPress={() => navigation.navigate("ProductDetails", { item })}
      >
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.imageUrl }} style={styles.productImg} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.productTitle}>{item.title}</Text>
          <Text style={styles.supplier}>{item.supplier}</Text>
          <Text style={styles.supplier}>{item.price}</Text>
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity onPress={handleRemoveFavorite}>
            <Ionicons name={"heart"} size={30} color={COLORS.primary} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default FavoriteTile;
