import { StyleSheet } from "react-native";

import { COLORS, SIZES } from "../../constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
  },
  upperRow: {
    marginHorizontal: 20,
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: SIZES.xLarge,
  },
  cartTitle: {
    fontFamily: "semibold",
    fontSize: SIZES.xLarge - 2,
    color: COLORS.black,
    marginLeft: 4,
  },
  bottomRow: {
    marginHorizontal: 12,
    marginBottom: 10,
  },
  orderInfoTitle: {
    fontSize: SIZES.medium,
    fontFamily: "semibold",
    color: COLORS.black,
    marginVertical: 8,
  },
  orderInfoSubtitle: {
    fontSize: SIZES.small,
    fontFamily: "regular",
    color: COLORS.gray,
    marginTop: 3,
  },
  checkoutBtn: {
    backgroundColor: COLORS.primary,
    alignItems: "center",
    paddingVertical: 12,
    marginVertical: 8,
    borderRadius: 12,
  },
  checkoutTxt: {
    color: COLORS.lightWhite,
    fontSize: SIZES.medium,
    fontFamily: "regular",
  },
  subtotalPrice: {
    fontSize: SIZES.small,
    fontFamily: "regular",
    color: COLORS.gray,
  },
  totalPrice: {
    fontSize: SIZES.medium,
    fontFamily: "semibold",
    color: COLORS.black,
  },
  emptyText: {
    textAlign: "center",
    fontFamily: "bold",
    fontSize: SIZES.xLarge,
  },
  emptyIcon: {
    marginTop: 12,
    textAlign: "center",
  },
});

export default styles;
