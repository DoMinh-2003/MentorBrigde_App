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
import { AlertCircleIcon, ChevronDownIcon } from "@/components/ui/icon";
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
import { View, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Booking = () => {
  const insets = useSafeAreaInsets();
  return (
    <View style={{ paddingTop: insets.top }} className="m-[15px]">
      <Text className="font-extra-bold-cereal text-2xl font-bold mb-5">
        Đặt lịch
      </Text>
      <View className="flex-row">
        <View className="w-2/4 mr-3">
          <FormControl isRequired isInvalid>
            <FormControlLabel>
              <FormControlLabelText>Chọn giảng viên</FormControlLabelText>
            </FormControlLabel>
            <Select>
              <SelectTrigger variant="rounded">
                <SelectInput placeholder="Select option" />
                <SelectIcon className="mr-3" as={ChevronDownIcon} />
              </SelectTrigger>
              <SelectPortal className="pb-10">
                <SelectBackdrop />
                <SelectContent>
                  <SelectDragIndicatorWrapper>
                    <SelectDragIndicator />
                  </SelectDragIndicatorWrapper>
                  <SelectItem label="Red" value="red" />
                  <SelectItem label="Blue" value="blue" />
                  <SelectItem label="Black" value="black" />
                  <SelectItem label="Pink" value="pink" isDisabled={true} />
                  <SelectItem label="Green" value="green" />
                </SelectContent>
              </SelectPortal>
            </Select>
            <FormControlHelper>
              <FormControlHelperText>
                Bạn chỉ được chọn 1 loại
              </FormControlHelperText>
            </FormControlHelper>
            <FormControlError>
              <FormControlErrorIcon as={AlertCircleIcon} />
              <FormControlErrorText>
                Vui lòng chọn giảng viên
              </FormControlErrorText>
            </FormControlError>
          </FormControl>
        </View>
        <View className="w-2/5">
          <FormControl isRequired isInvalid>
            <FormControlLabel>
              <FormControlLabelText>Chọn loại yêu cầu</FormControlLabelText>
            </FormControlLabel>
            <Select>
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
                  <SelectItem label="Cá nhân" value="red" />
                  <SelectItem label="Nhóm" value="blue" />
                </SelectContent>
              </SelectPortal>
            </Select>
            <FormControlHelper>
              <FormControlHelperText>
                Bạn chỉ được chọn 1 loại
              </FormControlHelperText>
            </FormControlHelper>
            <FormControlError>
              <FormControlErrorIcon as={AlertCircleIcon} />
              <FormControlErrorText>
                Vui lòng chọn loại yêu cầu!
              </FormControlErrorText>
            </FormControlError>
          </FormControl>
        </View>
      </View>
    </View>
  );
};

export default Booking;
