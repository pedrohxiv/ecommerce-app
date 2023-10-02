import { Image, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { COLORS } from "../../constants";

import styles from "./productCardView.style";

interface ProductCardViewProps {
  item: {
    title: string;
    supplier: string;
    price: string;
    imageUrl: string;
    description: string;
    product_location: string;
  };
}

const ProductCardView = ({ item }: ProductCardViewProps) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Product Details", { item })}
    >
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: item.imageUrl,
            }}
            style={styles.image}
          />
        </View>
        <View style={styles.datails}>
          <Text style={styles.title} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={styles.supplier} numberOfLines={1}>
            {item.supplier}
          </Text>
          <Text style={styles.price}>${item.price}</Text>
        </View>
        <TouchableOpacity style={styles.addBtn}>
          <Ionicons name="add-circle" size={35} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCardView;
