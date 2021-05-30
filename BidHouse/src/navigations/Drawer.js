import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer';
import SideMenuScreen from '../screens/SideMenuScreen'
import ProfileStack from './ProfileStack'
import PaymentScreen from '../screens/PaymentScreen';
import Header from '../components/Header';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import CreateAuctionScreen from '../screens/CreateAuctionScreen'
import ChatScreen from '../screens/ChatScreen';

const Drawer = createDrawerNavigator();
export default function Drawers({ navigation, route }) {
  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    console.log("route name:");
    if (routeName === "ChatScreen"){
      console.log("route name inside:",navigation.setOptions({tabBarVisible: false}));
        navigation.setOptions({tabBarVisible: false});
    }else {
      console.log("route name else:",routeName);
        navigation.setOptions({tabBarVisible: true});
    }
  }, [navigation, route]);
    return (
        <Drawer.Navigator 
        drawerPosition="right" initialRouteName="SideMenuScreen"  drawerContent={ props => <SideMenuScreen {...props}
         />}> 
        
        <Drawer.Screen name="ProfileStack" component={ProfileStack} /> 
        <Drawer.Screen name="PaymentScreen" component={PaymentScreen}/>
        <Drawer.Screen name="CreateAuctionScreen" component={CreateAuctionScreen}/>
        <Drawer.Screen name="ChatScreen" component={ChatScreen}/>

      </Drawer.Navigator>
        
    )
}

const styles = StyleSheet.create({})
