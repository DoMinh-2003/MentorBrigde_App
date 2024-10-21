import React from "react";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TabBar from "../../components/tabBar/TabBar";
import HomeMentor from "@/screens/mentorScreens/HomeMentor";
import HomeStudent from "@/screens/studentScreens/HomeStudent";
import Profile from "@/screens/Profile";
import Login from "@/screens/authScreens/Login";


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeTabsMentor = () => {
  const colorScheme = useColorScheme();

  return (
    <Tab.Navigator
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarStyle: { height: 90 },
        tabBarItemStyle: { paddingTop: 10 },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeMentor}
        options={{
          title: "Trang chủ",
        }}
      />
      {/* <Tab.Screen
        name="HomeStudent"
        component={HomeStudent}
        options={{
          title: "HomeStudent",
        }}
      /> */}
      <Tab.Screen
        name="Schedule"
        component={Profile}
        options={{
          title: "Lịch Trình",
        }}
      />
      <Tab.Screen
        name="Request"
        component={Profile}
        options={{
          title: "Xử lí yêu cầu",
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={Profile}
        options={{
          title: "Thông báo",
        }}
      />

      {/* <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          title: "Hồ sơ",
        }}
      /> */}
      <Tab.Screen
        name="Setting"
        component={Profile}
        options={{
          title: "Cài đặt",
        }}
      />
    </Tab.Navigator>
  );
};

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Stack.Navigator initialRouteName="HomeMentor">
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ title: "Login", headerShown: false }}
      />
      <Stack.Screen
        name="HomeMentor"
        component={HomeTabsMentor}
        options={{ headerShown: false, title: "HomeMentor" }}
      />
    </Stack.Navigator>
  );
}
