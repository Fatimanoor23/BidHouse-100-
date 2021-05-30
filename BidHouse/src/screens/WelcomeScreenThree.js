import React from 'react';
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
const HEIGHT = Dimensions.get('screen').height;
const WIDTH = Dimensions.get('screen').width;
const WelcomeScreenThree = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={()=> navigation.goBack()}>
      <Ionicons name="chevron-back" size={30} color="black" style={styles.back}/>
      </TouchableOpacity>
       <View style={{...styles.heading}}>
        <Text style={styles.headingText}>After Sale Warranty</Text>
      </View>
        <Text style={styles.paragraphText}>
          To ensure transparency and your{'\n'}happiness, there's 1 month warranty{'\n'}
          on all your successful bids.
        </Text>
      <View style={styles.image}>
        <Image
          source={require('../assets/Welcome3.png')}
          style={{
            height: HEIGHT / 2,
            width: WIDTH - 50,
            resizeMode: 'contain',
          }}
        />
      </View>
      <View style={styles.bottomButton}>
    <TouchableOpacity
    style={[styles.bottomButtonView,styles.shadow]}
    onPress={() => navigation.navigate('LoginScreen')}
    >
      <Text style={styles.bottomButtonText}>Start Bidding</Text>
    </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  image: {
    marginTop: 50,
    alignSelf: 'center',
  },
  heading: {
    marginTop: 30,
    alignSelf: 'center',
  },
  headingText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#F76300',
    letterSpacing:1
  },
  line: {
    marginTop: 10,
    height: 4,
    width: 60,
    alignSelf: 'center',
    backgroundColor: '#10BA76',
  },
  paragraph: {
    marginTop: 50,
    alignSelf: 'center',
  },
  paragraphText: {
    color: '#1E1E1E',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '400',
    letterSpacing: 1,
    marginTop:10
  },
  circleView: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  circle: {
    height: 4,
    width: 16,
    borderRadius: 2,
    backgroundColor: '#C1C1C1',
  },
  bottomButton: {
    position: 'absolute',
    right: 0,
    left:0,
    bottom: 35,
  },
  bottomButtonView:{
    backgroundColor:'#F76300',
    paddingVertical:12,
    borderRadius:20,
    alignItems:'center',
    marginHorizontal:40
  },
  bottomButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  row:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between'
  },
  forward:{
    padding:15,
    borderRadius:40,
    backgroundColor:'#F76300'
  },
  back:{
    marginTop:10,
    marginLeft:10
  },
  shadow:{
    shadowColor:'#000',
    shadowOffset:{width:0,height:1},
    shadowOpacity:0.8,
    shadowRadius:3
  }
});

export default WelcomeScreenThree;
