import { Pressable } from "react-native";
import Text from "./text";
import { useColorScheme } from "nativewind";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Animated, { useSharedValue, withTiming } from "react-native-reanimated";
import * as colors from "../constants/colors";
import * as storage from "../scripts/storage";

export default function OngoingItem({ item, index, list, setList }) {
  const { colorScheme } = useColorScheme();

  const height = useSharedValue(30);
  height.value = 30;
  const opacity = useSharedValue(1);
  opacity.value = 1;

  const otherHeight = useSharedValue(32);
  otherHeight.value = 32;

  return (
    <>
      <Animated.View style={{ height, opacity }} className="flex flex-row items-center">
        <Pressable onPress={() => {
          storage.addItem("completed", item);
          height.value = withTiming(0);
          opacity.value = withTiming(0, { duration: 200 });
          otherHeight.value = withTiming(0);
          setTimeout(async () => {
            opacity.value = 1;
            setList(await storage.deleteItem("ongoing", index, list));
          }, 400);
        }}><MaterialCommunityIcons name="check-circle-outline" color={colors.textColor(colorScheme)} size={28} /></Pressable>
        <Text className="ml-4 text-xl flex-shrink text-black dark:text-white">{item}</Text>
      </Animated.View>
      {(index != list.length-1) && <Animated.View style={{ height: otherHeight }} />}
    </>
  )
}