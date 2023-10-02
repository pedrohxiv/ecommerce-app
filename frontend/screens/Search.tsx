import axios from "axios";
import { useState } from "react";
import {
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, Feather } from "@expo/vector-icons";

import { SearchTile } from "../components";
import { COLORS, SIZES } from "../constants";

import styles from "./search.style";

const Search = () => {
  const [searchKey, setSearchKey] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  console.log(searchResults);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://44be-177-96-4-44.ngrok.io/api/products/search/${searchKey}`
      );

      setSearchResults(response.data);
    } catch (error) {
      console.error("Failed to get products", error);
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.searchContainer}>
        <TouchableOpacity>
          <Ionicons
            name="camera-outline"
            size={SIZES.xLarge}
            style={styles.searchIcon}
          />
        </TouchableOpacity>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value={searchKey}
            onChangeText={setSearchKey}
            placeholder="What are you looking for"
          />
        </View>
        <View>
          <TouchableOpacity style={styles.searchBtn} onPress={handleSearch}>
            <Feather name="search" size={24} color={COLORS.offwhite} />
          </TouchableOpacity>
        </View>
      </View>
      {searchResults.length === 0 ? (
        <View style={{ flex: 1 }}>
          <Image
            source={require("../assets/images/Pose23.png")}
            style={styles.searchImage}
          />
        </View>
      ) : (
        <FlatList
          data={searchResults}
          keyExtractor={(item: { _id: string }) => item._id}
          renderItem={({ item }) => <SearchTile item={item} />}
          style={{ marginHorizontal: 12 }}
        />
      )}
    </SafeAreaView>
  );
};

export default Search;
