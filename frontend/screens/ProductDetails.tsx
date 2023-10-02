import { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import {
  Ionicons,
  SimpleLineIcons,
  MaterialCommunityIcons,
  Fontisto,
} from "@expo/vector-icons";

import { COLORS, SIZES } from "../constants";

import styles from "./productDetails.style";

const ProductDetails = ({ navigation }: { navigation: any }) => {
  const [count, setCount] = useState(1);
  const route = useRoute();
  const { item } = route.params;

  const favorited = true;

  const handleDecrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const handleIncrement = () => {
    setCount(count + 1);
  };

  return (
    <View style={styles.container}>
      <View style={styles.upperRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={30} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
          <Ionicons
            name={favorited ? "heart" : "heart-outline"}
            size={30}
            color={favorited ? COLORS.primary : COLORS.black}
          />
        </TouchableOpacity>
      </View>
      <Image
        source={{
          uri: item.imageUrl,
        }}
        style={styles.image}
      />
      <View style={styles.details}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{item.title}</Text>
          <View style={styles.priceWrapper}>
            <Text style={styles.price}>${item.price}</Text>
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
          <Text style={styles.descriptionText}>{item.description}</Text>
        </View>
        <View style={{ marginBottom: SIZES.small }}>
          <View style={styles.location}>
            <View style={{ flexDirection: "row" }}>
              <Ionicons name="location-outline" size={20} />
              <Text style={{ marginLeft: 10 }}>{item.product_location}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <MaterialCommunityIcons name="truck-delivery-outline" size={20} />
              <Text style={{ marginLeft: 10 }}>Free Delivery</Text>
            </View>
          </View>
        </View>
        <View style={styles.cartRow}>
          <TouchableOpacity onPress={() => {}} style={styles.cartBtn}>
            <Text style={styles.cartText}>BUY NOW</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}} style={styles.addCart}>
            <Fontisto name="shopping-bag" size={22} color={COLORS.lightWhite} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ProductDetails;
