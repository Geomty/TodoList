import { View, ScrollView, Text, useColorScheme } from "react-native";
import { useState } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { PaperProvider, IconButton } from "react-native-paper";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PortalProvider } from "@gorhom/portal";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import Modal from "../components/modal";
import * as colors from "../constants/colors";

export default function Layout() {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <GestureHandlerRootView>
          <PortalProvider>
            <Stack screenOptions={{ headerShown: false }} />
          </PortalProvider>
        </GestureHandlerRootView>
      </PaperProvider>
    </SafeAreaProvider>
  )
}

export function MainLayout({ children }) {
  const colorScheme = useColorScheme();
  const [modal, setModal] = useState(false);

  return (
    <SafeAreaView>
      <ScrollView className="min-h-full flex bg-green-100 dark:bg-green-950">
        <View className="p-3 bg-green-200 dark:bg-green-900">
          <Text className="text-2xl text-black text-center dark:text-white">To-do List</Text>
          <IconButton icon="cog-outline" size={24} onPress={() => setModal(true)} className="absolute mt-2 right-0" />
        </View>
        {children}
      </ScrollView>
      <StatusBar style="auto" backgroundColor={colorScheme == "dark" ? colors.green900 : colors.green200} />
      {modal && <Modal setModal={setModal} />}
    </SafeAreaView>
  )
}