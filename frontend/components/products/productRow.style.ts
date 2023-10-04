import { StyleSheet } from "react-native";

import { SIZES } from "../../constants";

const styles = StyleSheet.create({
  container: {
    marginTop: SIZES.medium,
    marginLeft: 12,
    marginBottom: 120,
  },
  itemList: {
    columnGap: SIZES.medium,
  },
});

export default styles;
