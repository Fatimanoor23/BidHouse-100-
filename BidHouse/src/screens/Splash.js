import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {getUserId} from '../apis/LocalDB';
const HEIGHT = Dimensions.get('screen').height;
const WIDTH = Dimensions.get('screen').width;
const Splash = ({navigation}) => {
  useEffect(()=>{
    checkLogin()   
  },[])

  const checkLogin=()=>{
    getUserId((user) => {
      if(user !==null && user !==undefined){
        navigation.reset({
        index:0,
        routes:[{name:'TabNavigator'}]
        })
      }else{
        navigation.reset({
            index:0,
            routes:[{name:'WelcomeScreenOne'}]
        }) 
      }
    })
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.image}>
        <Image
          source={require('../assets/Welcome1.png')}
          style={{
            height: 200,
            width: 200,
            alignItems:'center',
            resizeMode: 'contain',
          }}
        />
      </View>
     </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: '#FFF',
  },
  image: {
    justifyContent:'center',
    alignItems:'center',
    alignSelf: 'center',
  },
 
});

export default Splash;
