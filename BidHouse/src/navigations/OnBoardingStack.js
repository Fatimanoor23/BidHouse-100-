import React from 'react';
import {Text, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
// import AppNavigator from './AppNavigator';
import Splash from '../screens/Splash';
import WelcomeScreenOne from '../screens/WelcomeScreenOne';
import WelcomeScreenTwo from '../screens/WelcomeScreenTwo';
import WelcomeScreenThree from '../screens/WelcomeScreenThree';
import TabNavigator from './TabNavigator'

const Stack = createStackNavigator();
export default function OnBoardingStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Splash" component={Splash} />  
      <Stack.Screen name="WelcomeScreenOne" component={WelcomeScreenOne} />
      <Stack.Screen name="WelcomeScreenTwo" component={WelcomeScreenTwo} />
      <Stack.Screen name="WelcomeScreenThree" component={WelcomeScreenThree} />
      <Stack.Screen name="TabNavigator" component={TabNavigator}/>
      {/* <Stack.Screen name="AppNavigator" component={AppNavigator} /> */}
    </Stack.Navigator>
  );
}
