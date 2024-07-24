import AsyncStorage from "@react-native-async-storage/async-storage";

export async function addItem(store, item, oldList) {
  if (!oldList) oldList = await readList(store);
  const newList = [item, ...oldList];
  await AsyncStorage.setItem(store, JSON.stringify(newList));
  return newList;
}

export async function deleteItem(store, item, oldList) {
  if (!oldList) oldList = await readList(store);
  const newList = oldList.toSpliced(item, 1);
  await AsyncStorage.setItem(store, JSON.stringify(newList));
  return newList;
}

export async function readList(store) {
  const data = await AsyncStorage.getItem(store);
  if (data) {
    return JSON.parse(data);
  } else {
    return [];
  }
}