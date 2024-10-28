import { Text, View } from "react-native";
import { Button, ButtonText } from "../ui/button";
import { Box } from "../ui/box";
import Entypo from "@expo/vector-icons/Entypo";
function TeamList() {
  return (
    <Box className="h-12 w-full rounded-full bg-white flex items-center justify-center mb-5">
      <View className="flex-row justify-around items-center w-full">
        <Text className="font-bold">BANA</Text>
        <Text>ConnectED-...</Text>

        <Entypo name="dots-three-horizontal" size={20} color="black" />
      </View>
    </Box>
  );
}

export default TeamList;
