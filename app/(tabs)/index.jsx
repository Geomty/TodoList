import { Text, View, ScrollView, Pressable, useColorScheme } from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import Modal from "../../components/modal";
import * as colors from "../../constants/colors";

export default function Home() {
  const colorScheme = useColorScheme();
  const [modal, setModal] = useState(false);

  return (
    <SafeAreaView>
      <ScrollView className="flex bg-green-100 dark:bg-green-950">
        <View className="p-3 bg-green-200 dark:bg-green-900">
          <Text className="text-2xl text-black text-center dark:text-white">To-do List</Text>
          <Pressable onPress={() => setModal(true)} className="absolute mt-4 mr-3 right-0">
            <MaterialCommunityIcons name="cog-outline" color={colors.textColor(colorScheme)} size={24} />
          </Pressable>
        </View>
        <TextInput
          placeholder="Add new"
          activeUnderlineColor={colorScheme == "dark" ? colors.green300 : colors.green800}
          textColor={colors.textColor(colorScheme)}
          right={<TextInput.Icon icon="plus" color={colors.textColor(colorScheme)} />}
          theme={{ colors: {
            onSurfaceVariant: colors.textColor(colorScheme)
          } }}
          className="m-5 text-md bg-green-200 dark:bg-green-900"
        />
        <View className="ml-5 mr-5 flex">
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
            <Text key={item} className="mb-4 text-lg text-black dark:text-white">{item}</Text>
          )})}
        </View>
      </ScrollView>
      <StatusBar style="auto" backgroundColor={colorScheme == "dark" ? colors.green900 : colors.green200} />
      {modal && <Modal setModal={setModal} />}
    </SafeAreaView>
  )
}