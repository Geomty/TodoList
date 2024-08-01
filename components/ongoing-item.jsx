import { Pressable } from "react-native";
import Text from "./text";
import { useColorScheme } from "nativewind";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Animated, { useSharedValue, withTiming, Easing } from "react-native-reanimated";
import * as storage from "../scripts/storage";
import * as colors from "../constants/colors";
import { animateDelete } from "../scripts/animations";

export default function OngoingItem({ item, index, list, setList, add }) {
  const { colorScheme } = useColorScheme();

  let height;
  let opacity;
  let otherHeight;
  
  if (index == 0 && add.current) {
    height = useSharedValue(0);
    opacity = useSharedValue(0);
    otherHeight = useSharedValue(0);

    height.value = withTiming(30, { easing: Easing.inOut(Easing.quad) });
    opacity.value = withTiming(1, { duration: 400, easing: Easing.inOut(Easing.quad) });
    otherHeight.value = withTiming(32, { easing: Easing.inOut(Easing.quad) });

    setTimeout(() => add.current = false, 500);
  } else {
    height = useSharedValue(30);
    opacity = useSharedValue(1);
    otherHeight = useSharedValue(32);
  }

  return (
    <>
      <Animated.View style={{ height, opacity }} className="flex flex-row items-center">
        <Pressable onPress={() => {
          storage.addItem("completed", item);
          animateDelete(height, opacity, otherHeight, list, setList, index, "ongoing");
        }}><MaterialCommunityIcons name="check-circle-outline" color={colors.textColor(colorScheme)} size={28} /></Pressable>
        <Text className="ml-4 text-xl flex-shrink text-black dark:text-white">{item}</Text>
      </Animated.View>
      {(index != list.length-1) && <Animated.View style={{ height: otherHeight }} />}
    </>
  )
}