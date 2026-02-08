import { useEffect, useState } from "react";
import { AppState, AppStateStatus } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as ScreenCapture from "expo-screen-capture";

import AppNavigator from "./app/navigation/AppNavigator";
import Calculator from "./app/screens/calculator";

const RootStack = createNativeStackNavigator();


export default function App() {
  const [showDecoy, setShowDecoy] = useState(false);

  useEffect(() => {
    ScreenCapture.preventScreenCaptureAsync();

    const handleAppStateChange = (nextState: AppStateStatus) => {
      if (nextState === "background" || nextState === "inactive") {
        setShowDecoy(true);
      } else if (nextState === "active") {
        setShowDecoy(false);
      }
    };

    const sub = AppState.addEventListener("change", handleAppStateChange);
    return () => sub.remove();
  }, []);

  return (
    <NavigationContainer>
      <RootStack.Navigator id="root" screenOptions={{ headerShown: false}}>
        {showDecoy ? (
          <RootStack.Screen name="Decoy" component={Calculator} />
        ) : (
          <RootStack.Screen name="Main" component={AppNavigator} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

export let PASSWORD = "2+0+4+0";
export let USERNAME = "Jane Doe";
export let LOCATION = "Seattle";


export const setPassword = (newPass: string) => {
  PASSWORD = newPass;
};

export const setUsername = (newName: string) => {
  USERNAME = newName;
};

export const setLocation = (newLocation: string) => {
  LOCATION = newLocation;
};
