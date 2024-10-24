import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { VictoryPie, VictoryTooltip } from "victory-native";
interface PieProps {
  data: { x: string; y: number }[];
  colorScale: string[];
}
const Pie: React.FC<PieProps> = ({ data,colorScale, ...props }) => {
  return (
    <View className="flex-1 justify-center items-center">
      <VictoryPie
        data={data}
        labelComponent={<VictoryTooltip />}
        cornerRadius={25}
        innerRadius={75}
        style={{
          labels: {
            fill: "black", // Label color
          },
        }}
        colorScale={colorScale}
        {...props}
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
