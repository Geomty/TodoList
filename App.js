import { Text, View, ScrollView } from "react-native";
import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";

export default function App() {
  const statusBar = Constants.statusBarHeight;

  return (
    <ScrollView>
      <Text style={{ paddingTop: statusBar+10 }} className="pb-3 text-2xl text-center border-b border-black">To-do List</Text>
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
          "twenty"
        ].map(item => { return (
          <Text key={item} className="text-lg">{item}</Text>
        )})}
      </View>
      <StatusBar backgroundColor="#00c5ff" />
    </ScrollView>
  );
}