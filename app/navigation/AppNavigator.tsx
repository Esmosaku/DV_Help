import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import HomeScreen from "../screens/home";
import Calculator from "../screens/calculator";
import DeviceSafetyScreen from "../screens/deviceSafety";
import newPassword from "../screens/setPassword";
import SetLocationScreen from "../screens/setLocation";
import runSafetyCheck from "../screens/runSafetyCheck";
import PlanScreen from "../screens/plan";

type RootStackParamList = {
  Calculator: undefined;
  HomeScreen: undefined;
  Plan: undefined;
  DeviceSafety: undefined;
  newPassword: undefined;
  setLocation: undefined;
  runSafetyCheck: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator id="Root">
        <Stack.Screen
          name="Calculator"
          component={Calculator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DeviceSafety"
          component={DeviceSafetyScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="newPassword"
          component={newPassword}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="runSafetyCheck"
          component={runSafetyCheck}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Plan"
          component={PlanScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="setLocation"
          component={SetLocationScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
