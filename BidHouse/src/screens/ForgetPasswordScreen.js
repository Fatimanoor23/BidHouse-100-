import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Platform,
  StatusBar,
  SafeAreaView,
  Alert,
  ActivityIndicator
} from "react-native";
import {resetPasswordApi} from "../apis/userApis/UserApis";

const HEIGHT = Dimensions.get("screen").height;
const WIDTH = Dimensions.get("screen").width;

function ForgetPasswordScreen({navigation}) {
  const [mail, setmail] = useState("");
  const [pass, setpass] = useState("");
  const [confirmpass,setconfirmpass] = useState("")
  const [hide, setHide] = useState(true);
  const [passHide,setPassHide] = useState(true)
  const [visible,setVisible] = useState(false)
   const managePasswordVisibility = () =>{
    setHide(!hide);
   }
   const manageConfirmPasswordVisibility = () =>{
    setPassHide(!passHide);
   }
   
    const handlePress = async () => {
      if (!mail) {
        Alert.alert('Email field is required.');
        
      }
  
      if (!pass) {
        Alert.alert('Password field is required.');
      }
      if(mail&&pass){
        if(pass == confirmpass){  
        if (pass.length >=7){
          setVisible(true)
          await resetPasswordApi(mail,pass).then((response)=>{
              console.log("response:",response)
              setVisible(false)
              if(response.message){
              setmail("");
              setpass("");
              setconfirmpass("")
              navigation.navigate('LoginScreen')
              }
          }).catch(e =>{
            console.log("error:",e)
          })
        }else{
          Alert.alert('Passwords length must be atleast 8');
        }
      }else{
        Alert.alert('Passwords are not Matching');
      }
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* <Image source={require("../../assets/logo.png")} style={styles.image} /> */}
    <View style={{marginTop:100}}>
      <Text style={styles.login}>
        Welcome to
        <Text style={{ ...styles.login, color: "#f77219" }}>
          {" "}
          e<Text style={{ ...styles.login, color: "#F76300" }}>Bid</Text>
          <Text style={{ ...styles.login, color: "#f77219" }}>Point</Text>
        </Text>
      </Text>
    </View>
      <Text style={{ ...styles.login, color: "#F76300",fontSize:30 }}>Reset Password</Text>

      <View style={{...styles.form,marginTop:'30%'}}>
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          placeholder="Email Address"
          value={mail}
          onChangeText={(text) => setmail(text)}
        />

        <View style={styles.passwordContainer}>
          <TextInput
            style={{
              ...styles.input,
              borderWidth: 0,
              padding: 0,
              width: "90%",
              // marginTop: 2,
            }}
            placeholder="Password"
            secureTextEntry={hide}
            keyboardType="default"
            value={pass}
            onChangeText={(text) => setpass(text)}
          />

          <TouchableOpacity onPress={()=>managePasswordVisibility()}>
            <AntDesign name={hide ? "eyeo" : "eye"} size={24} color="black" />
          </TouchableOpacity>
        </View>

        <View style={styles.passwordContainer}>
          <TextInput
            style={{
              ...styles.input,
              borderWidth: 0,
              padding: 0,
              width: "90%",
              // marginTop: 2,
            }}
            placeholder="Confirm Password"
            secureTextEntry={passHide}
            keyboardType="default"
            value={confirmpass}
            onChangeText={(text) => setconfirmpass(text)}
          />

          <TouchableOpacity onPress={()=>manageConfirmPasswordVisibility()}>
            <AntDesign name={passHide ? "eyeo" : "eye"} size={24} color="black" />
          </TouchableOpacity>
        </View>

          <LinearGradient
            colors={["#c54f00", "#F76300", "#fbc099"]}
            style={{
              borderRadius: 14,
              padding:16,
              marginTop: "10%",
              alignItems:'center'
            }}
          >
        {visible ? (
        <ActivityIndicator visible={visible} color="#fff" size="small" />
        ) : (
            <TouchableOpacity
            style={{width:'100%',alignItems:"center"}}
            onPress={()=>handlePress()}
            activeOpacity={0.9}
          >
            <Text
              style={{ color: "#ffffff", fontSize: 18, fontWeight: "bold" }}
            > Reset Password
            </Text>
            </TouchableOpacity>
        )}
          </LinearGradient>
      </View>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor:'#fff',
    flex:1
  },

  image: {
    height: HEIGHT / 8,
    width: WIDTH / 3.3,
    resizeMode: "contain",
    alignSelf: "center",
    marginTop: 30,
  },
  login: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#5B5B5B",
    alignSelf: "center",
    marginTop: 20,
  },
  input: {
    fontSize: 14,
    padding: 16 ,
    borderRadius: 14,
    borderColor: "#A3A4AA",
    borderWidth: 0.5,
    // marginTop: "6.5%",
  },
  form: {
    marginHorizontal: "5%",
    marginTop: "6%",
  },
  bottom: {
    justifyContent: "center",
    flexDirection: "row",
  },
  passwordContainer: {
    width: "100%",
    padding:14,
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: "#A3A4AA",
    paddingHorizontal: 20,
    marginTop: 20,
    borderWidth: 0.5,
  },
});


export default ForgetPasswordScreen;