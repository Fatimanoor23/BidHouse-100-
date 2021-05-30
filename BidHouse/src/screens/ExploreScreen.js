import React,{useState,useEffect} from 'react'
import {
    StyleSheet, Text, View, FlatList, Platform,
    TouchableOpacity, Image,
    StatusBar, Dimensions, Card,
    SafeAreaView,
    TouchableWithoutFeedback,
    ActivityIndicator
} from 'react-native'
import { useFocusEffect } from '@react-navigation/native';
import { TextInput } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import {fetchCurrentProductApi} from "../apis/productApis/productApis";
import {getUserId} from '../apis/LocalDB';
import { navigationRef } from '../navigations/rootNavigation';
import moment from 'moment';
const HEIGHT = Dimensions.get('screen').height;
const WIDTH = Dimensions.get('screen').width;

function ExploreScreen({ navigation }) {
  const [filter,setFilter]=useState(false)
  const [categorize, setCategory] = useState();
  const [categoryIndex, setCategoryIndex] = useState();
  const [products,setProducts] = useState([])
  const [visible,setVisible] = useState(true)
  const [customProducts,setCustomProducts] = useState([])
  const [searchBar, setSearchBar] = useState('');
  const [searchProducts,setSearchProducts] = useState([])
  
  const [Categories] = useState([
    'All',
    'Watches',
    'Glasses',
    'Rings',
    'Other'
  ])

  useFocusEffect(
    React.useCallback(() => {
    setCategory('All');
    getProducts();
  }, [])
  );
  
  const getProducts=async()=>{
    getUserId(async(user) => {
    console.log('userid',user)
    await fetchCurrentProductApi(user).then((response)=>{
        console.log("response:",response);
        setProducts(response)
        setVisible(false)
    }).catch((e)=>{
        console.log("error:",e)
        setVisible(false)
      })
    })
  }

  const renderCategoryItem = (item, index) => {
    return (
      <TouchableOpacity
        style={{marginTop:10}}
        onPress={() => {
          checkPressed(item)
          setCategoryIndex(index);
          setCategory(item);
        }}
        >
        <Text
          style={{
            alignItems: 'center',
            color: categorize == item ? '#F76300' : 'grey',
            marginHorizontal: 10,
            fontSize:16,
            marginHorizontal:20
          }}>
          {item}
        </Text>
      </TouchableOpacity>
    );
  };

  let checkPressed = (item) => {
    if(item == "All"){
      setCustomProducts(products)
      return
    }
    setFilter(true)
    console.log("item:",item)
    let array
        if(searchBar !== ""){
          array=[...searchProducts]
        }else{
          array=[...products]
        }
        array = array.filter(function (items) {
         return items.category.includes(item)
        })
      console.log("array filter by catagory :",array)
      setCustomProducts(array)
  }

  let onChangeText= (text) => {
    setSearchBar(text)
    let array=[]
    {filter ? array=[...customProducts] : array=[...products]}
      array = array.filter(function (item) {
      return item.title.includes(text)
      })
      console.log("array filter by search bar :",array)
      setSearchProducts(array)
  }

const renderItem = (item,index) => {
    const {imgCollection,title,description,submission_date,price} =item
    const date = new Date();
    let closingDate = moment(submission_date, "YYYY-MM-DD");
    let current = moment().startOf('day');
    let days = moment.duration(closingDate.diff(current)).asDays();
    let diffOfTime=moment.utc(moment(date).diff(moment(submission_date))).format("HH:mm:ss")
    return(
        <TouchableWithoutFeedback onPress={()=> navigation.navigate("ProductDetailScreen",{
          product:item,
          days:days>0 ? days + "days":diffOfTime,
        })}>
        <View style={[styles.cardView,styles.shadow]}>
            <Image source={{uri:"https://e-bit-point-apis.herokuapp.com/public/"+imgCollection[0]}} style={styles.cardImage} resizeMode={'stretch'}/>
            <View style={styles.description}>
                <View style={{...styles.row,justifyContent:'space-between'}}>
            <Text style={styles.productTitleText}>{title}</Text>
            <View style={[styles.bidView,styles.shadow]}>
                <View style={styles.row}>
                <Feather name="clock" size={18} color="#1b1a60" style={{marginLeft:5}}/>
                <Text style={styles.timeText}>{days>0 ? days + "days":diffOfTime}</Text>
                </View>
                <View style={{backgroundColor:'#1b1a60',padding:10}}>
                <Text style={{...styles.timeText,color:'white'}}>{price}</Text>
                </View>
                </View>

            </View>
            <Text style={styles.productdescriptionText} numberOfLines={2}>{description}</Text>
            </View>
        </View>
        </TouchableWithoutFeedback>
    )
}



    return (
        <SafeAreaView style={styles.container}>
            <View style={[styles.input,styles.shadow,styles.row]}>
            <Ionicons name="search-outline" size={24} color="black" style={{marginHorizontal:8}}/>           
             <TextInput
                style={styles.inputText}
                placeholder="Search"
                value={searchBar}
                onChangeText={(text)=>onChangeText(text)}
                >
            </TextInput>
            </View>
            <View style={{margin: 7}}>
            <FlatList
              data={Categories}
              renderItem={({item, index}) => renderCategoryItem(item, index)}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item,index) => index.toString()}
            />
          </View>
          {visible ? (
          <ActivityIndicator visible={visible} color="#F76300" size="large" />
          ) : (
         ((searchBar !== "" && searchProducts.length <= 0) || products.length <= 0 || ((customProducts <= 0) && filter)) ?
          <View style={{alignSelf:'center'}}>
          <Text style={{fontSize:20}}>No data found</Text>
          </View>
          :
            <View style={{margin:15,marginBottom:'30%'}}>
            <FlatList
            showsVerticalScrollIndicator={false}
            data={searchBar !== "" ? searchProducts : (filter ? customProducts : products)}
            renderItem={({item,index})=>renderItem(item,index)}
            extraData={searchBar !== "" ? searchProducts : (filter ? customProducts : products)}
            keyExtractor={(item,index) => index.toString()}
            />
            </View>  
        )}
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        backgroundColor:'#fff'
    },
    input: {
        borderRadius: 12,
        width: WIDTH*0.9,
        paddingVertical: 8,
        marginTop:30,
        marginHorizontal:20
    },
    inputText: {
        borderRadius: 10,
        width: WIDTH*0.8,
        fontSize:14
    },
    shadow:{
        shadowColor:'grey',
        shadowOffset:{width:0,height:1},
        shadowOpacity:0.8,
        shadowRadius:3,
        elevation:2,
        backgroundColor:'white'
    },
    row:{
        flexDirection:'row',
        alignItems:'center'
    },
    cardImage:{
        height:HEIGHT*0.2,
        width:WIDTH-35,
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
        alignSelf:'center',
        backgroundColor:'grey'
    },
    cardView:{
        borderRadius:20,
        marginVertical:10,
        backgroundColor:'#fff',
    },
    description:{
        justifyContent:'space-between',
        padding:10,
        paddingVertical:15
    },
    bidView:{
        flexDirection:'row',
        marginTop:-40,
        borderRadius:10
        // paddingVertical:10,
        // paddingHorizontal:5
    },
    productTitleText:{
        fontSize:18,
        fontWeight:'bold',
        color:'#F76300'
    },
    productdescriptionText:{
        fontSize:15,
        color:'grey',
        marginTop:5
    },
    timeText:{
        fontSize:13,
        color:"#1b1a60",
        fontWeight:'bold',
        letterSpacing:1,
        padding:3,
        paddingHorizontal:7,
    }

})

export default ExploreScreen;