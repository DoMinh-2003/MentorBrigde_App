import { View, Text } from "react-native";
import React from "react";
import { Input, InputField, InputIcon, InputSlot } from "../ui/input";
import { SearchIcon } from "../ui/icon";
import { Box } from "../ui/box";
import { Button, ButtonText } from "../ui/button";

const SearchStudent = () => {
 



  return (
    <View className="w-full mt-3">
      <Input className="w-full rounded-2xl">
        <InputSlot className="pl-3">
          <InputIcon as={SearchIcon} />
        </InputSlot>
        <InputField placeholder="Search..." />
      </Input>

      <View className="mt-5">
        <Box className="h-14 w-full border border-[#D5D5D7] rounded-2xl flex-row justify-around items-center">
          <Text className="w-2/4" numberOfLines={1}>
            Nguyễn Trần Ngọc Bảo Trân
          </Text>
          <Text>SE172980</Text>
          <Button
            variant="solid"
            action="primary"
            style={{
              width: 70,
              height: 30,
              backgroundColor: "#FF6001",
              borderRadius: 99999,
            }}
          >
            <ButtonText className="text-sm font-medium-cereal text-center">
              Mời
            </ButtonText>
          </Button>
        </Box>
      </View>
    </View>
  );
};

export default SearchStudent;
