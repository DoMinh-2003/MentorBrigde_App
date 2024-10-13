// import { auth } from "@/config/firebase";
// import {
//   StyleSheet,
//   View,
//   Button,
//   Text,
//   Platform,
//   FlatList,
// } from "react-native";
// import * as Google from "expo-auth-session/providers/google";
// import { signInWithCredential, GoogleAuthProvider } from "firebase/auth";
// import * as WebBrowser from "expo-web-browser";
// import { useEffect, useState } from "react";
// import { useNavigation } from "expo-router";
// import * as AuthSession from "expo-auth-session";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import { useDispatch } from "react-redux";
// import { login, selectUser } from "@/redux/features/userSlice";
// import { useSelector } from "react-redux";
// import api from "@/config/api";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// WebBrowser.maybeCompleteAuthSession();

// const styles = StyleSheet.create({
//   titleContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 8,
//   },
//   stepContainer: {
//     gap: 8,
//     marginBottom: 8,
//   },
//   reactLogo: {
//     height: 178,
//     width: 290,
//     bottom: 0,
//     left: 0,
//     position: "absolute",
//   },
// });

// export default function HomeScreen() {
//   const navigate = useNavigation();
//   const insets = useSafeAreaInsets();
//   const dispatch = useDispatch();
//   const user = useSelector(selectUser);

//   const [request, response, promptAsync] = Google.useAuthRequest({
//     iosClientId:
//       "905643072609-d7asrraqm6ta73j27n1c3l0q89ospuiq.apps.googleusercontent.com",
//     androidClientId:
//       "905643072609-b35qdfcn942ltpe22oln6unlr7n4r586.apps.googleusercontent.com",
//   });

//   const loginGG = async () => {
//     if (response?.type === "success") {
//       const { authentication } = response;
//       const credential = await GoogleAuthProvider.credential(
//         authentication?.idToken,
//         authentication?.accessToken
//       );
//       try {
//         const res = await signInWithCredential(auth, credential);
//         const { accessToken } = res.user;
//         alert(res.user.accessToken);
//         console.log(accessToken);
//       } catch (error) {
//         console.log(error);
//       }
//     }
//   };

//   //   const [data, setData] = useState([]);
//   //   const fetchData = async () => {
//   //     try {
//   //       const response = await api.post("login",{
//   //         username: "string",
//   //         password: "string"
//   //       });
//   //       setData(response.data);
//   //       AsyncStorage.setItem("token", response.data.data.token)
//   //       dispatch(login(response.data.data))
//   //     } catch (e) {
//   //       console.log(e);
//   //     }
//   //   };

//   // useEffect(() => {
//   //   fetchData();
//   // }, []);

//   useEffect(() => {
//     loginGG();
//   }, [response]);

//   return (
//     <View style={[styles.titleContainer, { paddingTop: insets.top }]}>
//       <Button
//         title="loginGG"
//         onPress={() => {
//           promptAsync();
//         }}
//       />

//       <Text>{user.fullName}</Text>

//       {/* <FlatList
//       data={}
//       keyExtractor={item => item.id}
//       renderItem={({item}) => {
//         item.
//       }}

//       /> */}
//     </View>
//   );
// }
