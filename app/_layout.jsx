import { View, ScrollView, Appearance } from "react-native";
import Text from "../components/text";
import { useState, useEffect } from "react";
import { useColorScheme } from "nativewind";
import { setBackgroundColorAsync } from "expo-navigation-bar";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { PaperProvider, IconButton, configureFonts } from "react-native-paper";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PortalProvider } from "@gorhom/portal";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { NotoSans_400Regular as myFont, useFonts } from "@expo-google-fonts/noto-sans";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Modal from "../components/modal";
import * as colors from "../constants/colors";

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const { setColorScheme } = useColorScheme();
  const [loaded] = useFonts({ myFont });
  useEffect(() => {
    (async () => {
      let theme = await AsyncStorage.getItem("theme");
      if (!theme) {
        theme = "light";
        await AsyncStorage.setItem("theme", theme);
      }
      setColorScheme(theme);
      await setBackgroundColorAsync(theme == "dark" ? colors.green900 : colors.green200);
      if (theme == "system") {
        Appearance.setColorScheme(null);
      } else {
        Appearance.setColorScheme(theme);
      }
      await Font.loadAsync(MaterialCommunityIcons.font);
      if (loaded) {
        SplashScreen.hideAsync();
      }
    })();
  });

  return (
    <SafeAreaProvider>
      <PaperProvider theme={{ fonts: configureFonts({ config: { fontFamily: "myFont" } }) }}>
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
  const { colorScheme } = useColorScheme();
  const [modal, setModal] = useState(false);

  return (
    <SafeAreaView>
      <ScrollView className="min-h-full flex bg-green-100 dark:bg-green-950">
        <View className="p-3 bg-green-200 dark:bg-green-900">
          <Text className="text-2xl text-black text-center dark:text-white">To-do List</Text>
          <IconButton icon="cog-outline" iconColor={colors.textColor(colorScheme)} size={24} onPress={() => setModal(true)} className="absolute mt-2 right-0" />
        </View>
        {children}
      </ScrollView>
      <StatusBar style="auto" backgroundColor={colorScheme == "dark" ? colors.green900 : colors.green200} />
      {modal && <Modal setModal={setModal} />}
    </SafeAreaView>
  )
}