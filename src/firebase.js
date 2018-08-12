import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyA33xqa6tmGwPH4gkT6-YsBJWM6qKL8-V0",
    authDomain: "myguestbook-f8e43.firebaseapp.com",
    databaseURL: "https://myguestbook-f8e43.firebaseio.com",
    projectId: "myguestbook-f8e43",
    storageBucket: "myguestbook-f8e43.appspot.com",
    messagingSenderId: "563880477285"
  };

firebase.initializeApp(config);

export const db = firebase.database();
export const friendsRef = db.ref('friends');