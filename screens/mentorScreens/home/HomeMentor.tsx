import { View, Text } from "react-native";
import {
  SafeAreaView,
  useSafeAreaFrame,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Button, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ImageBackground } from "@/components/ui/image-background";
import { ScrollView } from "react-native";
import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import Pie from "@/components/chart/Pie";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useCurrentUser } from "@/utils/getCurrentUser";
import useTopicService from "@/service/useTopicService";
import { Topic } from "@/models/topic";
import { SwipeablePanel } from "rn-swipeable-panel";
import GroupSection from "@/components/group-section/TeamList";
import TeamList from "@/components/group-section/TeamList";
import useMentorService from "@/service/useMentorService";
import { useFocusEffect } from "expo-router";

const HomeMentor = () => {
  const insets = useSafeAreaInsets();
  const user = useCurrentUser();
  const [topic, setTopic] = useState<Topic[] | undefined>();
  const { getTopics } = useTopicService();

  const { getTeams } = useMentorService();
  const [teams, setTeams] = useState([]);
  const pieData = [
    { x: "good", y: 65 },
    { x: "bad", y: 35 },
  ];

  const [panelProps, setPanelProps] = useState({
    fullWidth: true,
    openLarge: true,
    showCloseButton: true,
    onClose: () => closePanel(),
    onPressCloseButton: () => closePanel(),
    // ...or any prop you want
  });
  const [isPanelActive, setIsPanelActive] = useState(false);

  const openPanel = () => {
    setIsPanelActive(true);
  };

  const closePanel = () => {
    setIsPanelActive(false);
  };

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        try {
          const [fetchedTopics, fetchedTeams] = await Promise.all([
            getTopics({
              page: 1,
              size: 10,
              sortBy: "name",
              sortDirection: "asc",
              status: "",
            }),
            getTeams(),
          ]);
          setTopic(fetchedTopics);
          setTeams(fetchedTeams);
        } catch (error) {
          console.log(error);
        }
      };
  
      fetchData();
    }, []) 
  );
  return (
    <View style={{marginBottom: 80}}>
      <ScrollView
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}
        style={{ paddingTop: insets.top }}
        className="m-[15px]"
      >
        <Text className="font-extra-bold-cereal text-2xl font-bold mb-5">
          Trang chủ
        </Text>

        {/* View Next Meeting */}
        <Card
          size="lg"
          variant="elevated"
          className="p-0 rounded-2xl h-[180px]"
        >
          <ImageBackground
            source={require("../../../assets/images/blue-abstract.png")}
            resizeMode="cover"
            imageStyle={{ borderRadius: 16 }}
            className="flex-1 p-4"
          >
            <View className="h-full  flex flex-col justify-between">
              <View>
                <Text className="text-base font-medium-cereal font-bold text-white">
                  Buổi hẹn tiếp theo sẽ bắt đầu vào
                </Text>
                <Text className="text-2xl font-extra-bold-cereal text-white font-bold">
                  3 ngày nữa
                </Text>
              </View>
              <View className="flex justify-end items-end">
                <Button
                  variant="solid"
                  action="primary"
                  style={{
                    width: 105,
                    backgroundColor: "black",
                    borderRadius: 99999,
                  }}
                >
                  <ButtonText className="text-[10px] font-medium-cereal">
                    Xem lịch ngay
                  </ButtonText>
                </Button>
              </View>
            </View>
          </ImageBackground>
        </Card>

        {/* Chart Pie */}

        <Card className="p-0 h-[380px] mt-5 rounded-2xl">
          <ImageBackground
            source={require("../../../assets/images/bgChart.png")}
            resizeMode="cover"
            imageStyle={{ borderRadius: 16 }}
            className="flex-1 px-4"
          >
            <View className="flex flex-row justify-between items-center mt-0 h-1/5">
              <Text className="font-bold text-sm text-white">
                Tỉ lệ phản hồi tích cực từ sinh viên (%)
              </Text>
              <View className="bg-[#FFFFFF30] rounded-xl w-10 h-10 text-center flex items-center justify-center">
                <Feather name="eye" size={24} color="white" />
              </View>
            </View>
            <Pie data={pieData} colorScale={["#FF6001", "#FFCEB0"]} />
          </ImageBackground>
        </Card>

        {/* List of topic */}
        <Card className="mt-5 border border-[#D5D5D7] h-[340px] rounded-2xl">
          <View className="flex flex-row justify-between items-center mt-0 h-1/5">
            <Text className="font-bold text-[16px]">Danh sách đề tài</Text>
            <Button
              variant="solid"
              action="primary"
              style={{
                width: 125,
                backgroundColor: "black",
                borderRadius: 99999,
              }}
            >
              <ButtonText className="text-[10px] font-medium-cereal text-center">
                Thêm đề tài mới +
              </ButtonText>
            </Button>
          </View>
          <View className=" h-4/5">
            <ScrollView
              nestedScrollEnabled={true}
              scrollEnabled={true}
              showsVerticalScrollIndicator={true}
              persistentScrollbar={true}
              className="mt-4"
            >
              {topic?.map((t, index) => (
                <Box
                  key={index}
                  className="h-12 w-full rounded-full border border-[#D5D5D7] flex items-center justify-center px-1 mb-5"
                >
                  <View className="flex-row justify-around items-center w-full">
                    <Text className="font-bold">{index + 1}</Text>
                    <Text numberOfLines={1} className="w-3/4">
                      {t?.name}
                    </Text>
                    <Text className="font-extrabold" onPress={openPanel}>
                      ...
                    </Text>
                  </View>
                </Box>
              ))}
            </ScrollView>
          </View>
        </Card>

        {/* History of topic */}
        <Card className="p-0 mt-5 h-[260px] rounded-2xl mb-20">
          <ImageBackground
            source={require("../../../assets/images/Rectangle28.png")}
            resizeMode="cover"
            imageStyle={{ borderRadius: 16 }}
            className="flex-1 p-4"
          >
            <View>
              <View className="flex flex-row justify-between items-center">
                <Text className="font-bold text-[16px]">Danh sách nhóm</Text>
              </View>

              <ScrollView
                nestedScrollEnabled={true}
                scrollEnabled={true}
                showsVerticalScrollIndicator={true}
                persistentScrollbar={true}
                className="mt-4 h-4/5"
              >
                <TeamList groups={teams}/>
              </ScrollView>
            </View>
          </ImageBackground>
        </Card>
      </ScrollView>

      {/* View details topic */}
      <SwipeablePanel {...panelProps} isActive={isPanelActive}>
        <View className="p-4">
          <Text className="font-bold font-medium-cereal text-2xl">
            Chi tiết đề tài
          </Text>
          <Text>Tên đề tài:</Text>
          <Text>Mô tả:</Text>
        </View>
      </SwipeablePanel>
    </View>
  );
};

export default HomeMentor;
