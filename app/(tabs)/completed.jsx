import { View } from "react-native";
import Text from "../../components/text";
import { useState, useRef } from "react";
import { useRoute } from "@react-navigation/native";
import Animated, { FadeIn } from "react-native-reanimated";
import { MainLayout } from "../_layout";
import CompletedItem from "../../components/completed-item";

export default function Completed() {
  const route = useRoute();
  const [list, setList] = useState(route.params.list);
  const [curr, setCurr] = useState(route.params.list);
  if (route.params.list != curr) {
    setList(route.params.list);
    setCurr(route.params.list);
  }
  const disabled = useRef(false);
  
  return (
    <MainLayout>
      <View className="m-5 flex">{list.map((item, index) => <CompletedItem key={Math.random()} item={item} index={index} list={list} setList={setList} disabled={disabled} />)}</View>
      {!list.length && <Animated.View entering={FadeIn} className="flex justify-center items-center"><Text className="text-xl text-black dark:text-white">No completed tasks</Text></Animated.View>}
    </MainLayout>
  )
}