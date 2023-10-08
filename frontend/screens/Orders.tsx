import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { API_URL } from "@env";

import { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import { OrdersTile } from "../components";

import type { IOrder, RootStackParamList } from "../types";

import styles from "./styles/order.style";

const Orders: React.FC<{
  navigation: NativeStackNavigationProp<RootStackParamList, "Orders">;
}> = ({ navigation }) => {
  const [orders, setOrders] = useState<IOrder[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userId = await AsyncStorage.getItem("id");

        if (!userId) {
          return navigation.replace("Login");
        }

        const response = await axios.get(
          `${API_URL}api/orders/${JSON.parse(userId)}`
        );

        setOrders(response.data);
      } catch (error) {}
    };

    fetchOrders();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.upperRow}>
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Ionicons name="chevron-back" size={30} />
        </TouchableOpacity>
        <Text style={styles.cartTitle}>Orders</Text>
      </View>
      {orders.length === 0 ? (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text style={styles.emptyText}>Your orders is empty!</Text>
          <MaterialCommunityIcons
            name="truck-remove-outline"
            size={46}
            style={styles.emptyIcon}
          />
        </View>
      ) : (
        <FlatList
          data={orders}
          renderItem={({ item }) => (
            <OrdersTile key={item._id} item={item}></OrdersTile>
          )}
          style={{ marginHorizontal: 12, marginVertical: 16 }}
        />
      )}
    </SafeAreaView>
  );
};

export default Orders;
