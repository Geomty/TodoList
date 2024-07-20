import { Text, Pressable, useColorScheme } from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { Portal } from "@gorhom/portal";
import { useRef } from "react";
import Animated, { useAnimatedStyle, interpolate, Extrapolation } from "react-native-reanimated";
import * as colors from "../constants/colors";

export default function Modal({ setModal }) {
  const bottomSheetRef = useRef(null);
  const colorScheme = useColorScheme();

  return (
    <Portal>
      <BottomSheet
        backdropComponent={Backdrop}
        backgroundStyle={{ backgroundColor: colorScheme == "dark" ? colors.green900 : colors.green200, borderRadius: 32 }}
        enablePanDownToClose={true}
        snapPoints={["50%", "90%"]}
        onChange={num => {
          if (num == -1) {
            setModal(false);
          }
        }}
        ref={bottomSheetRef}
      >
        <BottomSheetView>
          <Pressable onPress={() => bottomSheetRef.current.close()}><Text>hello!</Text></Pressable>
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