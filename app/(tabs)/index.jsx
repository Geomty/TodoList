import { Text, View, ScrollView, Pressable, useColorScheme } from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import Modal from "../../components/modal";
import * as colors from "../../constants/colors";

export default function Home() {
  const colorScheme = useColorScheme();
  const [modal, setModal] = useState(false);

  return (
    <SafeAreaView>
      <ScrollView className="flex gap-2 bg-green-100 dark:bg-green-950">
        <View className="p-3 bg-green-200 dark:bg-green-900">
          <Text className="text-2xl text-black text-center dark:text-white">To-do List</Text>
          <Pressable onPress={() => setModal(true)} className="absolute m-3 right-0">
            <Text className="text-2xl">h</Text>
          </Pressable>
        </View>
        <View className="pr-[16] flex flex-row items-center gap-4">
          <TextInput
            placeholder="Add new"
            activeUnderlineColor={colorScheme == "dark" ? colors.green300 : colors.green800}
            textColor={colorScheme == "dark" ? "white" : "black"}
            className="flex-1 text-md bg-green-200 dark:bg-green-900"
            right={<TextInput.Icon icon="note-plus-outline" color={colorScheme == "dark" ? "white" : "black"} />}
          />
        </View>
        <View className="pr-[16] flex gap-4">
          {[
            "one",
            "two",
            "three",
            "four",
            "five",
            "six",
            "seven",
            "eight",
            "nine",
            "ten",
            "eleven",
            "twelve",
            "thirteen",
            "fourteen",
            "fifteen",
            "sixteen",
            "what",
            "eighteen",
            "nineteen",
            "a"
          ].map(item => { return (
            <Text key={item} className="text-lg text-black dark:text-white">{item}</Text>
          )})}
        </View>
      </ScrollView>
      <StatusBar style="auto" backgroundColor={colorScheme == "dark" ? colors.green900 : colors.green200} />
      {modal && <Modal setModal={setModal} />}
    </SafeAreaView>
  )
}