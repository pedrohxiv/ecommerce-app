import { Image, Text, View } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import { COLORS } from "../../constants";

import type { IOrder } from "../../types";

import styles from "./styles/ordersTile.style";

const OrdersTile: React.FC<{
  item: IOrder;
}> = ({ item }) => {
  return (
    <View>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: item.productId.imageUrl }}
            style={styles.productImg}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.productTitle}>{item.productId.title}</Text>
          <Text style={styles.supplier}>{item.productId.supplier}</Text>
          <Text style={styles.supplier}>
            {item.productId.price} * {item.quantity}
          </Text>
        </View>
        <View style={styles.btnContainer}>
          <Text style={styles.paymentTxt}>{item.payment_status}</Text>
          <Text style={styles.transportTxt}>
            <MaterialCommunityIcons
              name="truck-delivery-outline"
              size={12}
              color={COLORS.gray}
            />
            {" " + item.delivery_status}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default OrdersTile;
