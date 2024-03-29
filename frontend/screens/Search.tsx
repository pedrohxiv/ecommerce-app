import axios from "axios";

import { API_URL } from "@env";

import { useState } from "react";
import {
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Ionicons, Feather } from "@expo/vector-icons";

import { SearchTile } from "../components";
import { COLORS, SIZES } from "../constants";

import type { IProduct } from "../types";

import styles from "./styles/search.style";

const Search = () => {
  const [searchKey, setSearchKey] = useState("");
  const [searchResults, setSearchResults] = useState<IProduct[]>([]);

  const handleSearch = () => {
    axios
      .get(`${API_URL}api/products/search/${searchKey}`)
      .then((response) => setSearchResults(response.data))
      .catch((error) => console.error(error));
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
            autoFocus={true}
            onSubmitEditing={handleSearch}
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
          renderItem={({ item }) => <SearchTile key={item._id} item={item} />}
          style={{ marginHorizontal: 12 }}
        />
      )}
    </SafeAreaView>
  );
};

export default Search;
