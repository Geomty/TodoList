import { View, Pressable } from "react-native";
import Text from "./text";
import { useState } from "react";
import { useColorScheme } from "nativewind";
import { Menu } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Animated, { useSharedValue } from "react-native-reanimated";
import * as storage from "../scripts/storage";
import * as colors from "../constants/colors";
import { animateDelete } from "../scripts/animations";

export default function CompletedItem({ item, index, list, setList }) {
  const { colorScheme } = useColorScheme();
  const [menu, setMenu] = useState(false);

  const height = useSharedValue(30);
  const opacity = useSharedValue(1);
  const otherHeight = useSharedValue(32);

  return (
    <>
      <Animated.View style={{ height, opacity }} className="flex flex-row justify-between items-center">
        <View className="flex flex-row items-center">
          <MaterialCommunityIcons name="check-circle" color={colors.textColor(colorScheme)} size={28} />
          <Text className="ml-4 text-xl flex-shrink text-black dark:text-white">{item}</Text>
        </View>
        <Menu
          visible={menu}
          onDismiss={() => setMenu(false)}
          anchor={
            <Pressable onPress={() => setMenu(true)}>
              <MaterialCommunityIcons name="dots-vertical" color={colors.textColor(colorScheme)} size={24} />
            </Pressable>
          }
          theme={{ colors: { elevation: { level2: colorScheme == "dark" ? colors.green900 : colors.green200 } } }}
        >
          <Menu.Item
            title="Restore"
            leadingIcon="undo"
            onPress={async () => {
              storage.addItem("ongoing", item);
              animateDelete(height, opacity, otherHeight, list, setList, index, "completed");
              setMenu(false);
            }}
            theme={{ colors: { onSurface: colors.textColor(colorScheme), onSurfaceVariant: colors.textColor(colorScheme) } }}
          />
          <Menu.Item
            title="Delete"
            leadingIcon="trash-can-outline"
            onPress={async () => {
              animateDelete(height, opacity, otherHeight, list, setList, index, "completed");
              setMenu(false);
            }}
            theme={{ colors: { onSurface: colors.textColor(colorScheme), onSurfaceVariant: colors.textColor(colorScheme) } }}
          />
        </Menu>
      </Animated.View>
      {(index != list.length-1) && <Animated.View style={{ height: otherHeight }} />}
    </>
  )
}