import { Text, View } from "react-native";
import { ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

function MentorSchedule() {
  const insets = useSafeAreaInsets();
  return (
    <ScrollView style={{ paddingTop: insets.top }}>
      <View className="flex justify-center">
        <Text>Lịch trình</Text>
      </View>
      <View></View>
    </ScrollView>
  );
}

export default MentorSchedule;
