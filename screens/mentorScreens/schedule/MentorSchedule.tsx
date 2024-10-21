import { Text, View } from "react-native";
import { ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Calendar, Agenda, LocaleConfig } from "react-native-calendars";
import { useState } from "react";

// Configure locale for Vietnamese
LocaleConfig.locales["vi"] = {
  monthNames: [
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
    "Tháng 8",
    "Tháng 9",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12",
  ],
  monthNamesShort: [
    "Th.1",
    "Th.2",
    "Th.3",
    "Th.4",
    "Th.5",
    "Th.6",
    "Th.7",
    "Th.8",
    "Th.9",
    "Th.10",
    "Th.11",
    "Th.12",
  ],
  dayNames: [
    "Chủ Nhật",
    "Thứ Hai",
    "Thứ Ba",
    "Thứ Tư",
    "Thứ Năm",
    "Thứ Sáu",
    "Thứ Bảy",
  ],
  dayNamesShort: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
  today: "Hôm nay",
};

// Set Vietnamese as the default locale
LocaleConfig.defaultLocale = "vi";

function MentorSchedule() {
  const insets = useSafeAreaInsets();
  const [selected, setSelected] = useState("");
  return (
    <ScrollView style={{ paddingTop: insets.top }} className="m-[15px]">
      <Text className="font-extra-bold-cereal text-2xl font-bold mb-5">
        Lịch trình
      </Text>
      <View>
        <Calendar
          style={{
            borderColor: "gray",
            height: 350,
            borderRadius: 20,
          }}
          enableSwipeMonths={true}
          theme={{
            textSectionTitleColor: "#b6c1cd",
            selectedDayBackgroundColor: "#00adf5",
            selectedDayTextColor: "#ffffff",
            todayTextColor: "#FF6001",
            dayTextColor: "#2d4150",
            textDisabledColor: "#AAAAAA",
            arrowColor: "#FF6001",
          }}
          onDayPress={(day) => {
            setSelected(day.dateString);
          }}
          markedDates={{
            [selected]: {
              selected: true,
              disableTouchEvent: true,
              selectedDotColor: "orange",
            },
          }}
        />
      </View>
      <View>
        <Text>Thông tin chi tiết</Text>
        <Text>{selected}</Text>
      </View>
    </ScrollView>
  );
}

export default MentorSchedule;
