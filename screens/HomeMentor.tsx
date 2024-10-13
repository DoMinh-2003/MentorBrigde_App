import { View, Text } from "react-native";
import React from "react";
import {
  useSafeAreaFrame,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Button, ButtonText } from "@/components/ui/button";
import { Input, InputField } from "@/components/ui/input";

const HomeMentor = () => {
  const insets = useSafeAreaInsets();
  return (
    <View style={{ paddingTop: insets.top }}>
      <Input
        variant="outline"
        size="md"
        isDisabled={false}
        isInvalid={false}
        isReadOnly={false}
      >
        <InputField placeholder="Enter Text here..." />
      </Input>

      <Button size="md" variant="solid" action="primary">
        <ButtonText>Hello World!</ButtonText>
      </Button>
    </View>
  );
};

export default HomeMentor;
