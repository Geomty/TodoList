import { Text as RNText } from "react-native";

export default function Text({ style = [], className, children }) {
  return <RNText style={[{ fontFamily: "myFont" }, style]} className={className} children={children} />
}