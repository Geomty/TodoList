import { Text, View, ScrollView, Pressable, useColorScheme } from "react-native";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import Modal from "../../components/modal";
import * as colors from "../../constants/colors";

export default function Home() {
  const colorScheme = useColorScheme();
  const [input, setInput] = useState("");
  const [list, setList] = useState([]);
  useEffect(() => {
    readList(setList);
  }, [setList]);
  const [modal, setModal] = useState(false);

  return (
    <SafeAreaView>
      <ScrollView className="min-h-full flex bg-green-100 dark:bg-green-950">
        <View className="p-3 bg-green-200 dark:bg-green-900">
          <Text className="text-2xl text-black text-center dark:text-white">To-do List</Text>
          <Pressable onPress={() => setModal(true)} className="absolute mt-4 mr-3 right-0">
            <MaterialCommunityIcons name="cog-outline" color={colors.textColor(colorScheme)} size={24} />
          </Pressable>
        </View>
        <TextInput
          onChangeText={i => setInput(i)}
          placeholder="Add new"
          activeUnderlineColor={colorScheme == "dark" ? colors.green300 : colors.green800}
          textColor={colors.textColor(colorScheme)}
          right={<TextInput.Icon onPress={async () => await writeList(input, list, setList)} icon="plus" color={colors.textColor(colorScheme)} forceTextInputFocus={false} />}
          theme={{ colors: {
            onSurfaceVariant: colors.textColor(colorScheme)
          } }}
          className="m-5 text-md bg-green-200 dark:bg-green-900"
        />
        <View className="ml-5 mr-5 flex">
          {list.map(item => { return (
            <Text key={item} className="mb-4 text-lg text-black dark:text-white">{item}</Text>
          )})}
        </View>
      </ScrollView>
      <StatusBar style="auto" backgroundColor={colorScheme == "dark" ? colors.green900 : colors.green200} />
      {modal && <Modal setModal={setModal} />}
    </SafeAreaView>
  )
}

async function writeList(item, list, setList) {
  const newList = [item, ...list];
  await AsyncStorage.setItem("list", JSON.stringify(newList));
  setList(newList);
}

async function readList(setList) {
  const data = await AsyncStorage.getItem("list");
  setList(JSON.parse(data));
}