import { View, useWindowDimensions } from "react-native";
import { useEffect } from "react";
import { Tabs, useNavigation } from "expo-router";
import TabBar from "../../components/tab-bar";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import * as storage from "../../scripts/storage";

export default function TabLayout() {
  const { height } = useWindowDimensions();
  const navigation = useNavigation();
  useEffect(() => {
    (async () => {
      const list = await storage.readList("ongoing");
      navigation.navigate("index", { list: list });
    })();
  }, []);

  return (
    <View style={{ minHeight: Math.round(height) }}>
      <Tabs tabBar={props => <TabBar {...props} />} screenOptions={{ headerShown: false }}>
        <Tabs.Screen name="index" options={{
          title: "Ongoing",
          tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="note-outline" color={color} size={size} />
        }} initialParams={{ list: [] }} />
        <Tabs.Screen name="completed" options={{
          title: "Completed",
          tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="check" color={color} size={size} />
        }} />
      </Tabs>
    </View>
  )
}