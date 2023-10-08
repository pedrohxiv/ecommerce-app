import AsyncStorage from "@react-native-async-storage/async-storage";

import { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { type NavigationProp, useNavigation } from "@react-navigation/native";

import { Ionicons, Fontisto } from "@expo/vector-icons";

import { Carousel, Headings, ProductRow, Welcome } from "../components";
import { useCart } from "../contexts";

import type { RootStackParamList, IUser } from "../types";

import styles from "./styles/home.style";

const Home = () => {
  const navigation: NavigationProp<RootStackParamList> = useNavigation();
  const [userData, setUserData] = useState<IUser | null>(null);
  const { totalItems } = useCart();

  useEffect(() => {
    checkExistingUser();
  }, []);

  const checkExistingUser = async () => {
    try {
      const id = await AsyncStorage.getItem("id");
      const currentUser = await AsyncStorage.getItem(`user${JSON.parse(id!)}`);

      if (currentUser) {
        setUserData(JSON.parse(currentUser));
      }
    } catch (error) {
      console.error("Error retieving the data: ", error);
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.appBarWrapper}>
        <View style={styles.appBar}>
          <Ionicons name="location-outline" size={24} />
          <Text style={styles.location}>
            {userData ? userData.location : "Shanghai China"}
          </Text>
          <View style={{ alignItems: "flex-end" }}>
            <View style={styles.cartCount}>
              <Text style={styles.cartNumber}>{totalItems}</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
              <Fontisto name="shopping-bag" size={24} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <ScrollView>
        <Welcome />
        <Carousel />
        <Headings />
        <ProductRow />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
