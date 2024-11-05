import { View, Text, ScrollView, Image, Dimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "@/components/ui/gradient/LinearGradient";
import { Button, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Box } from "@/components/ui/box";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { VStack } from "@/components/ui/vstack";
import { ImageBackground } from "@/components/ui/image-background";
import { useCallback, useState } from "react";
import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  ActionsheetItem,
  ActionsheetItemText,
  ActionsheetIcon,
} from "@/components/ui/actionsheet";
import SearchStudent from "@/components/searchStudent/SearchStudent";
import TopicDetail from "@/components/topic-detail/TopicDetail";
import useStudentService from "@/service/useStudentService";
import { useFocusEffect } from "expo-router";
import { useSelector } from "react-redux";
import { login, selectUser } from "@/redux/features/userSlice";
import useTopicService from "@/service/useTopicService";
import { Topic } from "@/models/topic";
import { useDispatch } from "react-redux";
const UpcomingSemester = () => {
  const insets = useSafeAreaInsets();
  const screenHeight = Dimensions.get("window").height;
  const [showActionsheet, setShowActionsheet] = useState(false);
  const [selected, setSelected] = useState();
  
  const [search, setSearch] = useState(false);
  const [topicOpen, setTopicOpen] = useState(false);
  const { getUserTeam,createTeam , loading } = useStudentService();
  const [dataTeam, setDataTeam] = useState({});
  const { getTopics } = useTopicService();
  const [topic, setTopic] = useState<Topic[] | undefined>();
  const [fetch, setFetch] = useState();

  const user = useSelector(selectUser);
  const dispatch = useDispatch()

  useFocusEffect(
    useCallback(() => {
      const fetchDataGroups = async () => {
        try {
          const [fetchedTopics, fetchedTeams] = await Promise.all([
            getTopics({
              page: 1,
              size: 10,
              sortBy: "name",
              sortDirection: "asc",
              status: "APPROVED",
            }),
            getUserTeam(),
          ]);
          setTopic(fetchedTopics);
          setDataTeam(fetchedTeams);
        } catch (error) {
          console.log(error);
        }
      };
      fetchDataGroups();
    }, [fetch])
  );

  const handleClose = () => {
    setShowActionsheet(false);
    setTopicOpen(false);
    setSearch(false);
  };
  const handleShow = (e: any, item?: any) => {
    setShowActionsheet(true);
    

    if (e == "STUDENT") {
      setSearch(true);
      setTopicOpen(false);
    } else {
      setSelected(item)
      setSearch(false);
      setTopicOpen(true);
    }
  };

  const handleTeam = async () => {
    const response = await createTeam()
    const {code} = response
    const newUser = { ...user, code };
    dispatch(login(newUser));
    const userTeam = await getUserTeam()
    setDataTeam(userTeam);
    console.log("Tạo team thành công");
  }

  const leader = dataTeam?.userTeams?.find(
    (member) => member?.role === "LEADER"
  );

  const isLeader = leader?.user?.studentCode === user?.studentCode; // check user login is leader or member
  return (
    <ScrollView
      nestedScrollEnabled={true}
      showsVerticalScrollIndicator={false}
      style={{ paddingTop: insets.top, backgroundColor: "white" }}
    >
      <View className="m-6 mb-10">
        <Text className="font-extra-bold-cereal text-2xl font-bold mb-5">
          Trang chủ
        </Text>
        {dataTeam == null ? (
          <View className="flex justify-center items-center w-full">
            <Image source={require("../../assets/images/member.png")} />

            <Button
              variant="solid"
              action="primary"
              style={{
                width: "50%",
                backgroundColor: "#FF7320",
                borderRadius: 99999,
              }}
              onPress={() => {
                handleTeam()
              }}
            >
              <ButtonText className="text-base font-medium-cereal">
                Tạo nhóm ngay
              </ButtonText>
            </Button>

            <Text className="font-medium-cereal mt-3">
              <Text className="font-medium-cereal font-medium">Note:</Text> Khi
              có nhóm bạn mới có thể chọn đề tài
            </Text>
          </View>
        ) : (
          <View>
            <Card className="mt-5 border border-[#D5D5D7] h-[340px] rounded-2xl w-full">
              <View className="flex flex-row justify-between items-center mt-0 h-1/5 l">
                <Text className="font-bold text-base">
                  Danh sách thành viên nhóm
                </Text>
                {(isLeader || dataTeam?.userTeams?.length >= 6) && (
                  <Button
                    variant="solid"
                    action="primary"
                    style={{
                      width: 115,
                      backgroundColor: "black",
                      borderRadius: 99999,
                    }}
                    onPress={() => handleShow("STUDENT")}
                  >
                    <ButtonText className="text-sm font-medium-cereal text-center">
                      Thành viên +
                    </ButtonText>
                  </Button>
                )}
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

            {/* List of topic */}
            <Card className="p-0 mt-5 h-[260px] rounded-2xl mb-20">
              <ImageBackground
                source={require("../../assets/images/student2.png")}
                resizeMode="cover"
                imageStyle={{ borderRadius: 16 }}
                className="flex-1 p-4"
              >
                <View>
                  <View className="flex flex-row justify-between items-center">
                    <Text className="font-bold text-xl text-white">
                      Danh sách đề tài
                    </Text>
                  </View>
                  <ScrollView
                    nestedScrollEnabled={true}
                    scrollEnabled={true}
                    showsVerticalScrollIndicator={true}
                    persistentScrollbar={true}
                    className="mt-4"
                  >
                    <VStack space="2xl" reversed={false} className="mt-4">
                      {topic?.map((item) => (
                        <Box
                          key={item?.id}
                          className="h-12 w-full rounded-full bg-white flex items-center justify-center"
                        >
                          <View className="flex-row justify-around items-center w-full">
                            <Text
                              className="font-medium w-3/5"
                              numberOfLines={1}
                            >
                              {item?.name}
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
                              onPress={()=>{
                                 handleShow("topic",item)
                                }}
                            >
                              <ButtonText className="text-sm font-medium-cereal text-center text-white">
                                Chi tiết
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
          </View>
        )}
      </View>

      <Actionsheet isOpen={showActionsheet} onClose={handleClose}>
        <ActionsheetBackdrop />
        <ActionsheetContent>
          <View style={{ height: screenHeight * 0.8, width: "100%" }}>
            <ActionsheetDragIndicatorWrapper>
              <ActionsheetDragIndicator />
            </ActionsheetDragIndicatorWrapper>

            {search && <SearchStudent user={user} handleClose={handleClose} />}
            {topicOpen && <TopicDetail selected={selected} handleClose={handleClose} setFetch={setFetch}/>}
          </View>
        </ActionsheetContent>
      </Actionsheet>
    </ScrollView>
  );
};

export default UpcomingSemester;
