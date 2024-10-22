import CustomCalendar from "@/components/calendar/CustomCalendar";
import { LinearGradient } from "@/components/ui/gradient/LinearGradient";
import { useState } from "react";
import { Text, View } from "react-native";
import { ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Box } from "@/components/ui/box";
import { Card } from "@/components/ui/card";
import { Button, ButtonText } from "@/components/ui/button";
function MentorSchedule() {
  const insets = useSafeAreaInsets();
  const [selected, setSelected] = useState("");
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      nestedScrollEnabled={true}
      style={{ paddingTop: insets.top }}
      className="m-[15px]"
    >
      <Text className="font-extra-bold-cereal text-2xl font-bold mb-5">
        Lịch trình
      </Text>

      <CustomCalendar selected={selected} setSelected={setSelected} />
      <View className="mt-4 w-full">
        <Text className="font-extra-bold-cereal text-2xl font-bold mb-4">
          Thông tin cuộc họp
        </Text>

        <LinearGradient
          className="rounded-full items-center w-32 h-10 flex justify-center p-2 mt-1"
          colors={["#FF6001", "#FF9759"]}
          start={[0.5, 0]}
          end={[0.5, 1]}
        >
          <Text className="text-white font-semibold">{selected}</Text>
        </LinearGradient>
      </View>

      <View className="mt-5 w-full ">
        <Text className="text-xl font-extra-bold-cereal mt-5 font-medium">
          Danh sách cuộc họp trong ngày
        </Text>

        <View className="h-[380px]">
          <ScrollView
            nestedScrollEnabled={true}
            scrollEnabled={true}
            showsVerticalScrollIndicator={true}
            persistentScrollbar={true}
            className="mt-4 "
          >
            <Box className="h-12 w-full rounded-full  border border-[#D5D5D7] flex-row items-center justify-between px-2 mb-5">
              <Text className="font-bold">07:30-09:00</Text>
              <Button
                className="rounded-full"
                variant="solid"
                action="primary"
                style={{ backgroundColor: "#EBE173" }}
              >
                <ButtonText>Đánh giá giảng viên</ButtonText>
              </Button>
            </Box>
            <Box className="h-12 w-full rounded-full  border border-[#D5D5D7] flex-row items-center justify-between px-2 mb-5">
              <Text className="font-bold">13:30-15:30</Text>
              <Button
                className="rounded-full"
                variant="solid"
                action="primary"
                style={{ backgroundColor: "#EBE173" }}
              >
                <ButtonText>Đánh giá giảng viên</ButtonText>
              </Button>
            </Box>

            <LinearGradient
              className="rounded-full flex-row items-center w-full h-12 flex  items-center justify-between p-2 mt-1"
              colors={["#71E0FF", "#2B8FD8"]}
              start={[0, 0]}
              end={[1, 1]}
            >
              <Text className="text-white font-bold">15:30-17:00</Text>
              <View className="flex-row">
                <Button
                  className="rounded-full"
                  variant="solid"
                  action="primary"
                >
                  <ButtonText>Dời lịch</ButtonText>
                </Button>
                <Button
                  className="rounded-full"
                  variant="solid"
                  action="primary"
                  style={{ backgroundColor: "white" }}
                >
                  <ButtonText style={{color:"black"}}>Đến phòng họp</ButtonText>
                </Button>
              </View>
            </LinearGradient>
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  );
}

export default MentorSchedule;
