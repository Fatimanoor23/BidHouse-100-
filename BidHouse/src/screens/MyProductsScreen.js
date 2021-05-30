import React, { useState } from 'react';
import {View,ActivityIndicator, Text, SafeAreaView, StyleSheet,FlatList,Dimensions,Image,TouchableOpacity} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import {Ionicons} from '@expo/vector-icons'
import Header from '../components/Header'
import {fetchUserProductApi} from "../apis/productApis/productApis";
import {getUserId} from '../apis/LocalDB';
import moment from 'moment';

function MyProductsScreen({ navigation }){
    const [userProduct,setUserProduct]=useState();    
    const [visible,setVisible] = useState(true)

    useFocusEffect(
        React.useCallback(() => {
        getUserProduct()
        }, [])
    );
    
    const getUserProduct=async()=>{
        getUserId(async(user) => {
        console.log('userid',user)
        await fetchUserProductApi(user).then((response)=>{
           console.log("response:",response.length);
           setUserProduct(response)
           setVisible(false)
        }).catch((e)=>{
           console.log("error:",e)
           setVisible(false)
        })
        }).catch(error => {
            console.log("error:",error)
        })
    }
    
    return(
        <SafeAreaView>
        <Header text = "My Products" navigation={navigation} drawer={true}/>
        <View style={styles.container}>
            <View style={{margin:10}}>
            <Text style={styles.heading}>My Products</Text>
            </View>
        </View>    
        {visible ? (
          <ActivityIndicator visible={visible} color="#F76300" size="large" />
          ) : ( userProduct.length <= 0  ?
          <View style={{alignSelf:'center'}}>
          <Text style={{fontSize:20}}>No data found</Text>
          </View>
          :
            <FlatList
                data={userProduct}
                style={{marginBottom:125}}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) =>{
                const {imgCollection,title,description,submission_date}=item
                const date = new Date();
                let closingDate = moment(submission_date, "YYYY-MM-DD");
                let current = moment().startOf('day');
                let days = moment.duration(closingDate.diff(current)).asDays();
                let diffOfTime=moment.utc(moment(date).diff(moment(submission_date))).format("HH:mm:ss")
                
                return (
                <TouchableOpacity onPress={()=> navigation.navigate("BidsScreen",{
                    product:item,
                    days: days>0 ? days + "days":diffOfTime
                })}
                style={{flexDirection:"row",justifyContent:"space-between",marginHorizontal:'5%', marginVertical:20,alignItems:'center'}}>
                <View style={{flexDirection:"row",alignItems:'center'}}>

                <Image key={index} source={{uri:"https://e-bit-point-apis.herokuapp.com/public/"+imgCollection[0]}} style={{height:80,width:'35%',borderRadius:15}} />

                <View style={{marginLeft:'4%',width:"44%"}}> 
                <Text style={{color:"#1b1a60",fontSize:15,fontWeight:"bold"}}>{title}</Text>
                <Text style={{color:"grey",fontSize:13,marginTop:5}}>{description}</Text>
                </View>
                </View>
                <View style={{backgroundColor:"#F76300" ,justifyContent:"center",alignItems:"center",borderRadius:10,padding:10,width:'17%'}}>
                <Text style={{color:'#fff',fontWeight:'bold',fontSize:13}}>{item.price}</Text>
                </View>
                </TouchableOpacity>
                )
                }}
        />
        )}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
marginHorizontal:"5%"        
    },
topHeading:{
    marginTop:"5%",
    justifyContent:"center",
},
heading:
{
    color:"#f76300",
    fontSize:22,
    fontWeight:"bold",
   
},
list:{
marginBottom:10
}    

});

export default MyProductsScreen;