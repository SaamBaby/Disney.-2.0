import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBvApAO4x1ivtTQ3YQ0wv8_F2B4HPp2Hg0",
  authDomain: "disney-plus-2.firebaseapp.com",
  projectId: "disney-plus-2",
  storageBucket: "disney-plus-2.appspot.com",
  messagingSenderId: "289298720482",
  appId: "1:289298720482:web:e0106c8f1f3bbddd80e0bb",
};
const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();
export { db };
