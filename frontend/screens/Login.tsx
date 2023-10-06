import axios from "axios";
import * as Yup from "yup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  type ImageStyle,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Formik } from "formik";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { API_URL } from "@env";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { COLORS } from "../constants";
import type { RootStackParamList, User } from "../types";

import styles from "./styles/login.style";

const Login: React.FC<{
  navigation: NativeStackNavigationProp<RootStackParamList, "Login">;
}> = ({ navigation }) => {
  const [loader, setLoader] = useState(false);
  const [obsecureText, setObsecureText] = useState(false);

  const invalidForm = () => {
    Alert.alert("Invalid Form", "Please provide all required fields", [
      { text: "OK" },
    ]);
  };

  const login = async (values: { email: string; password: string }) => {
    try {
      setLoader(true);

      const response = await axios.post(`${API_URL}/api/login`, values);

      if (response.status === 200) {
        setLoader(false);

        await AsyncStorage.setItem(
          `user${response.data._id}`,
          JSON.stringify(response.data)
        );
        await AsyncStorage.setItem("id", JSON.stringify(response.data._id));

        navigation.replace("BottomNavigation");
      } else {
        Alert.alert("Error Logging in", "Please provide valid credentials", [
          { text: "OK" },
        ]);
      }
    } catch (error) {
      console.error(error);
      Alert.alert(
        "Error",
        "Oops, Error logging in try again with correct credentials",
        [{ text: "OK" }]
      );
    } finally {
      setLoader(false);
    }
  };

  return (
    <ScrollView>
      <SafeAreaView style={{ marginHorizontal: 20 }}>
        <View>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backBtn}
          >
            <Ionicons name="chevron-back" size={30} />
          </TouchableOpacity>
          <Image
            source={require("../assets/images/bk.png")}
            style={styles.cover as ImageStyle}
          />
          <Text style={styles.title}>Unlimited Luxurious Furniture</Text>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={Yup.object({
              email: Yup.string()
                .email("Invalid email address")
                .required("Required"),
              password: Yup.string()
                .min(8, "Must be 8 characters or more")
                .required("Required"),
            })}
            onSubmit={(values) => login(values)}
          >
            {({
              errors,
              handleChange,
              handleSubmit,
              isValid,
              setFieldTouched,
              touched,
              values,
            }) => (
              <View>
                <View style={styles.wrapper}>
                  <Text style={styles.label}>Email</Text>
                  <View
                    style={
                      touched.email
                        ? styles.inputWrapperTouched
                        : styles.inputWrapper
                    }
                  >
                    <MaterialCommunityIcons
                      name="email-outline"
                      size={20}
                      color={COLORS.gray}
                      style={styles.icon}
                    />
                    <TextInput
                      placeholder="Enter email"
                      onFocus={() => setFieldTouched("email")}
                      onBlur={() => setFieldTouched("email")}
                      value={values.email}
                      onChangeText={handleChange("email")}
                      autoCapitalize="none"
                      autoCorrect={false}
                      style={{ flex: 1 }}
                    />
                  </View>
                  {touched.email && errors.email && (
                    <Text style={styles.errorMessage}>{errors.email}</Text>
                  )}
                </View>
                <View style={styles.wrapper}>
                  <Text style={styles.label}>Password</Text>
                  <View
                    style={
                      touched.password
                        ? styles.inputWrapperTouched
                        : styles.inputWrapper
                    }
                  >
                    <MaterialCommunityIcons
                      name="lock-outline"
                      size={20}
                      color={COLORS.gray}
                      style={styles.icon}
                    />
                    <TextInput
                      secureTextEntry={!obsecureText}
                      placeholder="Enter password"
                      onFocus={() => setFieldTouched("password")}
                      onBlur={() => setFieldTouched("password")}
                      value={values.password}
                      onChangeText={handleChange("password")}
                      autoCapitalize="none"
                      autoCorrect={false}
                      style={{ flex: 1 }}
                    />
                    <TouchableOpacity
                      onPress={() => setObsecureText(!obsecureText)}
                    >
                      <MaterialCommunityIcons
                        name={obsecureText ? "eye-outline" : "eye-off-outline"}
                        size={18}
                        color={COLORS.gray}
                      />
                    </TouchableOpacity>
                  </View>
                  {touched.password && errors.password && (
                    <Text style={styles.errorMessage}>{errors.password}</Text>
                  )}
                </View>
                <TouchableOpacity
                  style={
                    isValid === false ? styles.btnValid : styles.btnInvalid
                  }
                  disabled={isValid === false || loader === true}
                  onPress={isValid ? () => handleSubmit() : () => invalidForm()}
                >
                  {loader === true ? (
                    <ActivityIndicator color={COLORS.white} />
                  ) : (
                    <Text style={styles.btnTxt}>L O G I N</Text>
                  )}
                </TouchableOpacity>
                <Text
                  style={styles.registration}
                  onPress={() => navigation.navigate("Register")}
                >
                  Register
                </Text>
              </View>
            )}
          </Formik>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Login;
