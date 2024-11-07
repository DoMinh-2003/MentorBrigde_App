import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ScrollView, Text, View } from "react-native";
import { LinearGradient } from "@/components/ui/gradient/LinearGradient";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { useCallback, useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@/components/ui/modal";
import { Heading } from "@/components/ui/heading";
import { CloseIcon, Icon } from "@/components/ui/icon";
import useBookingService from "@/service/useBookingService";
import { useFocusEffect } from "expo-router";

interface Request {
  topic?: string;
  group?: string;
  time?: string;
}

function ProcessingRequest() {
  const insets = useSafeAreaInsets();
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState<Request>();
  const [isFetching, setIsFetching] = useState({});
  const [dataSource, setDataSource] = useState([]);

  const { getBooking, updateBooking } = useBookingService();

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        await getBooking(undefined, "REQUESTED")
          .then((response) => {
            setDataSource(response);
            console.log(response);
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      };

      fetchData();
    }, [isFetching])
  );

  const handleReject = async (id: string) => {
    const response = await updateBooking(id, "REJECTED");
    setIsFetching(response);
    setShowModal(false);
  };

  const handleApprove = async (id: string) => {
    const response = await updateBooking(id, "ACCEPTED");
    setIsFetching(response);
    setShowModal(false);
  };

  // const requests: Request[] = [
  //   {
  //     topic:
  //       "ConnectED – Nền tảng kết nối sinh viên và giảng viên để học tập và hỗ trợ trực tuyến.",
  //     group: "Quasger",
  //     time: "12-09-2024 | 12:30-13:30",
  //   },
  //   {
  //     topic:
  //       "SkillHub – Web học kỹ năng chuyên môn và chia sẻ kiến thức giữa mentor và mentee.",
  //     group: "Banana",
  //     time: "12-09-2024 | 12:30-13:30",
  //   },
  //   {
  //     topic:
  //       "EcoMarket – Chợ trực tuyến giao dịch các sản phẩm thân thiện với môi trường.",
  //     group: "Mongahari",
  //     time: "12-09-2024 | 12:30-13:30",
  //   },
  // ];

  const handleOpen = (e: Request) => {
    console.log(e);
    setShowModal(true);
    setSelected(e);
  };

  const hanleClose = () => {
    setShowModal(false);
  };

  const getName = (value : any) => {
    if (value?.student) {
      return value?.student?.studentCode || "NoName";
    } else {
      return value?.team?.code;
    }
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      nestedScrollEnabled={true}
      style={{ paddingTop: insets.top }}
      className="m-[15px]"
    >
      <Text className="font-extra-bold-cereal text-2xl font-bold mb-5">
        Xử lí yêu cầu đặt lịch
      </Text>
      <View>
        <View
          className="rounded-full  w-full h-10 flex-row items-center justify-between p-2 mt-1"
          // colors={["#2AC0D8", "#2BC1D8"]}
          // start={[0, 0]}
          // end={[1, 1]}
          style={{ backgroundColor: "#2AC0D8", borderRadius: 9999 }}
        >
          <View className="flex-row justify-between w-[60%]">
            <Text className="text-white font-medium">Số thứ tự</Text>
            <Text className="text-white font-medium">Yêu cầu</Text>
          </View>
        </View>
      </View>
      <ScrollView
        nestedScrollEnabled={true}
        scrollEnabled={true}
        showsVerticalScrollIndicator={true}
        persistentScrollbar={true}
        className="mt-4 "
      >
        {dataSource?.map((request, idx) => (
          <Box
            key={idx}
            className="h-12 w-full rounded-full  border border-[#D5D5D7] flex-row items-center justify-between px-2 mb-5"
          >
            <Text className="font-bold">{idx + 1}</Text>
            {!request?.student ? (
              <FontAwesome name="users" size={20} color="black" />
            ) : (
              <FontAwesome name="user" size={24} color="black" />
            )}
            <Text>{getName(request)}</Text>
            <Button
              className="rounded-full"
              variant="solid"
              action="primary"
              onPress={() => handleOpen(request)}
              style={{ backgroundColor: "#2AC0D8" }}
            >
              <ButtonText>Chi tiết</ButtonText>
            </Button>
          </Box>
        ))}
      </ScrollView>

      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
        }}
        size="lg"
      >
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader>
            <Heading size="xl" className="text-typography-950">
              Thông tin chi tiết
            </Heading>
            <ModalCloseButton className="border rounded-full p-1">
              <Icon
                as={CloseIcon}
                size="md"
                className="stroke-background-400 group-[:hover]/modal-close-button:stroke-background-700 group-[:active]/modal-close-button:stroke-background-900 group-[:focus-visible]/modal-close-button:stroke-background-900"
              />
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody>
            {/* <Text className="text-typography-500">
              Elevate user interactions with our versatile modals. Seamlessly
              integrate notifications, forms, and media displays. Make an impact
              effortlessly.
            </Text> */}
            {selected?.team ?  <Text className="mt-2">
              Nhóm yêu cầu:{" "}
              <Text className="font-medium">{" " + selected?.team?.code}</Text>
            </Text>:  <Text className="mt-2">
              Người yêu cầu:{" "}
              <Text className="font-medium">{" " + selected?.student?.fullName}</Text>
            </Text>}
           
            {/* <Text className="mt-2">
              Đề tài:
              <Text className="font-medium">{" " + selected?.semesters[0]?.topics[0]?.name}</Text>
            </Text> */}
            <Text className="mt-2">
              Thời gian bắt đầu:
              <Text className="font-medium">{" " + selected?.timeFrame?.timeFrameFrom}</Text>
            </Text>
            <Text className="mt-2">
              Thời gian kết thúc:
              <Text className="font-medium">{" " + selected?.timeFrame?.timeFrameTo}</Text>
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button
              variant="outline"
              action="secondary"
              onPress={() => {
                handleReject(selected?.id);
              }}
              className="rounded-full"
            >
              <ButtonText>Từ chối</ButtonText>
            </Button>
            <Button
              onPress={() => {
                handleApprove(selected?.id);
              }}
              className="rounded-full"
            >
              <ButtonText>Chấp nhận</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </ScrollView>
  );
}

export default ProcessingRequest;
