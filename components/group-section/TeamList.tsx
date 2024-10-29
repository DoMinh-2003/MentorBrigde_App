import { Text, View } from "react-native";
import { Button, ButtonText } from "../ui/button";
import { Box } from "../ui/box";
import Entypo from "@expo/vector-icons/Entypo";

interface TeamListProps {
  groups?: any[];
}
const TeamList: React.FC<TeamListProps> = ({ groups }) => {
  return (
    <>
      {groups?.map((group, index) => (
        <Box key={group?.id || index} className="h-12 w-full rounded-full bg-white flex items-center justify-center mb-5">
          <View className="flex-row justify-around items-center w-full">
            <Text className="font-bold">{group?.code}</Text>
            <Text className="w-2/4" numberOfLines={1}>
              {group?.topics[0]?.name}
            </Text>

            <Entypo name="dots-three-horizontal" size={20} color="black" />
          </View>
        </Box>
      ))}
    </>
  );
};

export default TeamList;
