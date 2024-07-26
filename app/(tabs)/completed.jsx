import { View, Text, Pressable } from "react-native";
import { useState } from "react";
import { Menu } from "react-native-paper";
import { MainLayout } from "../_layout";
import * as storage from "../../scripts/storage";

export default function Home() {
  const [menu, setMenu] = useState(false);

  return (
    <MainLayout store="completed" content={
      ({ colorScheme, list, setList }) => {
        return (
          <>
            <View className="m-5 flex">
              {list.map((item, index) => {
                return (
                  <View key={index} className="mb-8 flex flex-row items-center">
                    <Text className="text-xl flex-shrink text-black dark:text-white">{item}</Text>
                    <Menu visible={menu} onDismiss={() => setMenu(false)} anchor={<Pressable onPress={() => setMenu(true)}><Text>a</Text></Pressable>} theme={{ colors: { elevation: { level2: "white" } } }}>
                      <Menu.Item title="Delete" dense={true} onPress={async () => setList(await storage.deleteItem("completed", index, list))} />
                    </Menu>
                  </View>
                )
              })}
            </View>
          </>
        )
      }
    } />
  )
}
