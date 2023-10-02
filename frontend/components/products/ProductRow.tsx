import { ActivityIndicator, FlatList, Text, View } from "react-native";
import constants from "expo-constants";

import { COLORS, SIZES } from "../../constants";
import { useFetch } from "../../hooks/useFetch";
import { ProductCardView } from "..";

import styles from "./productRow.style";

const ProductRow = () => {
  const { data, isLoading, error } = useFetch("api/products");

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size={SIZES.xxLarge} color={COLORS.primary} />
      ) : error ? (
        <Text>Something went wrong</Text>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item: { _id: string }) => item._id}
          renderItem={({ item }) => <ProductCardView item={item} />}
          horizontal
          contentContainerStyle={styles.itemList}
        />
      )}
    </View>
  );
};

export default ProductRow;
