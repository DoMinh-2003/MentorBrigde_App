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
import AntDesign from '@expo/vector-icons/AntDesign';

const HomeMentor = () => {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
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
        className="p-0 bg-[#2DD1FF8F] rounded-2xl h-[180px]"
      >
        <ImageBackground
          source={require("../../assets/images/blue-abstract.png")}
          resizeMode="cover"
          className="flex-1 p-4"
        >
          <View className="h-full  flex flex-col justify-between">
            <View>
              <Text className="text-xs font-medium-cereal font-bold text-white">
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
                  width: 103,
                  backgroundColor: "black",
                  borderRadius: 99999,
                  cursor: "pointer",
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

      {/* List of topic */}
      <Card className="mt-5 border border-[#D5D5D7] h-[370px] rounded-2xl">
        <View className="flex flex-row justify-between items-center mt-0">
          <Text className="font-bold text-[16px]">Danh sách đề tài</Text>
          <Button
            variant="solid"
            action="primary"
            style={{
              width: 120,
              // height:45,
              backgroundColor: "black",
              borderRadius: 99999,
              cursor: "pointer",
            }}
          >
            <ButtonText className="text-[10px] font-medium-cereal text-center">
              Thêm đề tài mới +
            </ButtonText>
          </Button>
        </View>
        <SafeAreaView>
          <ScrollView
            className="h-[250px] mt-5"
            scrollEnabled={true}
            showsVerticalScrollIndicator={true}
          >
            <VStack space="2xl" reversed={false}>
              <Box className="h-12 w-full rounded-full border border-[#D5D5D7] flex items-center justify-center">
                <View className="flex-row justify-around items-center w-full">
                  <Text className="font-bold">1</Text>
                  <Text>ConnectED – Nền tảng kết nối...</Text>
                  <Text className="font-bold">...</Text>
                </View>
              </Box>
              <Box className="h-12 w-full rounded-full border border-[#D5D5D7] flex items-center justify-center">
                <View className="flex-row justify-around items-center w-full">
                  <Text className="font-bold">2</Text>
                  <Text>ConnectED – Nền tảng kết nối...</Text>
                  <Text className="font-bold">...</Text>
                </View>
              </Box>
              <Box className="h-12 w-full rounded-full border border-[#D5D5D7] flex items-center justify-center">
                <View className="flex-row justify-around items-center w-full">
                  <Text className="font-bold">3</Text>
                  <Text>ConnectED – Nền tảng kết nối...</Text>
                  <Text className="font-bold">...</Text>
                </View>
              </Box>
              <Box className="h-12 w-full rounded-full border border-[#D5D5D7] flex items-center justify-center">
                <View className="flex-row justify-around items-center w-full">
                  <Text className="font-bold">4</Text>
                  <Text>ConnectED – Nền tảng kết nối...</Text>
                  <Text className="font-bold">...</Text>
                </View>
              </Box>
            </VStack>
          </ScrollView>
        </SafeAreaView>
      </Card>

      {/* History of topic */}
      <Card className="p-0 mt-5 h-[270px] rounded-2xl mb-20">
        <ImageBackground
          source={require("../../assets/images/Rectangle28.png")}
          resizeMode="cover"
          className="flex-1 p-4"
        >
          <View>
            <View className="flex flex-row justify-between items-center">
              <Text className="font-bold text-[16px]">Lịch sử thêm đề tài</Text>
              <Button
                variant="solid"
                action="primary"
                style={{
                  width: 106,
                  backgroundColor: "#00000033",
                  borderRadius: 99999,
                  cursor: "pointer",
                }}
              >
                <ButtonText className="text-base font-medium-cereal text-center">
                  Tất cả <AntDesign name="down" size={13} color="white" />
                </ButtonText>
              </Button>
            </View>

            <VStack space="2xl" reversed={false} className="mt-4">
              <Box className="h-12 w-full rounded-full bg-white flex items-center justify-center">
                <View className="flex-row justify-around items-center w-full">
                  <Text>ConnectED-...</Text>
                  <Text className="font-bold">30-08-2024</Text>
                  <Button
                    variant="solid"
                    action="primary"
                    style={{
                      width: 91,
                      height: 30,
                      backgroundColor: "#449CEE",
                      borderRadius: 99999,
                      cursor: "pointer",
                    }}
                  >
                    <ButtonText className="text-xs font-medium-cereal text-center">
                      Đang xử lí
                    </ButtonText>
                  </Button>
                </View>
              </Box>
              <Box className="h-12 w-full rounded-full bg-white flex items-center justify-center">
                <View className="flex-row justify-around items-center w-full">
                  <Text>ConnectED-...</Text>
                  <Text className="font-bold">30-08-2024</Text>
                  <Button
                    variant="solid"
                    action="primary"
                    style={{
                      width: 91,
                      height: 30,
                      backgroundColor: "#151316",
                      borderRadius: 99999,
                      cursor: "pointer",
                    }}
                  >
                    <ButtonText className="text-xs font-medium-cereal text-center">
                      Bị từ chối
                    </ButtonText>
                  </Button>
                </View>
              </Box>
              <Box className="h-12 w-full rounded-full bg-white flex items-center justify-center">
                <View className="flex-row justify-around items-center w-full">
                  <Text>ConnectED-...</Text>
                  <Text className="font-bold">30-08-2024</Text>
                  <Button
                    variant="solid"
                    action="primary"
                    style={{
                      width: 91,
                      height: 30,
                      backgroundColor: "#13D1B8",
                      borderRadius: 99999,
                      cursor: "pointer",
                    }}
                  >
                    <ButtonText className="text-xs font-medium-cereal text-center">
                      Chấp nhận
                    </ButtonText>
                  </Button>
                </View>
              </Box>
            </VStack>
          </View>
        </ImageBackground>
      </Card>
    </ScrollView>
  );
};

export default HomeMentor;
