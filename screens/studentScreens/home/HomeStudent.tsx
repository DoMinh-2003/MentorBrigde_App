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
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useCurrentUser } from "@/utils/getCurrentUser";
import useStudentService from "@/service/useStudentService";
import { useCallback, useEffect, useState } from "react";
import { useFocusEffect } from "expo-router";
import useBookingService from "@/service/useBookingService";
import {
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectIcon,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
} from "@/components/ui/select";
import { ChevronDownIcon } from "@/components/ui/icon";

const HomeStudent = () => {
  const insets = useSafeAreaInsets();
  const [dataTeam, setDataTeam] = useState({});
  const [dataSource, setDataSource] = useState([]);
  const { getUserTeam, loading } = useStudentService();
  const { getBooking } = useBookingService();
  const [selectedValue, setSelectedValue] = useState("Tất Cả");

  const handleValueChange = (value: any) => {
    console.log(value);
    setSelectedValue(value); 
  };

  const user = useCurrentUser();

  const pieData = [
    { x: "point", y: 65 },
    { x: "bad", y: 35 },
  ];

  useFocusEffect(
    useCallback(() => {
      const fetchDataGroups = async () => {
        const response = await getUserTeam();
        console.log(response);
        setDataTeam(response);
      };
      const fetchDataBookings = async () => {
        const response = await getBooking(
          selectedValue === "INDIVIDUAL" || selectedValue === "TEAM"
            ? selectedValue
            : undefined,
          "REQUESTED"
        );
        console.log(response);
        setDataSource(response);
      };
      fetchDataBookings();
      fetchDataGroups();
    }, [selectedValue])
  );

  return (
    <View style={{ marginBottom: 80 }}>
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
            source={require("../../../assets/images/student1.png")}
            resizeMode="cover"
            imageStyle={{ borderRadius: 16 }}
            className="flex-1 p-4"
          >
            <View className="h-full flex flex-col justify-between">
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
            source={require("../../../assets/images/bgChartStudent.png")}
            resizeMode="cover"
            imageStyle={{ borderRadius: 16 }}
            className="flex-1 px-4"
          >
            <View className="flex flex-row justify-between items-center mt-0 h-1/5">
              <Text className="font-bold text-sm text-white">
                Số điểm còn lại trong kì (65/100)
              </Text>
            </View>
            <Pie data={pieData} colorScale={["#FFFFFF", "#DEDEE0"]} />
          </ImageBackground>
        </Card>

        {/* List of topic */}
        <Card className="mt-5 border border-[#D5D5D7] h-[340px] rounded-2xl w-full">
          <View className="flex flex-row justify-between items-center mt-0 h-1/5 l">
            <Text className="font-bold text-base">
              Danh sách thành viên nhóm
            </Text>
            {/* <Button
            variant="solid"
            action="primary"
            style={{
              width: 120,
              backgroundColor: "black",
              borderRadius: 99999,
            }}
          >
            <ButtonText className="text-[10px] font-medium-cereal text-center">
              Thêm thành viên
            </ButtonText>
          </Button> */}
          </View>
          <View className=" h-4/5">
            <ScrollView
              nestedScrollEnabled={true}
              scrollEnabled={true}
              showsVerticalScrollIndicator={true}
              persistentScrollbar={true}
              className="mt-4"
            >
              {dataTeam?.userTeams && dataTeam?.userTeams?.length > 0 ? (

                dataTeam?.userTeams?.map((item) => (

                  <Box
                    key={item.id}
                    className="h-12 w-full rounded-full border border-[#D5D5D7] flex items-center justify-center px-1 mb-5"
                  >
                    <View className="flex-row justify-around items-center w-full">
                      <Avatar size="sm">
                        <AvatarImage
                          source={{
                            uri: `${item?.user?.avatar}`,
                          }}
                        />
                      </Avatar>

                      <Text numberOfLines={1} className="font-bold">
                        {item?.user?.studentCode}
                      </Text>
                      <Text className="font-bold">
                        {item?.role == "MENTOR"
                          ? "GV Hướng Dẫn"
                          : item?.role == "LEADER"
                            ? "Nhóm Trưởng"
                            : "Thành Viên"}
                      </Text>
                      <Text className="font-extrabold">...</Text>
                    </View>
                  </Box>
                ))
              ) : (
                <Text>Không có dữ liệu người dùng</Text> // Thông báo khi `userTeams` trống hoặc không tồn tại
              )}
            </ScrollView>
          </View>
        </Card>

        {/* History of topic */}
        <Card className="p-0 mt-5 h-[260px] rounded-2xl mb-20">
          <ImageBackground
            source={require("../../../assets/images/student2.png")}
            resizeMode="cover"
            imageStyle={{ borderRadius: 16 }}
            className="flex-1 p-4"
          >
            <View>
              <View className="flex flex-row justify-between items-center">
                <Text className="font-bold text-[16px] text-white">
                  Lịch sử yêu cầu cuộc họp
                </Text>

                <Select
                  onValueChange={handleValueChange}
                  selectedValue={selectedValue}
                >
                  <SelectTrigger
                    className="bg-white"
                    variant="rounded"
                    size="sm"
                  >
                    <SelectInput placeholder="Select option" />
                    <SelectIcon className="mr-3" as={ChevronDownIcon} />
                  </SelectTrigger>
                  <SelectPortal>
                    <SelectBackdrop />
                    <SelectContent>
                      <SelectDragIndicatorWrapper>
                        <SelectDragIndicator />
                      </SelectDragIndicatorWrapper>
                      <SelectItem label="Cá Nhân" value="INDIVIDUAL" />
                      <SelectItem className="pb-10" label="Nhóm" value="TEAM" />
                    </SelectContent>
                  </SelectPortal>
                </Select>
              </View>
              <ScrollView
                nestedScrollEnabled={true}
                scrollEnabled={true}
                showsVerticalScrollIndicator={true}
                persistentScrollbar={true}
                className="mt-4"
              >
                <VStack space="2xl" reversed={false} className="mt-4">
                  {dataSource?.map((item) => (
                    <Box
                      key={item?.id}
                      className="h-12 w-full rounded-full bg-white flex items-center justify-center"
                    >
                      <View className="flex-row justify-around items-center w-full">
                        <Text className="font-bold">
                          {item?.mentor?.fullName}
                        </Text>
                        {/* <Text>-3 điểm</Text> */}
                        <Text className="font-bold">
                          {(() => {
                            const date = new Date(item?.createdAt);
                            return `${String(date.getDate()).padStart(2, "0")}-${String(date.getMonth() + 1).padStart(2, "0")}-${date.getFullYear()}`;
                          })()}
                        </Text>
                        <Button
                          variant="solid"
                          action="primary"
                          style={{
                            width: 91,
                            height: 30,
                            backgroundColor: "#FF6001",
                            borderRadius: 99999,
                          }}
                        >
                          <ButtonText className="text-xs font-medium-cereal text-center">
                            Đang xử lí
                          </ButtonText>
                        </Button>
                      </View>
                    </Box>
                  ))}
                </VStack>
              </ScrollView>
            </View>
          </ImageBackground>
        </Card>
      </ScrollView>
    </View>
  );
};

export default HomeStudent;
