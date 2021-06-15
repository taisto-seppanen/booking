import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCQd3zfwIV8iD4lLy2gPyaanIPRZjYQq6M",
  authDomain: "cinimabooking.firebaseapp.com",
  databaseURL:
    "https://cinimabooking-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "cinimabooking",
  storageBucket: "cinimabooking.appspot.com",
  messagingSenderId: "398567165285",
  appId: "1:398567165285:web:668aa2d9bb91b1a9b0658c",
  measurementId: "G-LNV3P4JFKS"
};

let app = null;

if (!firebase.apps.length) {
  app = firebase.initializeApp(firebaseConfig);
}

export default firebase;
