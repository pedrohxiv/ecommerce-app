import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { type NavigationProp, useNavigation } from "@react-navigation/native";
import { Feather, Ionicons } from "@expo/vector-icons";

import { COLORS, SIZES } from "../../constants";
import type { RootStackParamList } from "../../types";

import styles from "./styles/welcome.style";

const Welcome = () => {
  const navigation: NavigationProp<RootStackParamList> = useNavigation();

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.welcomeTitle}>Find The Most</Text>
        <Text style={styles.welcomeSubtitle}>Luxurious Furniture</Text>
      </View>
      <View style={styles.searchContainer}>
        <TouchableOpacity>
          <Feather name="search" size={24} style={styles.searchIcon} />
        </TouchableOpacity>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value=""
            onPressIn={() => navigation.navigate("Search")}
            placeholder="What are you looking for"
          />
        </View>
        <View>
          <TouchableOpacity style={styles.searchBtn}>
            <Ionicons
              name="camera-outline"
              size={SIZES.xLarge}
              color={COLORS.offwhite}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Welcome;
