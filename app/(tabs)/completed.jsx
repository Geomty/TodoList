import { View, Text, Pressable, useColorScheme } from "react-native";
import { useState } from "react";
import { useRoute } from "@react-navigation/native";
import { Menu } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MainLayout } from "../_layout";
import * as storage from "../../scripts/storage";
import * as colors from "../../constants/colors";

export default function Completed() {
  const colorScheme = useColorScheme();
  const route = useRoute();
  const [list, setList] = useState(route.params.list);
  const [curr, setCurr] = useState(route.params.list);
  if (route.params.list != curr) {
    setList(route.params.list);
    setCurr(route.params.list);
  }
  const [menu, setMenu] = useState([]);
  
  return (
    <MainLayout>
      <View className="m-5 flex">
        {list.map((item, index) => {
          return (
            <View key={index} className={`${index != list.length-1 ? "mb-8" : ""} flex flex-row justify-between items-center`}>
              <View className="flex flex-row items-center">
                <MaterialCommunityIcons name="check-circle" color={colors.textColor(colorScheme)} size={28} />
                <Text className="ml-4 text-xl flex-shrink text-black dark:text-white">{item}</Text>
              </View>
              <Menu
                visible={menu[index]}
                onDismiss={() => setMenu(Array(list.length).fill(false))}
                anchor={
                  <Pressable onPress={() => setMenu([...Array(index).fill(false), true, ...Array(list.length-index-1)])}>
                    <MaterialCommunityIcons name="dots-vertical" color={colors.textColor(colorScheme)} size={24} />
                  </Pressable>
                }
                theme={{ colors: { elevation: { level2: colorScheme == "dark" ? "black" : "white" } } }}
              >
                <Menu.Item
                  title="Restore"
                  leadingIcon="undo"
                  onPress={async () => {
                    storage.addItem("ongoing", item);
                    setMenu(Array(list.length).fill(false));
                    setList(await storage.deleteItem("completed", index, list));
                  }}
                  theme={{ colors: { onSurfaceVariant: colors.textColor(colorScheme) } }}
                />
                <Menu.Item
                  title="Delete"
                  leadingIcon="trash-can-outline"
                  onPress={async () => {
                    setList(await storage.deleteItem("completed", index, list));
                    setMenu(Array(list.length).fill(false));
                  }}
                  theme={{ colors: { onSurfaceVariant: colors.textColor(colorScheme) } }}
                />
              </Menu>
            </View>
          )
        })}
      </View>
    </MainLayout>
  )
}