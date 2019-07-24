import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyB2N4JJ0D7kIfAWJXLWTk3DZrVjY_CkVIY",
    authDomain: "csevego88.firebaseapp.com",
    databaseURL: "https://csevego88.firebaseio.com",
    projectId: "csevego88",
    storageBucket: "",
    messagingSenderId: "442238647109",
    appID: "1:442238647109:web:426931d0fe0412db",
  };

  firebase.initializeApp(firebaseConfig);

  export const auth = firebase.auth();
  export default firebase;