import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import { useCallback } from "react";

import { BottomTabNavigation } from "./navigation";
import { Cart, NewRivals, ProductDetails } from "./screens";

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    light: require("./assets/fonts/Poppins-Light.ttf"),
    regular: require("./assets/fonts/Poppins-Regular.ttf"),
    medium: require("./assets/fonts/Poppins-Medium.ttf"),
    bold: require("./assets/fonts/Poppins-Bold.ttf"),
    semibold: require("./assets/fonts/Poppins-SemiBold.ttf"),
    extrabold: require("./assets/fonts/Poppins-ExtraBold.ttf"),
  });

  useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Bottom Navigation"
          component={BottomTabNavigation}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Cart"
          component={Cart}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Product Details"
          component={ProductDetails}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Product List"
          component={NewRivals}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}