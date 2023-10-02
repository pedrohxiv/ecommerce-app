import { ActivityIndicator, FlatList, Text, View } from "react-native";

import { COLORS, SIZES } from "../../constants";
import { useFetch } from "../../hooks/useFetch";
import { ProductCardView } from "..";

import styles from "./productList.style";

const ProductList = () => {
  const { data, isLoading, error } = useFetch("/api/products");

  if (isLoading) {
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
        renderItem={(item) => <ProductCardView item={item} />}
        contentContainerStyle={styles.container}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

export default ProductList;
