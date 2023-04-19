// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCzO_Zhs3Wp8HY2eBMPID556bJlUDGNZXc",
  authDomain: "csce-315-project-3-81fa9.firebaseapp.com",
  projectId: "csce-315-project-3-81fa9",
  storageBucket: "csce-315-project-3-81fa9.appspot.com",
  messagingSenderId: "840556112030",
  appId: "1:840556112030:web:95ae9586ab43d8faf9738f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);