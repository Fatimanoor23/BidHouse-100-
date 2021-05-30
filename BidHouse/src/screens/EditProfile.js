import React,{useState,useEffect} from 'react'
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, ActivityIndicator, View,SafeAreaView,Dimensions, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Header from '../components/Header'
import {getUserId} from '../apis/LocalDB';
import {fetchProfileApi,editProfileApi} from '../apis/userApis/UserApis';
const HEIGHT = Dimensions.get('screen').height;
const WIDTH = Dimensions.get('screen').width;
import { AntDesign } from '@expo/vector-icons';


export default function EditProfile({navigation}) {

const [firstName, setfirstName] = useState("");
const [lastName,setlastName]= useState("");
const[Email,setEmail]= useState("");
const[Phone,setPhone]=useState("");
const [userId,setUserId] = useState('')
const [visible,setVisible] = useState(false)

   useEffect(()=>{
    getProfileInfo()
   },[])
  
   const getProfileInfo=async()=>{
      getUserId(async(user) => {
      console.log('userid',user)
      setUserId(user);
      setVisible(true)
      await fetchProfileApi(user).then((response)=>{
          console.log("response:",response);
          setfirstName(response.first_name)
          setlastName(response.last_name)
          setEmail(response.email)
          setPhone(response.mobile)
          setVisible(false)
      }).catch((e)=>{
          console.log("error:",e)
        })
      }).catch(error => {
          console.log("error:",error)
        })
    }

    const updateProfile=async()=>{
        setVisible(true)     
        await editProfileApi(userId,firstName,lastName,Email,Phone).then((response)=>{
        console.log("response:",response)
        setVisible(false)
     }).catch(e=>{
         setVisible(false)
         console.log("error:",e)
     })
    }

return (
        <SafeAreaView>
        <View style={styles.container}>
        <Header text = "Profile" navigation={navigation} drawer={true} isBack={true}/>
{visible ? (
<ActivityIndicator visible={visible} color="#F76300" size="large" />
) : (
<View style={{marginHorizontal:"6%"}}>
<ScrollView>
<Text style={styles.heading}>First Name</Text>
<TextInput style={styles.input}
underlineColorAndroid="transparent"
placeholder="First Name"
value={firstName}
onChangeText={text=> setfirstName(text)}
>
 </TextInput>

<Text style={styles.heading}>Last Name</Text>


<TextInput style={styles.input}


underlineColorAndroid="transparent"
onChangeText={text => setlastName(text)}
value={lastName}
placeholder="Last Name"



/> 
<Text style={styles.heading}>Email</Text>
<TextInput style={styles.input}
textContentType="emailAddress"
underlineColorAndroid="transparent"
onChangeText={text => setEmail(text)}
placeholder="Email"
value={Email}
 />
<Text style={styles.heading}>Phone</Text>
<TextInput
style={styles.input}
textContentType="telephoneNumber"
keyboardType="number-pad"
underlineColorAndroid="transparent"
onChangeText={text => setPhone(text)}
placeholder="Phone"
value={Phone}

/>
<View style={{borderBottomColor:'grey',borderBottomWidth:0.5}}/>
</ScrollView>

<View style={{}}>
<TouchableOpacity style={styles.save} onPress={updateProfile}>
{visible ? (
<ActivityIndicator visible={visible} color="#fff" size="small" />
) : (    
<Text style={{color:"#fff",fontSize:16,fontWeight:"bold"}}>Save</Text>
)}
</TouchableOpacity>
</View>

</View>
)}
</View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
container:{
marginTop:"5%"
},
heading:{
color:"#f76300",
fontSize:12,
marginTop:"10%"
},
input:{
borderBottomWidth:0.4,
borderBottomColor:"grey",
// paddingVertical:12,

// marginTop:"2%",
color:"#505050"

},
save:{
    height:HEIGHT*0.06,width:WIDTH-40,backgroundColor:"#f76300",marginTop:"30%",borderRadius:16,justifyContent:"center",alignItems:"center",
}

})