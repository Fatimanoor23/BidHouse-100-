
import React, {useState,useEffect} from 'react'
import { StyleSheet,ScrollView,TouchableOpacity,ActivityIndicator, 
  Text,Button,Alert,TextInput,View,StatusBar,Platform,Dimensions,SafeAreaView 
} from 'react-native'
import ImageInputList from '../components/ImageInputList';
import Header from '../components/Header';
import {EvilIcons} from '@expo/vector-icons';
import {Picker} from '@react-native-picker/picker';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker'
const HEIGHT = Dimensions.get('screen').height;
const WIDTH = Dimensions.get('screen').width;
import {uploadProductApi} from "../apis/productApis/productApis";
import {getUserId} from '../apis/LocalDB';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';

export default function CreateAuctionScreen(props) {
  const [userId, setUserId] = useState()
  const [images, setImages] = useState([])
  const [imageName, setImageName] = useState()
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState('');
  const [descipe, setDescipe] = useState('');
  const [catagory, setCatagory] = useState('Catagory');
  const [expiryDate, setExpiryDate] = useState('Expiry Date');
  const [expiryTime, setExpiryTime] = useState('Expiry Time');
  const [price,setPrice] = useState('');
  const [city,setCity] = useState('');
  const [visible,setVisible] = useState(false)
  const [showDate, setShowDate] = useState(false);
  const [picker, setPicker] = useState(false);
  const [mode, setMode] = useState('');
  const [dateTime, setDateTime] = useState('');

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);


  const showDatepicker = (param) => {
    if (param === 'date'){
      setShowDate(true)
      setMode('date')
    }
    else{
      setShowDate(true)
      setMode('time')
    }
    
  };
  const onChangeDT = (selectedDate) => {
    const currentDate = selectedDate || selectedDate;
    console.log('kdwjhfkd',currentDate);
    if(mode=="date"){
      let date = moment(currentDate).format("YYYY-MM-DD")
      setShowDate(Platform.OS === 'ios');
      setExpiryDate(date);
      hideDatePicker()
    }
    if(mode=="time"){
    let time = moment(currentDate).format('LT')
    setExpiryTime(time);
    var momentObj = moment(expiryDate + time, 'YYYY-MM-DDLT');
    // conversion
    console.log("moment",momentObj);
    let combined =moment(momentObj).valueOf();
    console.log('hello',combined);
    setDateTime(combined)
    hideDatePicker()
    }
  };
  const hideDatePicker = () => {
    setShowDate(false)
  };

  // const handleConfirmDate = (date) => {
  //   console.warn("A date has been picked: ", date);
  //   Moment.locale('en');
  //   let formattedDate = Moment(date).format('DD/MM/yyyy')
  //   setExpiryDate(formattedDate)
  //   hideDatePicker();
  // };

      const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };
   
  const handleAdd = (uri) => {
    const {imageName} = 'Car' + userId;
    let updatedImages = [...images, uri];
    console.log('handle add => ', updatedImages);
    setImages(updatedImages);
    setImageName(imageName)
  };


  const handleRemove = (uri) => {
    let updatedImages = images.filter((imageUri) => imageUri !== uri);
    setImages(updatedImages)
  };
  const selectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      console.log(result);
  
      if (!result.cancelled) {
        const uri = result.uri;
        onChangeImage(uri);
      }
  };
  const uploadProducts = async() =>{

    if((title && descipe && dateTime && catagory && city && price !=='') && (expiryDate !== "Expiry Date")){
    if(title.length >=5){
    if(images.length>=2){  
     getUserId(async(user) => {
     setVisible(true)
      console.log('userid',user)
      const photo1 = {
        uri:images[0],
        type: "image/png",
        name: "photo1.png",
      };
      const photo2 = {
        uri:images[1],
        type: "image/png",
        name: "photo2.png",
      };
      const photos = [photo1,photo2];
      console.log("images:",photos);
      await uploadProductApi(user,title,descipe,price,photos,city,dateTime,catagory).then((response)=>{
        console.log("response:",response)
        setTitle('')
        setDescipe('')
        setPrice('')
        setCity('')
        setExpiryDate('Expiry Date')
        setExpiryTime('Expiry Time')
        setDateTime("")
        setCatagory('')
        setVisible(false)
      }).catch((error)=>{
        console.log("error:",error)
        setVisible(false)
      })
    }).catch(error => {
      console.log("error:",error)
    })
    }else{
      alert('Please Select Minimum 2 Images')
    }
    }else{
      alert('Please Set the title more than 5 characters')
    }
  }else{
    alert('Some Fields Are Missing');
  }
}

    return (
      <SafeAreaView style={styles.container}>
        <Header text="Create Auction" isBack={true} navigation={props.navigation}/>
        <ScrollView>
        <TextInput
          placeholder="Auction Title"
          placeholderTextColor='gray'
          style={styles.auctionTitle}
          onChangeText={(text) => setTitle(text)}
          value={title}
        />

         <TextInput
          placeholder="Description"
          placeholderTextColor='gray'
          style={{ ...styles.auctionTitle,paddingVertical:25,marginTop:5 }}
          onChangeText={(text) => setDescipe(text)}
          value={descipe}
        />
       

       {/* <Text style={{ ...styles.auctionTitle,marginTop:5,color:catagory ==='Catagory'? 'grey' : 'black'}}
       onPress={()=> setPicker(!picker)}>{catagory}</Text>
        */}

<Picker
  style={{...styles.auctionTitle,marginTop:5,color:catagory ==='Catagory'? 'grey' : 'black'}}
  selectedValue={catagory}
  placeholderTextColor={'grey'}
  onValueChange={(itemValue, itemIndex) =>
    setCatagory(itemValue)
  }>
   <Picker.Item label="Catagory" value="" />
  <Picker.Item label="Watches" value="Watches" />
  <Picker.Item label="Glasses" value="Glasses" />
  <Picker.Item label="Rings" value="Rings" />
  <Picker.Item label="Other" value="Other" />

</Picker>
        <TextInput
          placeholder="City"
          placeholderTextColor='gray'
          style={{ ...styles.auctionTitle,marginTop:5 }}
          onChangeText={(text) => setCity(text)}
          value={city}
        />
        <View style={{...styles.auctionTitle,marginTop:5,flexDirection:'row',justifyContent:'space-between'}}>
        <Text style={{color:expiryDate === 'Expiry Date'? 'grey' : 'black'}}>
          {expiryDate}
          </Text>
         <EvilIcons name="calendar" size={25} onPress={()=> showDatepicker('date')}/>
         <DateTimePickerModal
            isVisible={showDate}
            mode={mode}
            value={new Date()}
            onConfirm={(date)=>onChangeDT(date)}
            onCancel={hideDatePicker}
          />
         </View>
          
         <View style={{...styles.auctionTitle,marginTop:5,flexDirection:'row',justifyContent:'space-between'}}>
         <Text style={{color:expiryTime === 'Expiry Time'? 'grey' : 'black'}}>
          {expiryTime}
          </Text>
         <EvilIcons name="calendar" size={25} onPress={()=> showDatepicker('time')}/>
           </View>
          
         <TextInput
          placeholder="Bid Starting Price"
          placeholderTextColor='gray'
          keyboardType="number-pad"
          style={{ ...styles.auctionTitle,marginTop:5 }}
          onChangeText={(text) => setPrice(text)}
          value={price}
        />
        <ImageInputList
          imageUris={images}
          onAddImage={handleAdd}
          onRemoveImage={handleRemove}
        />
        <View style={{flexDirection:'row',alignItems:'center',marginHorizontal:'5%',justifyContent:'space-between'}}>
        <Text style={{fontSize:16,fontWeight:'bold'}}>AR-View</Text>
        <View style={styles.ImageContainer}>
          <MaterialCommunityIcons color={'black'} name="camera" size={34} />
          </View>
        </View>
        {/* <Button title="Choose image..." onPress={pickImage} /> */}
      <TouchableOpacity onPress={uploadProducts}
      style={{height:40,width:WIDTH-40,paddingVertical:6,marginVertical:10,alignSelf:'center',backgroundColor:"#F76300",borderRadius:20}}>
        {visible ? (
        <ActivityIndicator visible={visible} color="#fff" size="small" />
        ) : (
        <Text style={{textAlign:'center',fontSize:20,fontWeight:"bold",color:'white'}}>Submit</Text>
        )}
      </TouchableOpacity>
      </ScrollView>
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({

container:
{
    flex:1,
    paddingTop:Platform.OS==='android'?StatusBar.currentHeight:0,
    backgroundColor:'#DEE2ED',

},

auctionTitle:
{
    width:WIDTH-20,
    borderRadius:10,
    alignSelf:'center',
    marginTop:10,
    padding:12,
    backgroundColor:'#EEEFF3',
    marginBottom:3,
    
},

auctionTitleText:
{

    color:'gray',
    fontSize:16,
    opacity:0.8,
    fontWeight:'bold'
    
},
ImageContainer:{
    alignItems: 'center',
    backgroundColor: '#ccc',
    borderRadius: 15,
    height: 60,
    justifyContent: 'center',
    marginVertical: 10,
    overflow: 'hidden',
    width: 60,
}

})
