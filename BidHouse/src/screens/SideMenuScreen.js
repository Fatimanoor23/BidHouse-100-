import React from 'react'
import { StyleSheet, Text, View,Platform,Dimensions,Image, SafeAreaView,StatusBar, TouchableOpacity } from 'react-native';
import {createDrawerNavigator,DrawerItem} from '@react-navigation/drawer';
import {FontAwesome} from "@expo/vector-icons";
import {Foundation} from '@expo/vector-icons';
import {AntDesign} from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import {MaterialCommunityIcons} from "@expo/vector-icons";
import { Fontisto } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import {LogOutApi,AllAccountsLogOutApi} from '../apis/userApis/UserApis'
import {getUserId,removeIdFromLocalDb} from '../apis/LocalDB';

import Drawer from 'react-native-paper'
// const Drawer = createDrawerNavigator();
const HEIGHT = Dimensions.get("screen").height;
const WIDTH = Dimensions.get("screen").width;

export default function SideMenuScreen(props)  {

    const  logout = async() =>{
        getUserId(async(user) => {
        await LogOutApi(user).then((response)=>{
        console.log("response:",response)
        removeIdFromLocalDb()    
        props.navigation.reset({
            index:1,
            routes:[{name:'LoginScreen'}]
            })
        })
        })
    }

    return (
        // <SafeAreaView style={styles.drawerContainer}> 
     <View>


     <View style={styles.upperBG}/>
<View style={styles.headingContainer }>
     <Text style={styles.ebid}>BidHouse</Text>
     </View>
     <View style={styles.drawerContainer}>
     <DrawerItem 
        icon={({color,size})=> (
<Feather name="user" style={{color:"purple"}} 
color={color}
size={size}/>
)}
label= "Profile"
onPress={() => {props.navigation.navigate('ProfileScreen')}}
          />
     <DrawerItem 
        icon={({color,size})=> (
<MaterialCommunityIcons  style={{color:"purple"}}
name="face-profile"
color={color}
size={size}/>
)}
label="Create Auction"
onPress={() => {props.navigation.navigate('CreateAuctionScreen')}}
          />

<DrawerItem 
        icon={({color,size})=> (
<AntDesign name="profile"  style={{color:"purple"}}
color={color}
size={size}/>
)}
label="Edit Profile"
onPress={() => {props.navigation.navigate('EditProfile')}}
          />

        
          <DrawerItem 
        icon={({color,size})=> (
<Fontisto style={{color:"purple"}}
 name="product-hunt" size={size} color={color} 
label="Products"
         />

        )}
        label="Products"
        onPress={() => {props.navigation.navigate('MyProductsScreen')}}        
/>

<DrawerItem 
        icon={({color,size})=> (
<MaterialIcons  style={{color:"purple"}} 
name="description" size={size} color={color} />

        )}
        label="About"
        onPress={() => {props.navigation.navigate('About')}}        
/>

<DrawerItem 
        icon={({color,size})=> (
<AntDesign style={{color:"purple"}}
name="creditcard"
color={color}
size={size}/>
)}
label="Payment"
onPress={() => {props.navigation.navigate('PaymentScreen')}}
          />

        <DrawerItem 
        icon={({color,size})=> (
<MaterialCommunityIcons  style={{color:"purple"}}
name="exit-to-app"
color={color}
size={size}/>
)}
label="Log Out"
onPress={logout}
   />


     </View>   
     </View>
    //  </SafeAreaView>       
                    )
}



const styles = StyleSheet.create({
    upperBG:{
        height:160,
        width:'100%',
        borderBottomLeftRadius:WIDTH,
        borderBottomRightRadius:WIDTH,
        backgroundColor:'#F8934F',
        alignSelf:'center'
    },
    ebid:{
color:"#f8934f",
fontSize:20,
fontWeight:"bold"
    },
    headingContainer:{
        justifyContent:"center",
        alignItems:"center",
        marginTop:"16%"

    },
    drawerContainer:{
marginTop:"10%"

    }
})
 