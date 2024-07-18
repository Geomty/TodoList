import { Text, Pressable } from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useRef } from "react";
import Animated, { useAnimatedStyle, interpolate, Extrapolation } from "react-native-reanimated";

export default function CreateModal({ setModal }) {
  const bottomSheetRef = useRef(null);

  return (
    <>
      <BottomSheet backdropComponent={Backdrop} enablePanDownToClose={true} snapPoints={["50%", "90%"]} onChange={num => {
        if (num == -1) {
          setModal(false);
        }
      }} ref={bottomSheetRef}>
        <BottomSheetView>
          <Pressable onPress={() => bottomSheetRef.current.close()}><Text>hello!</Text></Pressable>
        </BottomSheetView>
      </BottomSheet>
    </>
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
    <Animated.View style={[style, opacity]} className="bg-slate-500" />
  )
}