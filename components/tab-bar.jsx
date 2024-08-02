import { View } from "react-native";
import TabBarItem from "./tab-bar-item";

export default function TabBar({ state, descriptors, navigation }) {
  return (
    <View className="h-16 w-full flex flex-row justify-around items-center bg-green-200 dark:bg-green-900">
      {state.routes.map((route, index) => <TabBarItem key={index} state={state} descriptors={descriptors} navigation={navigation} route={route} index={index} />)}
    </View>
  )
}