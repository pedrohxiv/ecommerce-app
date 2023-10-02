import { Image, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import styles from "./searchTile.style";

interface SearchTileProps {
  item: {
    title: string;
    supplier: string;
    price: string;
    imageUrl: string;
    description: string;
    product_location: string;
  };
}

const SearchTile = ({ item }: SearchTileProps) => {
  const navigation = useNavigation();
  return (
    <View>
      <TouchableOpacity
        style={styles.container}
        onPress={() => navigation.navigate("Product Details", { item })}
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
