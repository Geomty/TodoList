import { Text, View, FlatList } from "react-native";

export default function App() {
  return (
    <View className="p-8">
      <FlatList data={[
        "test",
        "another test",
        "yet another test",
        "1",
        "2",
        "3"
      ]} renderItem={item => <Text>{item.item}</Text>} />
    </View>
  );
}