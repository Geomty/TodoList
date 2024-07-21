import { View, useWindowDimensions } from "react-native";
import { Tabs } from "expo-router";
import TabBar from "../../components/tab-bar";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function TabLayout() {
  const { height } = useWindowDimensions();

  return (
    <View style={{ minHeight: Math.round(height) }}>
      <Tabs tabBar={props => <TabBar {...props} />} screenOptions={{
        headerShown: false
      }}>
        <Tabs.Screen name="index" options={{
          title: "Ongoing",
          tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="home-variant-outline" color={color} size={size} />
        }} />
        <Tabs.Screen name="completed" options={{
          title: "Completed",
          tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="home-variant-outline" color={color} size={size} />
        }} />
      </Tabs>
    </View>
  )
}