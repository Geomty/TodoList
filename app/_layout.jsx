import { SafeAreaProvider } from "react-native-safe-area-context";
import { PaperProvider } from "react-native-paper";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PortalProvider } from "@gorhom/portal";
import { Stack } from "expo-router";

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