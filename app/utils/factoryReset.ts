import AsyncStorage from "@react-native-async-storage/async-storage";

export async function factoryReset() {
  try {
    await AsyncStorage.clear();
  } catch (err) {
    console.log("Factory reset failed:", err);
  }
}
