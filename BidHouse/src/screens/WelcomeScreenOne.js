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
const HEIGHT = Dimensions.get('screen').height;
const WIDTH = Dimensions.get('screen').width;
const WelcomeScreenOne = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
       <View style={{...styles.heading}}>
        <Text style={styles.headingText}>Real Time Bidding</Text>
      </View>
        <Text style={styles.paragraphText}>
          Bringing to you live auctioning{'\n'}activities with other bidders{'\n'}
          all at a time.
        </Text>
      <View style={styles.image}>
        <Image
          source={require('../assets/Welcome1.png')}
          style={{
            height: HEIGHT / 2,
            width: WIDTH - 50,
            resizeMode: 'contain',
          }}
        />
      </View>
      <View style={styles.bottomButton}>
      <View style={{...styles.row,marginHorizontal:20}}>
      <View style={styles.circleView}>
        <View style={[styles.circle, {backgroundColor: '#F76300',width:24}]} />
        <View style={[styles.circle, {marginLeft: 5, marginRight: 5}]} />
        <View style={styles.circle} />
      </View>

        <TouchableOpacity onPress={() => navigation.navigate('WelcomeScreenTwo')}>
          <View style={styles.forward}>
          <Ionicons name="md-arrow-forward-sharp" size={26} color="white" />
          </View>
        </TouchableOpacity>
        </View>
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
  bottomButtonText: {
    color: '#10BA76',
    fontSize: 18,
    fontWeight: '900',
    marginTop: 10,
    marginRight: 10,
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
  }
});

export default WelcomeScreenOne;
