import { View } from "react-native";
import Text from "../../components/text";
import { useState } from "react";
import { useRoute } from "@react-navigation/native";
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
  
  return (
    <MainLayout>
      <View className="m-5 flex">{list.map((item, index) => <CompletedItem key={index} item={item} index={index} list={list} setList={setList} />)}</View>
      {!list.length && <View className="flex justify-center items-center"><Text className="text-xl text-black dark:text-white">No completed tasks</Text></View>}
    </MainLayout>
  )
}