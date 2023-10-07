import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { API_URL } from "@env";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { FavoriteTile } from "../components";

import styles from "./styles/favorites.style";
import type { Product, RootStackParamList } from "../types";

const Favorites: React.FC<{
  navigation: NativeStackNavigationProp<RootStackParamList, "Favorites">;
}> = ({ navigation }) => {
  const [favorites, setFavorites] = useState<Product[]>([]);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const userId = await AsyncStorage.getItem("id");
        const favoritesKey = `favorites${JSON.parse(userId!)}`;
        const favorites = await AsyncStorage.getItem(favoritesKey);

        if (favorites) {
          const parsedFavorites = JSON.parse(favorites);

          const response = await axios.get(`${API_URL}api/products`);
          const products = response.data;

          const favoritedProducts = products.filter((product: Product) =>
            parsedFavorites.includes(product._id)
          );
          setFavorites(favoritedProducts);
        }
      } catch (error) {
        console.error("Erro ao carregar favoritos:", error);
      }
    };

    loadFavorites();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.upperRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={30} />
        </TouchableOpacity>
        <Text style={styles.cartTitle}>Favorites</Text>
      </View>
      {favorites.length === 0 ? (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text style={styles.emptyText}>Your favorites is empty!</Text>
          <MaterialCommunityIcons
            name="heart-off-outline"
            size={46}
            style={styles.emptyIcon}
          />
        </View>
      ) : (
        <FlatList
          data={favorites}
          renderItem={({ item }) => (
            <FavoriteTile
              key={item._id}
              item={item}
              setFavorites={setFavorites}
            />
          )}
          style={{ marginHorizontal: 12, marginVertical: 16 }}
        />
      )}
    </SafeAreaView>
  );
};

export default Favorites;
