import { View, Text } from "react-native";
import { ScrollView } from "react-native";
import { Box } from "../ui/box";
import { LinearGradient } from "../ui/gradient/LinearGradient";
import { Divider } from "@/components/ui/divider";
import { convertPointChangeType, convertTeamType } from "@/utils/convertStatus";
const TransactionPoint = ({ transaction }: any) => {
  return (
    <ScrollView
      nestedScrollEnabled={true}
      scrollEnabled={true}
      showsVerticalScrollIndicator={true}
      persistentScrollbar={true}
      className="mt-4"
    >
      <Text className="font-extra-bold-cereal text-2xl font-bold mb-5">
        Lịch sử trừ/ hoàn điểm
      </Text>
      <LinearGradient
        className="rounded-lg items-center w-full h-12 flex justify-center  mt-1"
        colors={["#FF6001", "#FF9759"]}
        start={[0, 0]}
        end={[1, 1]}
      >
        <View className="flex-row justify-around items-center gap-2 w-full">
          <Text className="text-white">Loại đặt lịch</Text>
          <Text className="text-white">Trạng thái</Text>
          <Text className="text-white">Điểm còn lại</Text>
        </View>
      </LinearGradient>
      {/* <Box className="h-fit bg-[#D43900] w-10 rounded-xl"> <Text className="text-black bg-[#D43900]">{convertPointChangeType(t?.pointChangeType)}</Text></Box> */}
      {transaction.map((t, idx) => (
        <View key={idx}>
          <View className="flex-row justify-around items-center gap-2 w-full my-3">
            <Text className="text-black">
              {convertTeamType(t?.bookingTypeEnum)}
            </Text>

            <Text className="text-black">
              {convertPointChangeType(t?.pointChangeType)}
            </Text>
            <Text className="text-black">{t?.newPoints}</Text>
          </View>
          <Divider />
        </View>
      ))}
    </ScrollView>
  );
};

export default TransactionPoint;
