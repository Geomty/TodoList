import { View, Text, Pressable } from "react-native";
import { useState } from "react";
import { Menu } from "react-native-paper";
import { MainLayout } from "../_layout";
import * as storage from "../../scripts/storage";

export default function Completed() {
  return (
    <MainLayout store="completed" content={
      ({ colorScheme, list, setList }) => {
        const [menu, setMenu] = useState([]);

        return (
          <View className="m-5 flex">
            {list.map((item, index) => {
              return (
                <View key={index} className="mb-8 flex flex-row items-center">
                  <Text className="text-xl flex-shrink text-black dark:text-white">{item}</Text>
                  <Menu
                    visible={menu[index]}
                    onDismiss={() => {
                      setMenu(Array(list.length).fill(false));
                    }}
                    anchor={<Pressable onPress={() => {
                      setMenu([...Array(index).fill(false), true, ...Array(list.length-index-1)]);
                    }}><Text>a</Text></Pressable>}
                    theme={{ colors: { elevation: { level2: "white" } } }}
                  >
                    <Menu.Item title="Delete" dense={true} onPress={async () => {
                      setList(await storage.deleteItem("completed", index, list));
                      setMenu(Array(list.length).fill(false));
                    }} />
                  </Menu>
                </View>
              )
            })}
          </View>
        )
      }
    } />
  )
}