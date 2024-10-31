import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { Input, InputField, InputIcon, InputSlot } from "../ui/input";
import { SearchIcon } from "../ui/icon";
import { Box } from "../ui/box";
import { Button, ButtonText } from "../ui/button";

import useStudentService from "@/service/useStudentService";

const SearchStudent = ({ user, handleClose }: any) => {
  console.log(handleClose);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<any>([]);
  const { loading, searchTeamMembers, inviteToGroup } = useStudentService();

  useEffect(() => {
    const debounceTimeout = async () => {
      if (searchTerm) {
        const results = await searchTeamMembers(searchTerm);
        console.log(results);
        setSearchResults(results?.content || []);
      } else {
        setSearchResults([]);
      }
    };
    debounceTimeout();
  }, [searchTerm, searchTeamMembers]);

  const handleInvite = async (email: string) => {
    try {
      await inviteToGroup(email, user?.teamCode);
    } catch (error) {
    } finally {
      handleClose();
    }
  };

  return (
    <View className="w-full mt-3">
      <Input className="w-full rounded-2xl">
        <InputSlot className="pl-3">
          <InputIcon as={SearchIcon} />
        </InputSlot>
        <InputField
          value={searchTerm}
          onChangeText={(e) => setSearchTerm(e)}
          placeholder="Search..."
        />
      </Input>

      <View className="mt-5">
        <ScrollView
          nestedScrollEnabled={true}
          scrollEnabled={true}
          showsVerticalScrollIndicator={true}
          persistentScrollbar={true}
          className="mt-4"
        >
          {searchResults &&
            searchResults?.map((member) => (
              <Box
                key={member?.id}
                className="h-14 mb-3 w-full border border-[#D5D5D7] rounded-2xl flex-row justify-around items-center"
              >
                <Text className="w-2/4" numberOfLines={1}>
                  {member?.fullName}
                </Text>
                <Text>{member?.studentCode}</Text>
                <Button
                  variant="solid"
                  action="primary"
                  style={{
                    width: 70,
                    height: 30,
                    backgroundColor: "#FF6001",
                    borderRadius: 99999,
                  }}
                  onPress={() => {
                    handleInvite(member?.email);
                  }}
                >
                  <ButtonText className="text-sm font-medium-cereal text-center">
                    Mời
                  </ButtonText>
                </Button>
              </Box>
            ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default SearchStudent;
