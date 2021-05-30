import {lastMessages,getmessages,messages} from "../Config.json"

export const lastMessagesApi = async(authToken)=> {   
    let myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${authToken}`);

    let requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };

  return fetch(lastMessages, requestOptions)
  .then(response => response.text())
    .then((result) => {
    let json = JSON.parse(result)
    console.log("result:",json)
    return json
    })
    .catch((error) => {console.log('error:', error)
    return error});      
}

export const getMessagesApi = async(authToken,receiver_id)=> {  
    let myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${authToken}`);
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({"receiver_id":receiver_id});

    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

  return fetch(getmessages, requestOptions)
  .then(response => response.text())
  .then((result) => {
  let json = JSON.parse(result)
  console.log("result:",json)
  return json
  })
  .catch((error) => {console.log('error:', error)
  return error});
}

export const sendMessageApi = async(authToken,receiver_id,message)=> {
    let myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${authToken}`);
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({"receiver_id":receiver_id,"message":message});

    let requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    return fetch(messages, requestOptions)
    .then(response => response.text())
      .then((result) => {
        let json = JSON.parse(result)
        console.log("result:",json)
        return json
       })
      .catch((error) => {console.log('error:', error)
       return error});
}