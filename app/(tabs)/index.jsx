import { Text, View, ScrollView, useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

export default function Home() {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaView>
      <ScrollView className="bg-white dark:bg-black">
        <Text className="pt-2 pb-3 text-2xl text-black text-center border-b border-black dark:border-white dark:text-white">To-do List</Text>
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
      <StatusBar style="auto" backgroundColor={colorScheme == "dark" ? "black" : "white"} />
    </SafeAreaView>
  )
}