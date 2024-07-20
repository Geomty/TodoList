import { Text, View, ScrollView, TextInput, Pressable, useColorScheme } from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Modal from "../../components/modal";

export default function Home() {
  let colorScheme = useColorScheme();
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
        <View className="pr-3 flex flex-row gap-4">
          <TextInput className="border flex-1" />
          <Pressable>
            <Text className="pt-1 pb-1 pl-3 pr-3 bg-green-800 rounded-full text-lg text-white dark:text-black dark:bg-green-300">Add new</Text>
          </Pressable>
        </View>
        <View className="flex gap-4">
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
      <StatusBar style="auto" backgroundColor={colorScheme == "dark" ? "#14532d" : "#bbf7d0"} />
      {modal && <Modal setModal={setModal} />}
    </SafeAreaView>
  )
}