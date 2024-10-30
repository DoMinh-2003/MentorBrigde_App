import {
  Accordion,
  AccordionContent,
  AccordionContentText,
  AccordionHeader,
  AccordionIcon,
  AccordionItem,
  AccordionTitleText,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Divider } from "@/components/ui/divider";
import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlHelper,
  FormControlHelperText,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import {
  AlertCircleIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@/components/ui/icon";
import {
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectIcon,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
} from "@/components/ui/select";
import { SystemRole } from "@/models/role";
import useAdminService from "@/service/useAdminService";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { View, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import useBookingService from "@/service/useBookingService";



export type Mentor = {
  avatar: string;
  dayOfBirth: string;
  email: string;
  fullName: string;
  gender: string;
  id: string;
  phone: string;
  role: SystemRole;
  studentCode: string;
  teamCode: string | null;
  username: string;
}

const Booking = () => {
  const insets = useSafeAreaInsets();
  const { sendBooking, loading } = useBookingService();
  const { getAdminData } = useAdminService();
  const [items, setItems] = useState([]);
  const [scheduleItems, setScheduleItems] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [selectedMentorId, setSelectedMentorId] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedMentor, setSelectedMentor] = useState("");
  const [error, setError] = useState(true);
  const { getSchedule } = useScheduleService();


  const handleChangeType = (value: any) => {
    console.log(value);
    setSelectedType(value);
  };

  const handleChangeMentor = (value: any) => {
    console.log(value);
    setSelectedMentor(value);
    if (error) setError(false);
  };

 


  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        setIsFetching(true);
        getAdminData(undefined, "MENTOR")
          .then((listMentor) => {
            setItems(
              listMentor.content.map((mentor: Mentor) => ({
                value: mentor.id,
                label: mentor.fullName,
              }))
            );
          })
          .catch((error) => {
            console.error("Error fetching mentor data:", error);
          })
          .finally(() => {
            setIsFetching(false);
          });
      };
      fetchData();
    }, [scheduleItems])
  );

  const handleChange = (value: string) => {
    setSelectedMentorId(value);
    setSelectedMentor(items?.find((item) => item?.value === value)?.label);
    setIsFetching(true);
    getSchedule(value)
      .then((listSchedule) => {
        setScheduleItems(listSchedule);
      })
      .catch((error) => {
        console.error("Error fetching mentor data:", error);
      })
      .finally(() => {
        setIsFetching(false);
      });
  };

  
  return (
    <View style={{ paddingTop: insets.top }} className="m-[15px]">
      <Text className="font-extra-bold-cereal text-2xl font-bold mb-5">
        Đặt lịch
      </Text>

      {/* SELECT MENTOR AND TYPE */}
      <View className="flex-row">
        <View className="w-2/4 mr-5">
          <FormControl isRequired isInvalid={error}>
            <FormControlLabel>
              <FormControlLabelText>Chọn giảng viên</FormControlLabelText>
            </FormControlLabel>
            <Select
              onValueChange={handleChangeMentor}
              selectedValue={selectedMentor}
            >
              <SelectTrigger variant="rounded">
                <SelectInput placeholder="Select option" />
                <SelectIcon className="mr-3" as={ChevronDownIcon} />
              </SelectTrigger>
              <SelectPortal >
                <SelectBackdrop />
                <SelectContent >
                  <SelectDragIndicatorWrapper>
                    <SelectDragIndicator />
                  </SelectDragIndicatorWrapper>
                  {items?.map((item: any, index) =>(
                      <SelectItem key={index} label={item?.label} value={item?.value} />
                  ))}
                </SelectContent>
              </SelectPortal>
            </Select>
            <FormControlHelper>
              <FormControlHelperText>
                Bạn chỉ được chọn 1 loại
              </FormControlHelperText>
            </FormControlHelper>
            {error && (
              <FormControlError>
                <FormControlErrorIcon as={AlertCircleIcon} />
                <FormControlErrorText>
                  Vui lòng chọn giảng viên
                </FormControlErrorText>
              </FormControlError>
            )}
          </FormControl>
        </View>
        <View className="w-2/5">
          <FormControl isRequired>
            <FormControlLabel>
              <FormControlLabelText>Chọn loại yêu cầu</FormControlLabelText>
            </FormControlLabel>
            <Select
              onValueChange={handleChangeType}
              selectedValue={selectedType}       
        >

              <SelectTrigger variant="rounded">
                <SelectInput placeholder="Select option" />
                <SelectIcon className="mr-3" as={ChevronDownIcon} />
              </SelectTrigger>
              <SelectPortal>
                <SelectBackdrop />
                <SelectContent>
                  <SelectDragIndicatorWrapper>
                    <SelectDragIndicator />
                  </SelectDragIndicatorWrapper>

                  <SelectItem label="Cá nhân" value="INDIVIDUAL" />
                  <SelectItem label="Nhóm" value="TEAM" />

                </SelectContent>
              </SelectPortal>
            </Select>
            <FormControlHelper>
              <FormControlHelperText>
                Bạn chỉ được chọn 1 loại.Mặc định là của họp cá nhân
              </FormControlHelperText>
            </FormControlHelper>
          </FormControl>
        </View>
      </View>

      <Accordion
        size="md"
        variant="unfilled"
        type="multiple"
        isCollapsible={true}
        isDisabled={false}
        className="w-full border border-outline-200 mt-5 rounded-xl"
      >
        <AccordionItem value="a">
          <AccordionHeader>
            <AccordionTrigger>
              {({ isExpanded }) => {
                return (
                  <>
                    <AccordionTitleText>2024-12-30</AccordionTitleText>
                    {isExpanded ? (
                      <AccordionIcon as={ChevronUpIcon} className="ml-3" />
                    ) : (
                      <AccordionIcon as={ChevronDownIcon} className="ml-3" />
                    )}
                  </>
                );
              }}
            </AccordionTrigger>
          </AccordionHeader>
          <AccordionContent>
            <Box className="h-12 w-full rounded-full border border-[#D5D5D7] flex items-center justify-center px-1 mb-5">
              <View className="flex flex-row justify-between items-center w-full">
                <Text>Emily White</Text>
                <Text className="font-bold">00:00 - 01:00</Text>
                <Button
                  variant="solid"
                  action="primary"
                  style={{
                    width: 106,
                    backgroundColor: "black",
                    borderRadius: 99999,
                  }}
                >
                  <ButtonText className="text-base font-medium-cereal text-center">
                    Đặt lịch
                  </ButtonText>
                </Button>
              </View>
            </Box>
          </AccordionContent>
        </AccordionItem>
        <Divider />
        <AccordionItem value="b">
          <AccordionHeader>
            <AccordionTrigger>
              {({ isExpanded }) => {
                return (
                  <>
                    <AccordionTitleText>2024-12-31</AccordionTitleText>
                    {isExpanded ? (
                      <AccordionIcon as={ChevronUpIcon} className="ml-3" />
                    ) : (
                      <AccordionIcon as={ChevronDownIcon} className="ml-3" />
                    )}
                  </>
                );
              }}
            </AccordionTrigger>
          </AccordionHeader>
          <AccordionContent>
            <Box className="h-12 w-full rounded-full border border-[#D5D5D7] flex items-center justify-center px-1 mb-5">
              <View className="flex flex-row justify-between items-center w-full">
                <Text>Emily White</Text>
                <Text className="font-bold">00:00 - 01:00</Text>
                <Button
                  variant="solid"
                  action="primary"
                  style={{
                    width: 106,
                    backgroundColor: "black",
                    borderRadius: 99999,
                  }}
                >
                  <ButtonText className="text-base font-medium-cereal text-center">
                    Đặt lịch
                  </ButtonText>
                </Button>
              </View>
            </Box>
            <Box className="h-12 w-full rounded-full border border-[#D5D5D7] flex items-center justify-center px-1 mb-5">
              <View className="flex flex-row justify-between items-center w-full">
                <Text>Emily White</Text>
                <Text className="font-bold">10:00 - 11:00</Text>
                <Button
                  variant="solid"
                  action="primary"
                  style={{
                    width: 106,
                    backgroundColor: "black",
                    borderRadius: 99999,
                  }}
                >
                  <ButtonText className="text-base font-medium-cereal text-center">
                    Đặt lịch
                  </ButtonText>
                </Button>
              </View>
            </Box>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </View>
  );
};

export default Booking;
