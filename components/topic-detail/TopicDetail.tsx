import { View, Text } from "react-native";
import { HStack } from "@/components/ui/hstack";
import { Box } from "../ui/box";
import { VStack } from "../ui/vstack";
import { Button, ButtonText } from "../ui/button";
import useTopicService from "@/service/useTopicService";
import { useEffect } from "react";
const TopicDetail = ({ selected, handleClose , setFetch}: any) => {

  const { bookTopic } = useTopicService();

  const onFinish = async () => {
   await bookTopic(selected.id);
    setFetch(selected.id)
    handleClose()
  };

  return (
    <View className="w-full mt-3">
      <Text className="font-extra-bold-cereal text-2xl font-bold mb-5">
        Chi tiết đề tài
      </Text>

      <VStack space="md">
        <Box className="h-auto w-full  rounded-2xl flex-row items-center px-2 py-3">
          <Text className="w-3/12 mr-5">Giảng viên</Text>
          <Text className="w-3/5">{selected?.creator?.fullName}</Text>
        </Box>
        <Box className="h-auto w-full  rounded-2xl flex-row items-center px-2 py-3">
          <Text className="w-3/12 mr-5">Tên đề tài</Text>
          <Text className="w-3/5 max-h-fit">{selected?.name}</Text>
        </Box>
        <Box className="h-auto w-full  rounded-2xl flex-row items-center px-2 py-3">
          <Text className="w-3/12 mr-5">File đính kèm</Text>
          <Text className="w-3/5">{selected?.files[0]?.name}</Text>
        </Box>
        <Box className="h-auto w-full  rounded-2xl flex-row items-center px-2 py-3">
          <Text className="w-3/12 mr-5">Mô tả đề tài</Text>
          <Text className="w-3/5">{selected?.description}</Text>
        </Box>
      </VStack>

      <Button
        variant="solid"
        action="primary"
        style={{
          width: "100%",
          height: 45,
          backgroundColor: "#FF7320",
          borderRadius: 99999,
          marginTop: 10,
        }}
        onPress={() => {
          onFinish();
        }}
      >
        <ButtonText className="text-base font-medium-cereal text-center">
          Chọn đề tài
        </ButtonText>
      </Button>
    </View>
  );
};

export default TopicDetail;
