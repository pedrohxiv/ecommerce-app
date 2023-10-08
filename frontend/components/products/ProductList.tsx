import axios from "axios";

import { API_URL } from "@env";

import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";

import { COLORS, SIZES } from "../../constants";

import type { IProduct } from "../../types";

import ProductCardView from "./ProductCardView";

import styles from "./styles/productList.style";

const ProductList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<IProduct[]>([]);

  useEffect(() => {
    setIsLoading(true);

    axios
      .get(`${API_URL}api/products`)
      .then((response) => setData(response.data))
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading && data.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size={SIZES.xxLarge} color={COLORS.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        numColumns={2}
        renderItem={({ item }) => (
          <ProductCardView key={item._id} item={item} />
        )}
        contentContainerStyle={styles.container}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

export default ProductList;
