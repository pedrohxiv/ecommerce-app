import axios from "axios";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { API_URL } from "@env";

import ProductCardView from "./ProductCardView";
import { COLORS, SIZES } from "../../constants";

import styles from "./productRow.style";

const ProductRow = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    setIsLoading(true);

    axios
      .get(`${API_URL}api/products`)
      .then((response) => setData(response.data))
      .catch((error) => setError(error))
      .finally(() => setIsLoading(false));
  }, [API_URL]);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size={SIZES.xxLarge} color={COLORS.primary} />
      ) : error ? (
        <Text>Something went wrong</Text>
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
