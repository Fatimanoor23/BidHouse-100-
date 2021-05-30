import React from 'react'
import {Alert} from 'react-native'
import {signIn,signUp,forgetPassword,profileInfo,editProfileInfo,logOut,allAccountsLogOut} from "../Config.json"

export const signInApi = async(email,password)=> {    
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    let raw = JSON.stringify({"email":email,"password":password});
    let requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    return fetch(signIn, requestOptions)
      .then(response => response.text())
      .then((result) => {
        let json = JSON.parse(result)
        console.log("result:",json)
        if (json.error == 'Invalid Password' || json.error == 'Invalid login credentials'){
          Alert.alert('Email/Password incorrect')
        }
        return json
       })
      .catch((error) => {console.log('error:', error)
       return error});
}

export const signUpApi = async(firstName,lastName,mobile,email,password)=> {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    console.log("inside api:",firstName,lastName,mobile,email,password)
    let raw = JSON.stringify({"first_name":firstName,"last_name":lastName,"mobile":mobile,"email":email,"password":password });
    let requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
   return fetch(signUp, requestOptions)
      .then(response => response.text())
      .then((result) => {
        let json = JSON.parse(result)
        console.log("result:",json)
        return json
       })
      .catch((error) => {console.log('error:', error)
       return error});
}

export const resetPasswordApi = async(email,password)=> {
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  let raw = JSON.stringify({"email":email,"password":password });
  let requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  
 return fetch(forgetPassword, requestOptions)
    .then(response => response.text())
    .then((result) => {
      console.log("result:",result)
      let json = JSON.parse(result)
      if (json.error){
        Alert.alert(json.error)
      }
      return json
     })
    .catch((error) => {console.log('error:', error)
     return error});
}

export const LogOutApi = async(authToken)=> {
  let myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${authToken}`);
  let requestOptions = {
    method: 'POST',
    headers: myHeaders,
    redirect: 'follow'
  };
  
  return fetch(logOut, requestOptions)
  .then(response => response.text())
  .then((result) => {
    console.log("result:",result)
    return result
   })
  .catch((error) => {console.log('error:', error)
   return error}); 
}

export const AllAccountsLogOutApi = async(authToken)=> {
  let myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${authToken}`);
  let requestOptions = {
    method: 'POST',
    headers: myHeaders,
    redirect: 'follow'
  };
  
  return fetch(allAccountsLogOut, requestOptions)
  .then(response => response.text())
  .then((result) => {
    console.log("result:",result)
    return result
   })
  .catch((error) => {console.log('error:', error)
   return error});
}

export const editProfileApi = async(authToken,firstName,lastName,email,mobile)=> {
  let myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${authToken}`);
  myHeaders.append("Content-Type", "application/json");

  let raw = JSON.stringify({"first_name":firstName,"last_name":lastName,"email":email,"mobile":mobile});

  let requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

  return fetch(editProfileInfo, requestOptions)
  .then(response => response.text())
  .then((result) => {
    let json = JSON.parse(result)
    console.log("result:",json)
    return json
   })
  .catch((error) => {console.log('error:', error)
   return error}); 
}

export const fetchProfileApi = async(authToken)=> {
  let myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${authToken}`);
  
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  return fetch(profileInfo, requestOptions)
  .then(response => response.text())
  .then((result) => {
    let json = JSON.parse(result)
    console.log("result:",json)
    return json
   })
  .catch((error) => {console.log('error:', error)
   return error});
}