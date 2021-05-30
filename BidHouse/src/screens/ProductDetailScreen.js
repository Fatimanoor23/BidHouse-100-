import React,{useState, useRef }   from 'react';
import {View,ActivityIndicator,Modal, Text, SafeAreaView,Image,StyleSheet,TouchableHighlight,Dimensions,FlatList, TouchableWithoutFeedback, TouchableOpacity,ScrollView} from 'react-native';
import {FlatListSlider} from 'react-native-flatlist-slider';
import { useFocusEffect } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons'; 
import RBSheet from "react-native-raw-bottom-sheet";
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import {uploadBidApi,fetchAllBidsofProductApi} from "../apis/bidApis/bidApis";
import {getUserId} from '../apis/LocalDB';
import moment from 'moment';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Alert } from 'react-native';

const HEIGHT = Dimensions.get('screen').height;
const WIDTH = Dimensions.get('screen').width;

function ProductDetailScreen({route,navigation}){
  const {product,days} = route.params
  const [bids,setBids] = useState();
  const [amount,setAmount] = useState(product.price);
  const [bidAmount,setBidAmount] = useState(product.price);
  const [userId,setUserId] = useState('')
  const refRBSheet = useRef();
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
    // console.log('userid',user)
    setUserId(user)
    await fetchAllBidsofProductApi(user,product._id).then((response)=>{
        console.log("response:",response[0].created_by._id)
        if(response.length > 0){
          setAmount(response[0].bid)
          setBidAmount(response[0].bid)
        }else{
          setAmount(product.price)
          setBidAmount(product.price)
        }
        {visible && setVisible(false)}
        setBids(response)
    }).catch((e)=>{
        {visible && setVisible(false)}
        console.log("error:",e)
      })
    }).catch(error => {
        console.log("error:",error)
        {visible && setVisible(false)}
      })
  }
  
  const postBid = async()=>{
    await uploadBidApi(userId,product._id,bidAmount).then((response)=>{
        console.log("response:",response)
        getBids();
        refRBSheet.current.close()        
    }).catch((error)=>{
        console.log("error:",error)
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
        resizeMode="contain"
        style={{backgroundColor:'rgba(0,0,0,0.8)'}}
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
<TouchableOpacity onPress={()=>navigation.navigate("ChatScreen",{
  receiver_id:product.created_by._id,
  id:product.created_by._id,
  first_name:product.created_by.first_name,
  last_name:product.created_by.last_name
})
}>
<Text style={{...styles.heading,fontSize:12,color:"#F76300",fontWeight:"bold" }} >Chat</Text>
</TouchableOpacity>
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
const {first_name} = created_by
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
</View>
)
}}
/>


<TouchableOpacity style={{backgroundColor:"#1b1a60",alignItems:"center",borderRadius: 14,
            marginBottom:20,  height:HEIGHT*0.06,justifyContent:'center'  }}  onPress={() => refRBSheet.current.open()} >
    <Text style={{color:"#fff",fontWeight:"bold"}}>Place a Bid!</Text>
</TouchableOpacity>


</ScrollView>
</View>
)}
<RBSheet
        ref={refRBSheet}
         height={470}
        closeOnDragDown={true}
        closeOnPressMask={false}
                customStyles={{
          wrapper: {
            backgroundColor: "transparent",
                      },
          draggableIcon: {
            backgroundColor: "#000"
          }
        }}
      >
        <View>

<Text style={{fontSize:30, fontWeight:"bold",color:"#1b1a60", marginLeft:"7%"}}>Place a Bid</Text>

