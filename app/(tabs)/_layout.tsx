import React from "react";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TabBar from "../../components/tabBar/TabBar";
import HomeMentor from "@/screens/HomeMentor";
import HomeStudent from "@/screens/HomeStudent";
import Profile from "@/screens/Profile";
import Login from "@/screens/Login";

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
          title: "HomeMentor",
        }}
      />
      <Tab.Screen
        name="HomeStudent"
        component={HomeStudent}
        options={{
          title: "HomeStudent",
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          title: "Profile",
        }}
      />
    </Tab.Navigator>
  );
};

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Stack.Navigator initialRouteName="Login">
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
