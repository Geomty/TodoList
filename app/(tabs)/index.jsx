import { View, Text, Pressable, useColorScheme } from "react-native";
import { useState, useEffect } from "react";
import { TextInput } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MainLayout } from "../_layout";
import * as colors from "../../constants/colors";
import * as storage from "../../scripts/storage";

export default function Home() {
  const colorScheme = useColorScheme();
  const [list, setList] = useState([]);
  useEffect(() => {
    (async () => {
      setList(await storage.readList("ongoing"));
    })();
  }, [setList]);
  const [input, setInput] = useState("");

  return (
    <MainLayout>
      <TextInput
        value={input}
        onChangeText={i => setInput(i)}
        placeholder="Add new"
        activeUnderlineColor={colorScheme == "dark" ? colors.green300 : colors.green800}
        textColor={colors.textColor(colorScheme)}
        right={<TextInput.Icon
          onPress={async () => {
            if (input.length) {
              setInput("");
              setList(await storage.addItem("ongoing", input, list));
            }
          }}
          icon="plus"
          color={colors.textColor(colorScheme)}
          forceTextInputFocus={false}
        />}
        theme={{ colors: {
          onSurfaceVariant: colors.textColor(colorScheme)
        } }}
        className="m-5 text-md bg-green-200 dark:bg-green-900"
      />
      <View className="ml-5 mr-5 flex">
        {list.map((item, index) => {
          return (
            <View key={index} className="mb-8 flex flex-row items-center">
              <Pressable onPress={async () => {
                storage.addItem("completed", item);
                setList(await storage.deleteItem("ongoing", index, list));
              }}><MaterialCommunityIcons name="check-circle-outline" color={colors.textColor(colorScheme)} size={28} /></Pressable>
              <Text className="ml-4 text-xl flex-shrink text-black dark:text-white">{item}</Text>
            </View>
          )
        })}
      </View>
    </MainLayout>
  )
}