<View style={{flexDirection:"row",marginTop:"9%",justifyContent:"space-between",marginHorizontal:"9%" }}>
    <TouchableOpacity style={styles.bidAmount} onPress={()=>{setBidAmount(amount+5)}}>
    <Text style={styles.amounts}>{amount + 5}</Text></TouchableOpacity>
    <TouchableOpacity style={styles.bidAmount} onPress={()=>{setBidAmount(amount+10)}}>
    <Text style={styles.amounts}>{amount + 10}</Text></TouchableOpacity>
    <TouchableOpacity style={styles.bidAmount} onPress={()=>{setBidAmount(amount+15)}}>
    <Text style={styles.amounts}>{amount + 15}</Text></TouchableOpacity>
    <TouchableOpacity style={styles.bidAmount} onPress={()=>{setBidAmount(amount+20)}}>
    <Text style={styles.amounts}>{amount + 20}</Text></TouchableOpacity>
</View>

<View style={styles.bottomView}>

<TouchableOpacity style={styles.plus}>
<AntDesign name="minus" size={36} color="#fff" onPress={()=>{if (bidAmount>amount+1)
  {setBidAmount(bidAmount-1)}
  else{
    Alert.alert('You cannot bid less than this amount')
  }}} /></TouchableOpacity>
<View>
<Text style={{color:"#1b1a60",fontSize:36,fontWeight:"bold"}} >{bidAmount}</Text>
<Text style={{fontSize:13,color:"grey"}} >Current Bid</Text>

</View>
<TouchableOpacity style={styles.plus}>
<AntDesign name="plus" size={36} color="#fff" onPress={()=>{setBidAmount(bidAmount+1)}} /></TouchableOpacity>
</View>
<View>
<TouchableOpacity style={styles.place}  onPress={postBid} >
    <Text style={{color:"#fff",fontWeight:"bold"}}>Place a Bid!</Text>
</TouchableOpacity>
</View>
</View>
</RBSheet>


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
         
      
    )
}

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
plus:{
  height:HEIGHT/18,width:WIDTH/7,elevation:10,backgroundColor:"#1b1a60",fontWeight:"bold",borderRadius:12,justifyContent:"center",alignItems:"center",marginTop:"3%"
},
bottomView: 
{flexDirection:"row",marginTop:"15%",marginHorizontal:"9%",justifyContent:"space-between"},
place:{
  backgroundColor:"#1b1a60",alignItems:"center",borderRadius: 16,
              padding:16,marginHorizontal:"9%",marginTop:"17%"
},
amounts:{
  color:"#1b1a60",fontWeight:"bold"
},
Recomend: {
  fontFamily: "MoskBold700",
  color: "#8338EB",
  fontSize: 16,
  marginLeft: wp("3%"),
},

titleContainer: {
  flexDirection: "row",
  marginHorizontal: wp("5%"),
  marginVertical: hp("5.5%"),
  bottom: hp("-3.5%"),
},

pictures: {
  fontFamily: "MoskBold700",
  color: "#8338EB",
  fontSize: 16,
  marginLeft: wp("6%"),
  marginTop: hp("2%"),
},

picFirstRow: {
  flexDirection: "row",
  justifyContent: "space-around",
},

pic2ndRow: {
  flexDirection: "row",
  justifyContent: "space-around",
  marginTop: hp("2%"),
  paddingBottom: hp("10%"),
},

image1: {
  width: wp("40%"),
  height: hp("15%"),
  borderRadius: 10,
},
picMainContainer: {
  padding: hp("3%"),
},
review: {
  fontFamily: "MoskBold700",
  color: "#8338EB",
  fontSize: 16,
  marginLeft: wp("6%"),
  bottom: wp("16%"),
},

ratingsContainer: {
  width: wp("90%"),

  elevation: 3,
  backgroundColor: "#fff",
  bottom: hp("5%"),
  borderRadius: 10,
  paddingBottom: hp("5%"),
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
openButton: {
  backgroundColor: "#F194FF",
  borderRadius: 20,
  padding: 10,
  elevation: 2,
  // marginTop: hp("25%"),
},
textStyle: {
  color: "white",
  fontWeight: "bold",
  textAlign: "center",
},
modalText: {
  marginBottom: 15,
  textAlign: "center",
},
});


export default ProductDetailScreen;