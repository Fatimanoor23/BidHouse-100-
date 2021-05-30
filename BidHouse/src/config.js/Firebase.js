
import * as firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyCqG8TPSDSp_l3focrnApMvqtYgrEChbbw",
    authDomain: "ebidpoint.firebaseapp.com",
    projectId: "ebidpoint",
    storageBucket: "ebidpoint.appspot.com",
    messagingSenderId: "470388713262",
    appId: "1:470388713262:web:d375a876470787273c7cbf",
    measurementId: "G-YP4M5GJ9X3"
  };
  // Initialize Firebase
  
  let firebase=firebase.initializeApp(firebaseConfig);
  export default firebase
