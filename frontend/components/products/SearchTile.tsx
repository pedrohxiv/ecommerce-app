import { Image, Text, TouchableOpacity, View } from "react-native";
import { type NavigationProp, useNavigation } from "@react-navigation/native";

import type { IProduct, RootStackParamList } from "../../types";

import styles from "./styles/searchTile.style";

const SearchTile: React.FC<{ item: IProduct }> = ({ item }) => {
  const navigation: NavigationProp<RootStackParamList> = useNavigation();

  return (
    <View>
      <TouchableOpacity
        style={styles.container}
        onPress={() => navigation.navigate("ProductDetails", { item })}
      >
        <View style={styles.image}>
          <Image source={{ uri: item.imageUrl }} style={styles.productImg} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.productTitle}>{item.title}</Text>
          <Text style={styles.supplier}>{item.supplier}</Text>
          <Text style={styles.supplier}>{item.price}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default SearchTile;
