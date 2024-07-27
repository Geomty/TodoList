import { View, Text, Pressable, useColorScheme } from "react-native";
import * as colors from "../constants/colors";
import * as storage from "../scripts/storage";

export default function TabBar({ state, descriptors, navigation }) {
  const colorScheme = useColorScheme();

  return (
    <View className="h-16 w-full flex flex-row justify-around items-center bg-green-200 dark:bg-green-900">
      {state.routes.map((route, index) => {
        const title = descriptors[route.key].options.title;
        const Icon = descriptors[route.key].options.tabBarIcon;
        const active = state.index == index;

        const onPress = async () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });
          
          let list = [];
          if (route.name == "completed") {
            list = await storage.readList("completed");
          }

          if (!active && !event.defaultPrevented) {
            navigation.navigate(route.name, { list: list });
          }
        };

        return (
          <Pressable key={route.key} onPress={onPress} className={`w-28 h-5/6 flex justify-center items-center rounded-full ${active && "bg-green-300 dark:bg-green-700"}`}>
            <Icon color={colors.textColor(colorScheme)} size={24} />
            <Text className="text-sm text-black dark:text-white">{title}</Text>
          </Pressable>
        )
      })}
    </View>
  )
}