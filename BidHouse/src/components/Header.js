import React,{useState} from 'react'
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, View,SafeAreaView,Dimensions, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

export default function Header(props,nav){
    return(
        <SafeAreaView style={{paddingTop:20}}>
    <View style={{flexDirection:"row",paddingVertical:15,justifyContent:"space-between",alignItems:'center',borderBottomWidth:0.5,borderBottomColor:'#f76300' }}>
    {props.isBack == true ?
            <TouchableOpacity onPress={()=> props.navigation.goBack()}>
            <Ionicons name="chevron-back-sharp" size={24} color="#f76300" style={{marginLeft:"4%"}} />
            </TouchableOpacity> :
            <View style={{marginRight:50}}></View>
    }
            <Text style={{fontSize:20,color:"#f76300",fontWeight:"bold"}}>{props.text}</Text>
            {props.drawer == true ?
            <Entypo name="menu" size={24} color="#f76300" style={{marginRight:"4%"}} onPress={() => props.navigation.openDrawer()} />
             : <View style={{marginRight:50}}></View>
          }
            </View>
            </SafeAreaView>
    )
}
