import { View, Text, StyleSheet, Image } from "react-native";
import React, { useEffect } from "react";
import { GoogleSocialButton } from "react-native-social-buttons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Authentication from "@/service/Authentication";
import * as Google from "expo-auth-session/providers/google";
import { signInWithCredential, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/config/firebase";
import { useNavigation } from "expo-router";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
import { RootStackParamList } from "@/models/NavigationType";
import { login } from "@/redux/features/userSlice";

const styles = StyleSheet.create({
  centerContent: {
    alignItems: "center",
  },

  textCenterContent: {
    fontWeight: "900",
    fontSize: 25,
    lineHeight: 50,
  },

  bottomContent: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
    flexDirection: "row",
  },

  textBottomContent: {
    fontWeight: "300",
    fontSize: 12,
    color: "#151316",
  },

  container: {
    position: "relative",
    alignItems: "center",
  },

  text: {
    fontWeight: "300",
    fontSize: 12,
    color: "#151316",
  },

  underline: {
    position: "absolute",
    bottom: -1,
    height: 1,
    width: "100%",
    backgroundColor: "black",
  },

  logo: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },

  image: {
    width: 57.28,
    height: 53,
  },

  googleSocialButton: {
    borderWidth: 1,
    borderColor: "#D5D5D7",
    borderRadius: 50,
    width: "90%",
    height: 47,
  },
});

const Login = () => {
  const insets = useSafeAreaInsets();
  const { loginGoogle } = Authentication();
  const dispatch = useDispatch();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId:
      "905643072609-d7asrraqm6ta73j27n1c3l0q89ospuiq.apps.googleusercontent.com",
    androidClientId:
      "905643072609-b35qdfcn942ltpe22oln6unlr7n4r586.apps.googleusercontent.com",
  });

  const loginGG = async () => {
    if (response?.type === "success") {
      const { authentication } = response;
      const credential = await GoogleAuthProvider.credential(
        authentication?.idToken,
        authentication?.accessToken
      );
      try {
        const res = await signInWithCredential(auth, credential);
        const { accessToken }: any = res.user;
        const response = await loginGoogle(accessToken);
        const { data } = response;
        dispatch(login(data));
        await AsyncStorage.setItem("token", data.token);

        if (data.role == "STUDENT") {
          navigation.navigate("HomeStudent");
        } else {
          navigation.navigate("HomeMentor");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    loginGG();
  }, [response]);

  return (
    <View
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        flex: 1,
      }}
    >
      <View style={styles.logo}>
        <Image
          style={styles.image}
          source={require("../../assets/images/Mentor.png")}
        />
      </View>
      <View style={styles.centerContent}>
        <Text style={styles.textCenterContent}>Đăng nhập vào hệ thống</Text>
        <GoogleSocialButton
          onPress={() => {
            promptAsync();
          }}
          buttonViewStyle={styles.googleSocialButton}
        />
      </View>
      <View style={styles.bottomContent}>
        <Text style={styles.textBottomContent}>Không thể đăng nhập? </Text>
        <View style={styles.container}>
          <Text style={styles.text}>Báo cáo ngay</Text>
          <View style={styles.underline} />
        </View>
      </View>
    </View>
  );
};

export default Login;
