import { View, Text, Pressable } from "react-native";
import { useState } from "react";
import { useRoute } from "@react-navigation/native";
import { Menu } from "react-native-paper";
import { MainLayout } from "../_layout";
import * as storage from "../../scripts/storage";

export default function Completed() {
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
    </MainLayout>
  )
}