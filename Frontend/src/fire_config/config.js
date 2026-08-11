// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getMessaging,getToken } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDWQBRRnoJdwD19BTln7dQQTlkVCNO9nEU",
  authDomain: "full-stack-71cb0.firebaseapp.com",
  projectId: "full-stack-71cb0",
  storageBucket: "full-stack-71cb0.firebasestorage.app",
  messagingSenderId: "503728088034",
  appId: "1:503728088034:web:bc820de155da9813ad0fbb",
  measurementId: "G-998BPWE3KB"
};


export const app = initializeApp(firebaseConfig);
export const messaging=getMessaging(app)

