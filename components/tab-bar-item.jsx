import { Pressable } from "react-native";
import Text from "./text";
import { useColorScheme } from "nativewind";
import Animated, { useSharedValue, withTiming, Easing } from "react-native-reanimated";
import * as colors from "../constants/colors";
import * as storage from "../scripts/storage";

export default function TabBarItem({ state, descriptors, navigation, route, index }) {
  const { colorScheme } = useColorScheme();
  const borderRadius = useSharedValue(100);

  const title = descriptors[route.key].options.title;
  const Icon = descriptors[route.key].options.tabBarIcon;
  const active = state.index == index;

  const onPress = async () => {
    borderRadius.value = 10;
    borderRadius.value = withTiming(100, { duration: 750, easing: Easing.inOut(Easing.quad) });

    const event = navigation.emit({
      type: "tabPress",
      target: route.key,
      canPreventDefault: true,
    });
    
    let list = [];
    if (route.name == "index") {
      list = await storage.readList("ongoing");
    } else {
      list = await storage.readList(route.name);
    }

    if (!active && !event.defaultPrevented) {
      navigation.navigate(route.name, { list: list });
    }
  };

  return (
    <Pressable onPress={onPress} className="w-36 h-5/6">
      <Animated.View style={{ borderRadius }} className={`w-full h-full flex justify-center items-center ${active && "bg-green-300 dark:bg-green-700"}`}>
        <Icon color={colors.textColor(colorScheme)} size={24} />
        <Text className="text-sm text-black dark:text-white">{title}</Text>
      </Animated.View>
    </Pressable>
  )
}