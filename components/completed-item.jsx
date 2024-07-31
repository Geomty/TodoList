import { View, Pressable } from "react-native";
import Text from "./text";
import { useState } from "react";
import { useColorScheme } from "nativewind";
import { Menu } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as storage from "../scripts/storage";
import * as colors from "../constants/colors";

export default function CompletedItem({ item, index, list, setList }) {
  const { colorScheme } = useColorScheme();
  const [menu, setMenu] = useState(false);

  return (
    <View key={index} className={`${index != list.length-1 ? "mb-8" : ""} flex flex-row justify-between items-center`}>
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
            setList(await storage.deleteItem("completed", index, list));
            setMenu(false);
          }}
          theme={{ colors: { onSurface: colors.textColor(colorScheme), onSurfaceVariant: colors.textColor(colorScheme) } }}
        />
        <Menu.Item
          title="Delete"
          leadingIcon="trash-can-outline"
          onPress={async () => {
            setList(await storage.deleteItem("completed", index, list));
            setMenu(false);
          }}
          theme={{ colors: { onSurface: colors.textColor(colorScheme), onSurfaceVariant: colors.textColor(colorScheme) } }}
        />
      </Menu>
    </View>
  )
}