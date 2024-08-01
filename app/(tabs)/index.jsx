import { View } from "react-native";
import Text from "../../components/text";
import { useState, useRef } from "react";
import { useColorScheme } from "nativewind";
import { useRoute } from "@react-navigation/native";
import { TextInput } from "react-native-paper";
import Animated, { FadeIn } from "react-native-reanimated";
import { MainLayout } from "../_layout";
import * as colors from "../../constants/colors";
import * as storage from "../../scripts/storage";
import OngoingItem from "../../components/ongoing-item";

export default function Home() {
  const { colorScheme } = useColorScheme();
  const route = useRoute();
  const [list, setList] = useState(route.params.list);
  const [curr, setCurr] = useState(route.params.list);
  if (route.params.list != curr) {
    setList(route.params.list);
    setCurr(route.params.list);
  }
  const [input, setInput] = useState("");
  const add = useRef(false);

  return (
    <MainLayout>
      <TextInput
        value={input}
        onChangeText={i => setInput(i)}
        placeholder="Add new"
        activeUnderlineColor={colorScheme == "dark" ? colors.green300 : colors.green800}
        textColor={colors.textColor(colorScheme)}
        right={<TextInput.Icon
          onPress={async () => {
            if (input.length) {
              add.current = true;
              setList(await storage.addItem("ongoing", input, list));
              setInput("");
            }
          }}
          icon="plus"
          color={colors.textColor(colorScheme)}
          forceTextInputFocus={false}
        />}
        theme={{ colors: {
          onSurfaceVariant: colors.textColor(colorScheme)
        } }}
        className="m-5 text-md bg-green-200 dark:bg-green-900"
      />
      <View className="ml-5 mr-5 mb-5 flex">{list.map((item, index) => <OngoingItem key={Math.random()} item={item} index={index} list={list} setList={setList} add={add} />)}</View>
      {!list.length && <Animated.View entering={FadeIn} className="flex justify-center items-center"><Text className="text-xl text-black dark:text-white">No tasks</Text></Animated.View>}
    </MainLayout>
  )
}