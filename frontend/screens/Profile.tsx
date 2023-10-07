import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import {
  AntDesign,
  MaterialCommunityIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { API_URL } from "@env";

import { COLORS } from "../constants";

import styles from "./styles/profile.style";
import type { RootStackParamList, User } from "../types";

const Profile: React.FC<{
  navigation: NativeStackNavigationProp<RootStackParamList, "Profile">;
}> = ({ navigation }) => {
  const [userData, setUserData] = useState<User | null>(null);
  const [userLogin, setUserLogin] = useState(false);

  useEffect(() => {
    checkExistingUser();
  }, []);

  const checkExistingUser = async () => {
    try {
      const id = await AsyncStorage.getItem("id");
      const currentUser = await AsyncStorage.getItem(`user${JSON.parse(id!)}`);

      if (currentUser !== null) {
        setUserData(JSON.parse(currentUser));
        setUserLogin(true);
      } else {
        navigation.navigate("Login");
      }
    } catch (error) {
      console.error("Error retieving the data: ", error);
    }
  };

  const clearCache = () => {
    Alert.alert(
      "Clear Cache",
      "Are you sure you want to delete all saved data on your device?",
      [
        { text: "Cancel" },
        {
          text: "Continue",
          onPress: async () => {
            const userId = await AsyncStorage.getItem("id");

            axios
              .delete(`${API_URL}api/cart/clear/${userId?.slice(1, -1)}`)
              .then((_response) => console.log("Your cart is clean"))
              .catch((error) => console.error(error));

            await AsyncStorage.removeItem(`favorites${JSON.parse(userId!)}`);
          },
        },
      ]
    );
  };

  const deleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account? Your account will be PERMANENTLY deleted!",
      [
        { text: "Cancel" },
        {
          text: "Continue",
          onPress: async () => {
            const userId = await AsyncStorage.getItem("id");

            axios.delete(`${API_URL}api/users/${JSON.parse(userId!)}`);

            navigation.navigate("Login");
          },
        },
      ]
    );
  };

  const logout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel" },
      {
        text: "Continue",
        onPress: async () => {
          try {
            const id = await AsyncStorage.getItem("id");

            await AsyncStorage.multiRemove([`user${JSON.parse(id!)}`, "id"]);

            navigation.replace("BottomNavigation");
          } catch (error) {
            console.log("Error loggin out the user: ", error);
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <View style={{ width: "100%" }}>
          <Image
            source={require("../assets/images/space.jpg")}
            style={styles.cover}
          />
        </View>
        <View style={styles.profileContainer}>
          <Image
            source={
              userLogin === true
                ? require("../assets/images/profile.jpeg")
                : null
            }
            style={
              userLogin === true
                ? styles.profile
                : { ...styles.profile, borderWidth: 0 }
            }
          />
          <Text style={styles.name}>
            {userLogin === true
              ? userData?.username
              : "Please login into your account"}
          </Text>
          {userLogin === false ? (
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <View style={styles.loginBtn}>
                <Text style={styles.menuText}>L O G I N</Text>
              </View>
            </TouchableOpacity>
          ) : (
            <View style={styles.loginBtn}>
              <Text style={styles.menuText}>{userData?.email}</Text>
            </View>
          )}
          {userLogin === false ? (
            <View></View>
          ) : (
            <View style={styles.menuWrapper}>
              <TouchableOpacity
                onPress={() => navigation.navigate("Favorites")}
              >
                <View style={styles.menuItem}>
                  <MaterialCommunityIcons
                    name="heart-outline"
                    size={24}
                    color={COLORS.primary}
                  />
                  <Text style={styles.menuText}>Favorites</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate("Orders")}>
                <View style={styles.menuItem}>
                  <MaterialCommunityIcons
                    name="truck-delivery-outline"
                    size={24}
                    color={COLORS.primary}
                  />
                  <Text style={styles.menuText}>Orders</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
                <View style={styles.menuItem}>
                  <SimpleLineIcons
                    name="bag"
                    size={24}
                    color={COLORS.primary}
                  />
                  <Text style={styles.menuText}>Cart</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={clearCache}>
                <View style={styles.menuItem}>
                  <MaterialCommunityIcons
                    name="cached"
                    size={24}
                    color={COLORS.primary}
                  />
                  <Text style={styles.menuText}>Clear Cache</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={deleteAccount}>
                <View style={styles.menuItem}>
                  <AntDesign
                    name="deleteuser"
                    size={24}
                    color={COLORS.primary}
                  />
                  <Text style={styles.menuText}>Delete Account</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={logout}>
                <View style={styles.menuItem}>
                  <AntDesign name="logout" size={24} color={COLORS.primary} />
                  <Text style={styles.menuText}>Logout</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default Profile;
