import { withTiming, Easing } from "react-native-reanimated";
import * as storage from "./storage";

export function animateDelete(height, opacity, otherHeight, list, setList, index, store) {
  height.value = withTiming(0, { easing: Easing.inOut(Easing.quad) });
  opacity.value = withTiming(0, { duration: 200, easing: Easing.inOut(Easing.quad) });
  otherHeight.value = withTiming(0, { easing: Easing.inOut(Easing.quad) });
  setTimeout(async () => {
    setList(await storage.deleteItem(store, index, list));
  }, 400);
}