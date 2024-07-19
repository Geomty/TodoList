import { Text, View, ScrollView, Pressable, useColorScheme } from "react-native";
import { useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import CreateModal from "../../components/create-modal";

export default function Home() {
  const colorScheme = useColorScheme();
  const [modal, setModal] = useState(false);

  return (
    <GestureHandlerRootView>
      <SafeAreaView>
        <ScrollView className="bg-green-100 dark:bg-green-950">
          <Text className="pt-2 pb-3 text-2xl text-black text-center bg-green-200 dark:bg-green-900 dark:text-white">To-do List</Text>
          <Pressable onPress={() => setModal(true)}>
            <Text className="pt-4 text-xl text-black text-center dark:text-white">hello</Text>
          </Pressable>
          <View className="p-4 flex gap-4">
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
        {modal && <CreateModal setModal={setModal} />}
      </SafeAreaView>
    </GestureHandlerRootView>
  )
}