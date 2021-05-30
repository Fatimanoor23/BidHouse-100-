import React,{useState,useEffect} from 'react';
import {View, StyleSheet,Text,Platform, Dimensions} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeStack from './HomeStack';
import Drawer from './Drawer'
import ChatStack from './ChatStack';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
const HEIGHT = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  const[home, setHome] = useState(true)
  const[chat, setChat] = useState(false)
  const[profile, setProfile] = useState(false)

  const activeTab=(value)=>{
    if (value == 'home'){
      setHome(true),
      setChat(false),
      setProfile(false)
    }
    else if(value == 'chat'){
      setHome(false),
      setChat(true),
      setProfile(false)
    }
    else{
      setHome(false),
      setChat(false),
      setProfile(true)
    }
  }

  return (
    // <NavigationContainer>
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarLabel: () => {
          return null;
        },
        tabBarIcon: ({focused, color, size}) => {
          if (route.name === 'HomeStack'){
            return(
              <TouchableOpacity style={styles.center} onPress={()=> activeTab('home')}>
            <View style={{...styles.container,backgroundColor:home ? '#F76300' : 'white'}}
            >
             <Entypo name="grid" size={home ? 34 : 24} color={home ? 'white' : 'black'}/>
            </View>
            <Text style={{...styles.text,display:home ? 'flex' : 'none'}}>Explore</Text>
          </TouchableOpacity>
          )} else if (route.name === 'ChatStack') {
            return (
              <TouchableOpacity style={styles.center} onPress={()=> activeTab('chat')}>
              <View style={{...styles.container,backgroundColor:chat ? '#F76300' : 'white'}}
            >
               <MaterialIcons name="chat" size={chat ? 34 : 24} color={chat ? 'white' : 'black'} />
              </View>
            <Text style={{...styles.text,display:chat ? 'flex' : 'none'}}>Chat</Text>
          </TouchableOpacity>
            );
          } else if (route.name === 'Drawer') {
            return(
              <TouchableOpacity style={styles.center} onPress={()=> activeTab('profile')}>
              <View style={{...styles.container,backgroundColor:profile ? '#F76300' : 'white'}}
            >
             <FontAwesome name="user-circle-o" size={profile ? 34 : 24} color={profile ? 'white' : 'black'} />
             </View>
            <Text style={{...styles.text,display:profile ? 'flex' : 'none'}}>Profile</Text>
          </TouchableOpacity>
          )}
        },
      })}
      barStyle={{backgroundColor: ' #F3F3F3'}}
      tabBarOptions={{
        iconStyle: {width: 30, height: 30, margin: 0, padding: 0},
        tabStyle: {height: 55},
        style:{height: (Platform.OS === 'android') ? HEIGHT*0.08 : HEIGHT*0.1}
      }}>
      <Tab.Screen name="HomeStack" component={HomeStack} />
      <Tab.Screen name="ChatStack" component={ChatStack} />
      <Tab.Screen name="Drawer" component={Drawer} />
    </Tab.Navigator>
    //  </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  container: {
    height:(Platform.OS === 'android') ? 50 : 55,
    width: (Platform.OS === 'android') ? 50 : 55,
    borderRadius: 30,
    opacity: 2,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection:'row',
  },
  text:{
    fontSize:15,
    fontWeight:'bold',
    color:'#F76300',
    marginTop:(Platform.OS === 'android') ? -3 : 1,
    alignSelf:'center',
    marginBottom:(Platform.OS === 'android') ? 3 : 1
    // shadowColor: 'grey',
    // shadowOffset: {width: 1, height: 1},
    // shadowOpacity: 0.3,
    // shadowRadius: 1,
    // elevation: 2,
  },
  center:{
    justifyContent: 'center',
    alignItems: 'center',
    width:width*0.3,
    height: 75,
    overflow:'visible'
  }
});
