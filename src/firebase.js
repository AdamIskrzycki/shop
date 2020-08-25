import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage"

var firebaseConfig = {
  apiKey: "AIzaSyBicaRbaMp_gYwIGj5eB9nwyeXGZbDCZsw",
  authDomain: "shop-308e8.firebaseapp.com",
  databaseURL: "https://shop-308e8.firebaseio.com",
  projectId: "shop-308e8",
  storageBucket: "shop-308e8.appspot.com",
  messagingSenderId: "992445087980",
  appId: "1:992445087980:web:7ed036f056fa31fbe625c9",
  measurementId: "G-Z6RCJK8JEP",
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export const storage = firebase.storage();

export default firebase;
