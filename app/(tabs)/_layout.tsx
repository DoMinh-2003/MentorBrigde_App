import React from "react";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TabBar from "../../components/tabBar/TabBar";
import HomeMentor from "@/screens/mentorScreens/home/HomeMentor";
import HomeStudent from "@/screens/studentScreens/home/HomeStudent";
import Profile from "@/screens/profile/Profile";
import Login from "@/screens/authScreens/Login";
import MentorSchedule from "@/screens/mentorScreens/schedule/MentorSchedule";
import ProcessingRequest from "@/screens/mentorScreens/processingRequest/ProcessingRequest";
import Notification from "@/screens/Notification";
import StudentSchedule from "@/screens/studentScreens/schedule/StudentSchedule";
import Booking from "@/screens/studentScreens/booking/Booking";
import UpcomingSemester from "@/screens/upcomingSemester/UpcomingSemester";

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
        component={MentorSchedule}
        options={{
          title: "Lịch Trình",
        }}
      />
      <Tab.Screen
        name="Request"
        component={ProcessingRequest}
        options={{
          title: "Xử lí yêu cầu",
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={Notification}
        options={{
          title: "Thông báo",
        }}
      />

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
const HomeTabsStudent = () => {
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
        // component={HomeStudent}
        component={UpcomingSemester}
        options={{
          title: "Trang chủ",
        }}
      />
      <Tab.Screen
        name="Schedule"
        component={StudentSchedule}
        options={{
          title: "Lịch Trình",
        }}
      />
      <Tab.Screen
        name="Book"
        component={Booking}
        options={{
          title: "Đăt lịch",
        }}
      />

      <Tab.Screen
        name="Notifications"
        component={Notification}
        options={{
          title: "Thông báo",
        }}
      />

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
    <Stack.Navigator initialRouteName="HomeStudent">
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
      <Stack.Screen
        name="HomeStudent"
        component={HomeTabsStudent}
        options={{ headerShown: false, title: "HomeStudent" }}
      />
    </Stack.Navigator>
  );
}
