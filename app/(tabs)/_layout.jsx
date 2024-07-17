import { Tabs } from "expo-router";
import TabBar from "../../components/TabBar";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function TabLayout() {
  return (
    <Tabs tabBar={props => <TabBar {...props} />} screenOptions={{
      headerShown: false
    }}>
      <Tabs.Screen name="index" options={{
        title: "Home",
        tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="home-variant-outline" color={color} size={size} />
      }} />
      <Tabs.Screen name="test" options={{
        title: "Test",
        tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="home-variant-outline" color={color} size={size} />
      }} />
    </Tabs>
  )
}