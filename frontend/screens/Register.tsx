import axios from "axios";
import * as Yup from "yup";
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
import type { RootStackParamList } from "../types";

import styles from "./styles/register.style";

const Register: React.FC<{
  navigation: NativeStackNavigationProp<RootStackParamList, "Register">;
}> = ({ navigation }) => {
  const [loader, setLoader] = useState(false);
  const [obsecureText, setObsecureText] = useState(false);

  const invalidForm = () => {
    Alert.alert("Invalid Form", "Please provide all required fields", [
      { text: "OK" },
    ]);
  };

  const register = async (values: {
    username: string;
    location: string;
    email: string;
    password: string;
  }) => {
    try {
      setLoader(true);

      const response = await axios.post(`${API_URL}/api/register`, values);

      if (response.status === 201) {
        setLoader(false);

        navigation.push("Login");
      } else {
        Alert.alert("Error signing up", "Please provide valid credentials", [
          { text: "OK" },
        ]);
      }
    } catch (error) {
      console.log(error);
      Alert.alert(
        "Error",
        "Oops, error signing up, try again with correct credentials",
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
            initialValues={{
              username: "",
              location: "",
              email: "",
              password: "",
            }}
            validationSchema={Yup.object({
              username: Yup.string()
                .min(3, "Provide a valide username")
                .required("Required"),
              location: Yup.string()
                .min(3, "Provide a valide location")
                .required("Required"),
              email: Yup.string()
                .email("Invalid email address")
                .required("Required"),
              password: Yup.string()
                .min(8, "Must be 8 characters or more")
                .required("Required"),
            })}
            onSubmit={(values) => register(values)}
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
                  <Text style={styles.label}>Username</Text>
                  <View
                    style={
                      touched.username
                        ? styles.inputWrapperTouched
                        : styles.inputWrapper
                    }
                  >
                    <Ionicons
                      name="person-outline"
                      size={20}
                      color={COLORS.gray}
                      style={styles.icon}
                    />
                    <TextInput
                      placeholder="Enter username"
                      onFocus={() => setFieldTouched("username")}
                      onBlur={() => setFieldTouched("username")}
                      value={values.username}
                      onChangeText={handleChange("username")}
                      autoCapitalize="none"
                      autoCorrect={false}
                      style={{ flex: 1 }}
                    />
                  </View>
                  {touched.username && errors.username && (
                    <Text style={styles.errorMessage}>{errors.username}</Text>
                  )}
                </View>
                <View style={styles.wrapper}>
                  <Text style={styles.label}>Location</Text>
                  <View
                    style={
                      touched.location
                        ? styles.inputWrapperTouched
                        : styles.inputWrapper
                    }
                  >
                    <Ionicons
                      name="location-outline"
                      size={20}
                      color={COLORS.gray}
                      style={styles.icon}
                    />
                    <TextInput
                      placeholder="Enter location"
                      onFocus={() => setFieldTouched("location")}
                      onBlur={() => setFieldTouched("location")}
                      value={values.location}
                      onChangeText={handleChange("location")}
                      autoCapitalize="none"
                      autoCorrect={false}
                      style={{ flex: 1 }}
                    />
                  </View>
                  {touched.location && errors.location && (
                    <Text style={styles.errorMessage}>{errors.location}</Text>
                  )}
                </View>
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
                    <Text style={styles.btnTxt}>R E G I S T E R</Text>
                  )}
                </TouchableOpacity>
              </View>
            )}
          </Formik>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Register;
