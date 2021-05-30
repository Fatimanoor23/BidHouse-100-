import {apiUrl,uploadBid,fetchUserAllBids} from "../Config.json"

export const uploadBidApi = async(authToken,productId,bid)=> {
    let myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${authToken}`);
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({"bid":bid,"product_id":productId});
    
    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    return fetch(uploadBid, requestOptions)
      .then(response => response.text())
      .then((result) => { 
        let json = JSON.parse(result)
        console.log("result:",json)
        return json
       })
      .catch((error) => {console.log('error:', error)
       return error});
}

export const fetchUserBidsApi = async(authToken)=> {
    let myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${authToken}`);
    myHeaders.append("Content-Type", "application/json");

    let requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(fetchUserAllBids, requestOptions)
      .then(response => response.text())
      .then((result) =>{ 
      let json = JSON.parse(result)
      console.log("result:",json)
      return json
       })
      .catch((error) => {console.log('error:', error)
       return error});
}

export const fetchAllBidsofProductApi = async(authToken,id)=> {
    let myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${authToken}`);
    myHeaders.append("Content-Type", "application/json");

    let requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

   return fetch(apiUrl+id+"/bids", requestOptions)
      .then(response => response.text())
      .then((result) => {
        console.log("result:",result)  
        let json = JSON.parse(result)
        return json
       })
      .catch((error) => {console.log('error:', error)
       return error});
}