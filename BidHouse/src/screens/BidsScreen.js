import React,{useState, useRef }   from 'react';
import {View,ActivityIndicator,Modal, Text,StyleSheet,Dimensions,FlatList, TouchableOpacity,ScrollView,TouchableHighlight} from 'react-native';
import {FlatListSlider} from 'react-native-flatlist-slider';
import { useFocusEffect } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import {fetchAllBidsofProductApi} from "../apis/bidApis/bidApis";
import {getUserId} from '../apis/LocalDB';
import moment from 'moment';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const HEIGHT = Dimensions.get('screen').height;
const WIDTH = Dimensions.get('screen').width;

function BidsScreen({route,navigation}){
  const {product,days} = route.params
  const [bids,setBids] = useState();
  const [amount,setAmount] = useState();
  const [visible,setVisible] = useState(true)
  const [modalVisible, setModalVisible] = useState(false);

  const images=[
    {
     image:"https://e-bit-point-apis.herokuapp.com/public/"+product.imgCollection[0]
    },
    {
      image:"https://e-bit-point-apis.herokuapp.com/public/"+product.imgCollection[1]
    },
  ]

  useFocusEffect(
    React.useCallback(() => {
    getBids();
  }, [])
  );
  
  const getBids=async()=>{
    getUserId(async(user) => {
    console.log('userid',user)
    await fetchAllBidsofProductApi(user,product._id).then((response)=>{
        console.log("response:",response.length)
        if(response.length > 0){
          setAmount(response[0].bid)
        }else{
          setAmount(product.price)
        }
          setVisible(false)
          setBids(response)
    }).catch((e)=>{
          setVisible(false)
        console.log("error:",e)
      })
    }).catch(error => {
        console.log("error:",error)
        {visible && setVisible(false)}
      })
  }

    return(
        <View style={{opacity:modalVisible? 0.1:1}}> 
{visible ? (
<ActivityIndicator style={{marginTop:30}} visible={visible} color="#F76300" size="large" />
) : (                 
<View style={{marginBottom:'40%'}}>
<TouchableOpacity style={{position:'absolute',top:35,left:15,zIndex:100}} onPress={()=> navigation.goBack()}>
           <Ionicons name="chevron-back" size={24} color="black" />
           </TouchableOpacity>
        <View style={{width:WIDTH,height:HEIGHT/3.8}}>
         <FlatListSlider 
         onPress={() => {
          setModalVisible(!modalVisible);
        }}
          data={images}
          autoscroll={false} 
          indicatorContainerStyle={{position:'absolute', bottom: 70}}
          indicatorInActiveColor={'#ffffff'}
          animation
        />
</View>
<View style={{width:WIDTH/1.2,padding:12,backgroundColor:"#fff",marginTop:-55,marginHorizontal:"9%",elevation:10, borderRadius:10,justifyContent:'center'}}>
<View style={{flexDirection:"row",justifyContent:"space-between",marginHorizontal:"7%",marginTop:"4%"}}>
<Text style={styles.rate}>{amount}</Text>
<View style={{flexDirection:"row"}}>
<FontAwesome5 name="clock" size={20} color="#1b1a60" style={{marginRight:5}}  />
<Text style={styles.rate}>{days}</Text>
</View>
</View>
<View style={{flexDirection:"row",justifyContent:"space-between",marginHorizontal:"7%",marginTop:"2%"}}>
<Text style={styles.heading}>Current Bid</Text>
<Text style={{...styles.heading}}>Auction Ends</Text>
</View>
</View>
<ScrollView style={styles.bottomcard}
      showsVerticalScrollIndicator={false}>

<Text style={{fontSize:20, color:"#1b1a60", fontWeight:"bold"}}>{product.created_by.first_name} {product.created_by.last_name}</Text>
<View style={{flexDirection:"row",marginTop:"1%",justifyContent:"space-between"}}>
<Text style={{...styles.heading,fontSize:12,width:WIDTH/1.5}}>{product.description}</Text>
<Text style={{...styles.heading,fontSize:12,color:"#F76300",fontWeight:"bold" }} >More info</Text>
</View>
<View style={{flexDirection:"row",justifyContent:'space-between',marginTop:"7%"}}>
<View>
<Text style={{...styles.features}}>{product.category}</Text>
<Text style={{...styles.heading}}>category</Text>
</View>
<View>
<Text style={{...styles.features}}>{product.city}</Text>
<Text style={styles.heading}>City</Text>
</View>
<View>
<Text style={{...styles.features}}>{product.price}</Text>
<Text style={{...styles.heading}}>Starting Bid</Text>
</View>
</View>

<Text style={{...styles.features,fontSize:16, marginTop:"5%"}}>Bidders</Text>

<FlatList
data={bids}
showsVerticalScrollIndicator={false}
renderItem={({ item, index }) =>{
const {bid,created_by,createdAt} = item
const {first_name,_id,last_name} = created_by
return(
<View style={{flexDirection:"row",justifyContent:"space-between", marginTop:"2%"}}>
<View style={{flexDirection:"row", height:HEIGHT/13,width:WIDTH/2}}>
<View style={{marginLeft:"4%"}}> 
<Text style={{color:"#1b1a60",fontSize:15,fontWeight:"bold"}}>{first_name}</Text>
<Text style={{color:"grey",fontSize:13,}}>{moment(createdAt).format("YYYY/MM/DD")}      {moment(createdAt).format('LT').toString()}</Text>

</View></View>
<View style={{backgroundColor:"#F76300" ,justifyContent:"center",alignItems:"center",borderRadius:10,padding:10,height:40}}>
<Text style={{color:'#fff',fontWeight:'bold'}}>{bid}</Text>
</View>
<TouchableOpacity onPress={()=>navigation.navigate("ChatScreen",{
    receiver_id:_id,
    id:_id,
    first_name:first_name,
    last_name:last_name
  })} style={{backgroundColor:"#F76300" ,justifyContent:"center",alignItems:"center",borderRadius:10,padding:10,height:40}}>
<Text style={{color:'#fff',fontWeight:'bold'}}>Chat</Text>
</TouchableOpacity>
</View>
)
}}
/>

</ScrollView>
</View>
)}

<Modal animationType="fade" 
transparent={true} visible={modalVisible}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
            
            <View style={{width:WIDTH,marginTop:10,height:HEIGHT*0.3}}>
         <FlatListSlider 
         onPress={() => {
          setModalVisible(!modalVisible);
        }}
      
          data={images}
          autoscroll={false} 
          indicatorContainerStyle={{position:'absolute', bottom: 70}}
          indicatorInActiveColor={'#ffffff'}
          
        />
</View>

              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}x
              >
                <Text style={styles.textStyle}>Minimize</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>

</View>
)}

const styles = StyleSheet.create({
    
rate:{
color:"#1b1a60",
fontSize:14,
fontWeight:"bold"
 
},
heading:{
fontSize:14,
color:"grey"
},
bottomcard:{
marginHorizontal:"8%",
marginTop:"4%",
height:'70%'
},
features:{
    fontSize:14,
    color:"#1b1a60",
    fontWeight:"bold",
    paddingBottom:5
},
bidAmount:{
  height:HEIGHT/18,width:WIDTH/6,elevation:10,backgroundColor:"#F5F5F5",fontWeight:"bold",borderRadius:12,justifyContent:"center",alignItems:"center"
},
openButton: {
  backgroundColor: "#F194FF",
  borderRadius: 20,
  padding: 10,
  elevation: 2,
  // marginTop: hp("25%"),
},
modalView: {
  marginTop: hp("20%"),
  width: wp("100%"),
  alignSelf: "center",
  backgroundColor: "white",
  borderRadius: 20,
  height: hp("40%"),
  alignItems: "center",

  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
},
});


export default BidsScreen;