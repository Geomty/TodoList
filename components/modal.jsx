import { View, Appearance } from "react-native";
import Text from "./text";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { Portal } from "@gorhom/portal";
import { useState, useRef } from "react";
import { useColorScheme } from "nativewind";
import { SegmentedButtons } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Animated, { useAnimatedStyle, interpolate, Extrapolation } from "react-native-reanimated";
import * as colors from "../constants/colors";

export default function Modal({ setModal }) {
  const bottomSheetRef = useRef(null);
  const { colorScheme, setColorScheme } = useColorScheme();
  const [c, setC] = useState("light");
  AsyncStorage.getItem("theme").then(theme => {
    setC(theme);
  });
  const setCS = theme => {
    setC(theme);
    setColorScheme(theme);
    if (theme == "system") {
      setC("system");
      Appearance.setColorScheme(null);
    }
    AsyncStorage.setItem("theme", theme);
  }

  return (
    <Portal>
      <BottomSheet
        backdropComponent={Backdrop}
        backgroundStyle={{ backgroundColor: colorScheme == "dark" ? colors.green900 : colors.green200, borderRadius: 32 }}
        handleIndicatorStyle={{ backgroundColor: colors.textColor(colorScheme) }}
        enablePanDownToClose={true}
        snapPoints={["50%", "90%"]}
        onChange={num => {
          if (num == -1) {
            setModal(false);
          }
        }}
        ref={bottomSheetRef}
      >
        <BottomSheetView className="flex">
          <Text className="mt-2 text-xl text-center text-black dark:text-white">Options</Text>
          <View className="mt-6 ml-6 mr-6 flex flex-row items-center">
            <Text className="mr-3 text-lg text-black dark:text-white">Theme:</Text>
            <SegmentedButtons
              value={c}
              onValueChange={setCS}
              density="medium"
              buttons={[
                {
                  value: "light",
                  label: "Light"
                },
                {
                  value: "dark",
                  label: "Dark"
                },
                {
                  value: "system",
                  label: "System"
                }
              ]}
              theme={{ colors: {
                primary: colors.textColor(colorScheme),
                secondaryContainer: colorScheme == "dark" ? colors.green300 : colors.green800,
                onSecondaryContainer: colorScheme == "dark" ? "black" : "white",
                onSurface: colors.textColor(colorScheme),
                outline: colors.textColor(colorScheme)
              } }}
              className="flex-1"
            />
          </View>
        </BottomSheetView>
      </BottomSheet>
    </Portal>
  )
}

function Backdrop({ animatedIndex, style }) {
  const opacity = useAnimatedStyle(() => ({
    opacity: interpolate(
      animatedIndex.value,
      [-1, 0],
      [0, 0.5],
      Extrapolation.CLAMP
    ),
  }));

  return (
    <Animated.View style={[style, opacity]} className="bg-black" />
  )
}