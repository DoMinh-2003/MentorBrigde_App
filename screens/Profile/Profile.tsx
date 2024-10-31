import { View, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Avatar,
  AvatarBadge,
  AvatarFallbackText,
  AvatarImage,
} from "@/components/ui/avatar";
import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import Fontisto from "@expo/vector-icons/Fontisto";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Button, ButtonText } from "@/components/ui/button";
import { ScrollView } from "react-native";
import { useDispatch } from "react-redux";
import { logout, selectUser } from "@/redux/features/userSlice";
import { useNavigation } from "expo-router";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
import { RootStackParamList } from "@/models/NavigationType";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";
const Profile = () => {
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch()
  const navigation =
  useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const user = useSelector(selectUser);

  return (
   <View  style={{ paddingTop: insets.top, marginHorizontal: 16 , marginBottom: 100 ,flex: 1 }}>
      <ScrollView
      nestedScrollEnabled={true}
      showsVerticalScrollIndicator={false}
     
    >
      <View className="flex justify-center items-center mb-4">
        <Avatar size="2xl">
          <AvatarFallbackText>NoData</AvatarFallbackText>
          <AvatarImage
            source={{
              uri: "https://i.pinimg.com/474x/86/75/96/867596f6c6b8a3542268d3384b9ad91d.jpg",
            }}
          />
          <AvatarBadge />
        </Avatar>
        <Text className="font-medium-cereal text-xl font-medium mt-5  ">
         {user?.fullName}
        </Text>

        <Text className="font-medium-cereal text-base mt-2">
          Kì hiện tại:{" "}
          <Text className="font-medium-cereal text-base font-bold">
            FALL2024
          </Text>
        </Text>
      </View>

      <View className="mt-7">
        <Text className="font-medium-cereal text-xl font-medium">
          Thông tin cá nhân
        </Text>

        <VStack space="sm" reversed={false} className="mt-3">
          <Box className="h-14 w-full border border-[#D5D5D7] rounded-2xl ">
            <View className="flex-row justify-between items-center h-full px-2">
              <View className="flex-row gap-2 items-center">
                <Fontisto name="email" size={24} color="black" />
                <Text className="font-medium font-medium-cereal text-base">
                  Email
                </Text>
              </View>
              <Text>{user?.email}</Text>
            </View>
          </Box>
          <Box className="h-14 w-full border border-[#D5D5D7] rounded-2xl ">
            <View className="flex-row justify-between items-center h-full px-2">
              <View className="flex-row gap-2 items-center">
                <Feather name="phone" size={24} color="black" />
                <Text className="font-medium font-medium-cereal text-base">
                  Phone
                </Text>
              </View>
              <Text>{user?.phone}</Text>
            </View>
          </Box>
          <Box className="h-14 w-full border border-[#D5D5D7] rounded-2xl ">
            <View className="flex-row justify-between items-center h-full px-2">
              <View className="flex-row gap-2 items-center">
                <Ionicons name="location-outline" size={24} color="black" />
                <Text className="font-medium font-medium-cereal text-base">
                  Địa chỉ
                </Text>
              </View>
              <Text>{user?.address}</Text>
            </View>
          </Box>
        </VStack>
      </View>

      <View className="mt-7">
        <Text className="font-medium-cereal text-xl font-medium">
          Thông tin đề tài
        </Text>

        <VStack space="sm" reversed={false} className="mt-3">
          <Box className="h-14 w-full border border-[#D5D5D7] rounded-2xl ">
            <View className="flex-row justify-between items-center h-full px-2">
              <View className="flex-row gap-2 items-center">
                <Text className="font-medium font-medium-cereal text-base">
                  Tên đề tài
                </Text>
              </View>
              <Text>Nền tải kết nối sinh viên</Text>
            </View>
          </Box>
          <Box className="h-14 w-full border border-[#D5D5D7] rounded-2xl ">
            <View className="flex-row justify-between items-center h-full px-2">
              <View className="flex-row gap-2 items-center">
                <Text className="font-medium font-medium-cereal text-base">
                  Tên Nhóm
                </Text>
              </View>
              <Text>BanAna</Text>
            </View>
          </Box>
          <Box className="h-14 w-full border border-[#D5D5D7] rounded-2xl ">
            <View className="flex-row justify-between items-center h-full px-2">
              <View className="flex-row gap-2 items-center">
                <Text className="font-medium font-medium-cereal text-base">
                  Giảng viên hướng dẫn
                </Text>
              </View>
              <Text>Nguyễn Ngọc Lâm</Text>
            </View>
          </Box>
        </VStack>
      </View>

      <Button
        variant="solid"
        action="primary"
        style={{
          width: "100%",
          backgroundColor: "black",
          borderRadius: 8,
          marginTop: 20,
        }}
        onPress={() => {
          dispatch(logout())
          navigation.navigate('Login')
          AsyncStorage.removeItem("token")
        }}
      >
        <ButtonText  className="text-base font-medium-cereal">
          Đăng xuất
        </ButtonText>
      </Button>
    </ScrollView>
   </View>
  );
};

export default Profile;
