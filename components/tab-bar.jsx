import { View, Text, Pressable } from "react-native";

export default function TabBar({ state, descriptors, navigation }) {
  return (
    <View className="h-14 w-full flex flex-row justify-around items-center bg-white border-t border-black dark:bg-black dark:border-white">
      {state.routes.map((route, index) => {
        const title = descriptors[route.key].options.title;
        const Icon = descriptors[route.key].options.tabBarIcon;
        const active = state.index == index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!active && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        return (
          <Pressable key={route.key} onPress={onPress}>
            <View className="h-14 w-14 flex justify-center items-center">
              <Icon color={active ? "#00c5ff" : "black"} size={24} />
              <Text className={`text-sm ${active ? "text-[#00c5ff]" : "text-black"}`}>{title}</Text>
            </View>
          </Pressable>
        )
      })}
    </View>
  )
}