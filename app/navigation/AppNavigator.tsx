import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import PlanScreen from '../plan'

const Stack = createStackNavigator()

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Plan" component={PlanScreen} options={{headerShown: false}} />
    </Stack.Navigator>
  )
}
