import axios from "axios";
import * as Yup from "yup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
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

import { COLORS } from "../constants";

import styles from "./login.style";

const Login = ({ navigation }) => {
  const [loader, setLoader] = useState(false);
  const [responseData, setResponseData] = useState(null);
  const [obsecureText, setObsecureText] = useState(false);

  const invalidForm = () => {
    Alert.alert("Invalid Form", "Please provide all required fields", [
      { text: "OK", onPress: () => console.log("OK pressed") },
    ]);
  };

  const login = async (values: any) => {
    try {
      setLoader(true);

      const response = await axios.post(`${API_URL}/api/login`, values);

      if (response.status === 200) {
        setLoader(false);

        setResponseData(response.data);

        await AsyncStorage.setItem(
          `user${responseData._id}`,
          JSON.stringify(responseData)
        );
        await AsyncStorage.setItem("id", JSON.stringify(responseData._id));

        navigation.replace("Bottom Navigation");
      } else {
        Alert.alert("Error Logging in", "Please provide valid credentials", [
          { text: "OK", onPress: () => console.log("OK pressed") },
        ]);
      }
    } catch (error: any) {
      console.log(error);
      Alert.alert(
        "Error",
        "Oops, Error logging in try again with correct credentials",
        [{ text: "OK", onPress: () => console.log("OK pressed") }]
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
            style={styles.cover}
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
              handleBlur,
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
                    style={styles.inputWrapper(
                      touched.email ? COLORS.secondary : COLORS.offwhite
                    )}
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
                      onBlur={() => setFieldTouched("email", "")}
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
                    style={styles.inputWrapper(
                      touched.password ? COLORS.secondary : COLORS.offwhite
                    )}
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
                      onBlur={() => setFieldTouched("password", "")}
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
                  style={styles.btn(
                    isValid === false ? COLORS.gray : COLORS.primary
                  )}
                  disabled={isValid === false || loader === true}
                  onPress={isValid ? handleSubmit : invalidForm}
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
