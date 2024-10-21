import { AntDesign, Feather } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
export const icons = {
  Home: (props) => <Feather name="home" size={26} {...props} />,
  HomeStudent: (props) => <AntDesign name="hearto" size={26} {...props} />,
  Profile: (props) => (
    <AntDesign name="user" size={26} color="black" {...props} />
  ),
  Request: (props) => (
    <MaterialCommunityIcons
      name="file-document-multiple-outline"
      size={26}
      color="black"
      {...props}
    />
  ),
  Schedule: (props) => (
    <Feather name="calendar" size={26} color="black" {...props} />
  ),
  Notifications: (props) => (
    <Ionicons name="notifications-outline" size={26} color="black" {...props} />
  ),
  Setting: (props) => (
    <AntDesign name="setting" size={26} color="black" {...props} />
  ),
};
