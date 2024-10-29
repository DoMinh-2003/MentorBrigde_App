import { Calendar, Agenda, LocaleConfig } from "react-native-calendars";
import { FC, useState } from "react";
import { View } from "react-native";
interface CalendarProps {
  selected?: string;
  setSelected?: (date: string) => void;
  bookings?: { [key: string]: any[] }
}
const CustomCalendar: FC<CalendarProps> = ({ selected, setSelected, bookings }) => {
  const markedDates = Object.keys(bookings).reduce((acc, date) => {
    acc[date] = {
      marked: true,
      dotColor: "#FF6001", // Màu của dấu chấm
    };
    return acc;
  }, {});
  return (
    <View>
      <Calendar
        style={{
          borderColor: "gray",
          height: 330,
          borderRadius: 20,
        }}
        enableSwipeMonths={true}
        theme={{
          textSectionTitleColor: "#000000",
          textSectionTitleFontWeight: "900",
          selectedDayBackgroundColor: "#00adf5",
          selectedDayTextColor: "#ffffff",
          todayTextColor: "#FF6001",
          dayTextColor: "#000000",
          textDisabledColor: "#AAAAAA",
          arrowColor: "#FF6001",
        }}
        onDayPress={(day) => {
          setSelected(day.dateString);
        }}
        markedDates={{
          ...markedDates,
          [selected]: {
            selected: true,
            disableTouchEvent: true,
            selectedColor: "#FF6001",
          },
        }}
      />
    </View>
  );
};

export default CustomCalendar;

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
