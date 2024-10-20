import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { VictoryPie } from "victory-native";
interface PieProps {
  data: { x: string; y: number }[];
  colors: { [key: string]: string };
}
const Pie: React.FC<PieProps> = ({ data, colors }) => {
  return (
    <View className="flex-1 justify-center items-center">
      <VictoryPie
        data={data}
        // labelComponent={null} // Hide labels
        cornerRadius={25}
        innerRadius={75}
        style={{
          data: {
            fill: ({ datum }) => {
              // Get color based on data
              return colors[datum.x] || "#DCDCDC"; // Default color if not found
            },
          },
          labels: {
            fill: "white", // Label color
          },
        }}
      />
    </View>
  );
};

export default Pie;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    //   backgroundColor: "#f5fcff"
  },
});
