import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import {
  Ionicons,
  SimpleLineIcons,
  MaterialCommunityIcons,
  Fontisto,
} from "@expo/vector-icons";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { COLORS, SIZES } from "../constants";
import type { Product, RootStackParamList } from "../types";

import styles from "./styles/productDetails.style";
import { API_URL } from "@env";

const ProductDetails: React.FC<{
  navigation: NativeStackNavigationProp<RootStackParamList, "ProductDetails">;
}> = ({ navigation }) => {
  const { params } = useRoute<RouteProp<{ Detail: { item: Product } }>>();
  const [count, setCount] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [favorited, setFavorited] = useState(false);

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      try {
        const userId = await AsyncStorage.getItem("id");
        const favoritesKey = `favorites${JSON.parse(userId!)}`;
        const favorites = await AsyncStorage.getItem(favoritesKey);

        if (favorites) {
          const parsedFavorites = JSON.parse(favorites);
          const isFavorited = parsedFavorites.includes(params.item._id);
          setFavorited(isFavorited);
        } else {
          setFavorited(false);
        }
      } catch (error) {
        console.error("Erro ao verificar favoritos:", error);
      }
    };

    checkFavoriteStatus();
  }, []);

  const handleDecrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleAddItemToCart = async () => {
    setIsAddingToCart(true);

    const userId = await AsyncStorage.getItem("id");

    if (userId === null) {
      return navigation.navigate("Login");
    }

    axios
      .post(`${API_URL}api/cart`, {
        userId: userId?.replace(/^"(.*)"$/, "$1"),
        cartItem: params.item,
        quantity: count,
      })
      .then((_response) => navigation.navigate("Cart"))
      .catch((error) => console.error(error))
      .finally(() => setIsAddingToCart(false));
  };

  const handleFavorite = async () => {
    try {
      const userId = await AsyncStorage.getItem("id");

      if (!userId) {
        return navigation.replace("Login");
      }

      const favoritesKey = `favorites${JSON.parse(userId!)}`;
      const favorites = await AsyncStorage.getItem(favoritesKey);

      let updatedFavorites = [];

      if (favorites) {
        updatedFavorites = JSON.parse(favorites);
      }

      if (favorited) {
        const index = updatedFavorites.indexOf(params.item._id);
        if (index !== -1) {
          updatedFavorites.splice(index, 1);
          await AsyncStorage.setItem(
            favoritesKey,
            JSON.stringify(updatedFavorites)
          );
        }
        setFavorited(false);
      } else {
        updatedFavorites.push(params.item._id);
        await AsyncStorage.setItem(
          favoritesKey,
          JSON.stringify(updatedFavorites)
        );
        setFavorited(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.upperRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={30} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleFavorite}>
          <Ionicons
            name={favorited ? "heart" : "heart-outline"}
            size={30}
            color={favorited ? COLORS.primary : COLORS.black}
          />
        </TouchableOpacity>
      </View>
      <Image
        source={{
          uri: params.item.imageUrl,
        }}
        style={styles.image}
      />
      <View style={styles.details}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{params.item.title}</Text>
          <View style={styles.priceWrapper}>
            <Text style={styles.price}>{params.item.price}</Text>
          </View>
        </View>
        <View style={styles.ratingRow}>
          <View style={styles.rating}>
            {[1, 2, 3, 4, 5].map((index) => (
              <Ionicons key={index} name="star" size={24} color="gold" />
            ))}
            <Text style={styles.ratingText}>(4.9)</Text>
          </View>
          <View style={styles.quantity}>
            <TouchableOpacity disabled={count <= 1} onPress={handleDecrement}>
              <SimpleLineIcons
                name="minus"
                size={20}
                color={count <= 1 ? COLORS.gray2 : COLORS.black}
              />
            </TouchableOpacity>
            <Text style={styles.quantityText}>{count}</Text>
            <TouchableOpacity onPress={handleIncrement}>
              <SimpleLineIcons name="plus" size={20} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.descriptionWrapper}>
          <Text style={styles.descriptionTitle}>Description</Text>
          <Text style={styles.descriptionText}>{params.item.description}</Text>
        </View>
        <View style={{ marginBottom: SIZES.small }}>
          <View style={styles.location}>
            <View style={{ flexDirection: "row" }}>
              <Ionicons name="location-outline" size={20} />
              <Text style={{ marginLeft: 10 }}>
                {params.item.product_location}
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <MaterialCommunityIcons name="truck-delivery-outline" size={20} />
              <Text style={{ marginLeft: 10 }}>Free Delivery</Text>
            </View>
          </View>
        </View>
        <View style={styles.cartRow}>
          <TouchableOpacity
            onPress={handleAddItemToCart}
            style={styles.cartBtn}
            disabled={isAddingToCart}
          >
            <Text style={styles.cartText}>BUY NOW</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Cart")}
            style={styles.addCart}
          >
            <Fontisto name="shopping-bag" size={22} color={COLORS.lightWhite} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ProductDetails;
