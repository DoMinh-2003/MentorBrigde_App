import CustomCalendar from "@/components/calendar/CustomCalendar";
import { LinearGradient } from "@/components/ui/gradient/LinearGradient";
import { useCallback, useEffect, useState } from "react";
import { Linking, Text, View } from "react-native";
import { ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { useFocusEffect } from "expo-router";
import useBookingService from "@/service/useBookingService";
import { FontAwesome } from "@expo/vector-icons";
function StudentSchedule() {
  const insets = useSafeAreaInsets();
  const today = new Date();
  const formattedDate = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth() + 1); // Đặt giá trị mặc định
  const [selected, setSelected] = useState<string>("");
  const [bookings, setBookings] = useState<{ [key: string]: any[] }>({});
  const [filteredBookings, setFilteredBookings] = useState<any[]>([]);
  const { getBookingByRole } = useBookingService();

  

useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        console.log(selectedMonth);
        const data = await getBookingByRole(selectedMonth);
        console.log(data);
        setBookings(data);
      };
      fetchData()
    }, [selectedMonth])
  );



  useEffect(() => {
    // Khi ngày được chọn thay đổi, lọc booking theo ngày
    if (selected) {
      setFilteredBookings(bookings[selected] || []);
    }
  }, [selected, bookings]);
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

      <CustomCalendar selected={selected} setSelected={setSelected} bookings={bookings} month={selectedMonth} setMonth={setSelectedMonth}  />
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
          <Text className="text-white font-semibold"> {selected ? selected : formattedDate }</Text>
        </LinearGradient>
      </View>

      {filteredBookings.length > 0 ? (
        <View className="mt-4 w-full">
          <Text className="text-xl font-extra-bold-cereal mt-5 font-medium">
            Danh sách cuộc họp trong ngày
          </Text>

          <View className="h-[380px]">
            <ScrollView
              nestedScrollEnabled={true}
              scrollEnabled={true}
              showsVerticalScrollIndicator={true}
              persistentScrollbar={true}
              className="mt-4"
            >
              {filteredBookings.map((booking) =>
                booking.timeFrame.timeFrameStatus == "BOOKED" ? (
                  <LinearGradient
                    key={booking?.id} 
                    className="rounded-full flex-row items-center w-full h-12 flex  items-center justify-between p-2 mt-1"
                    colors={["#71E0FF", "#2B8FD8"]}
                    start={[0, 0]}
                    end={[1, 1]}
                  >
                    {/* <Box
                    key={booking.id}
                    className="h-12 w-full rounded-full border border-[#D5D5D7] flex-row items-center justify-between px-2 mb-5"
                  > */}
                    <Text className="font-bold">
                      {new Date(
                        booking.timeFrame.timeFrameFrom
                      ).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}{" "}
                      -{" "}
                      {new Date(
                        booking.timeFrame.timeFrameTo
                      ).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </Text>

                    <View className="rounded-full flex justify-center items-center mr-2">
                      {booking.type == "TEAM" ? (
                        <FontAwesome name="users" size={20} color="black" />
                      ) : (
                        <FontAwesome name="user" size={24} color="black" />
                      )}
                    </View>

                    <View className="flex-row">
                      {/* <Button
                        className="rounded-full"
                        variant="solid"
                        action="primary"
                      >
                        <ButtonText>
                          {booking.type == "TEAM" ? "Team" : "Student"}
                        </ButtonText>
                      </Button> */}

                      <Button
                        className="rounded-full"
                        variant="solid"
                        action="primary"
                        style={{ backgroundColor: "white" }}
                        onPress={() => {
                         
                          if (booking.meetLink) {
                            Linking.openURL(booking?.meetLink).catch((err) =>
                              console.error("Failed to open URL:", err)
                            );
                          }
                        }}
                      >
                        <ButtonText style={{ color: "black" }}>
                          {booking.status === "ACCEPTED"
                            ? "Đến phòng họp"
                            : "Đợi phê duyệt"}
                        </ButtonText>
                      </Button>
                    </View>

                    {/* </Box> */}
                  </LinearGradient>
                ) : (
                  <Box key={booking.id}  className="h-12 w-full rounded-full  border border-[#D5D5D7] flex-row items-center justify-between px-2 mb-5">
                    <Text className="font-bold">
                      {new Date(
                        booking.timeFrame.timeFrameFrom
                      ).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}{" "}
                      -{" "}
                      {new Date(
                        booking.timeFrame.timeFrameTo
                      ).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </Text>
                    <Button
                      className="rounded-full"
                      variant="solid"
                      action="primary"
                      style={{ backgroundColor: "#EBE173" }}
                    >
                      <ButtonText>Đánh giá nhóm</ButtonText>
                    </Button>
                  </Box>
                )
              )}
            </ScrollView>
          </View>
        </View>
      ) : (
        <Text className="mt-5 text-gray-500">
          Không có cuộc họp nào trong ngày.
        </Text>
      )}
    </ScrollView>
  );
}

export default StudentSchedule;
