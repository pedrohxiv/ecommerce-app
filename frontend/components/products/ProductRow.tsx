import axios from "axios";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { API_URL } from "@env";

import ProductCardView from "./ProductCardView";
import { COLORS, SIZES } from "../../constants";
import type { Product } from "../../types";

import styles from "./styles/productRow.style";

const ProductRow = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<Product[]>([]);

  useEffect(() => {
    setIsLoading(true);

    axios
      .get(`${API_URL}api/products`)
      .then((response) => setData(response.data))
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size={SIZES.xxLarge} color={COLORS.primary} />
      ) : data && data.length > 0 ? (
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <ProductCardView key={item._id} item={item} />
          )}
          horizontal
          contentContainerStyle={styles.itemList}
        />
      ) : (
        <Text>No data available</Text>
      )}
    </View>
  );
};

export default ProductRow;
