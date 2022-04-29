// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import firebase from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration

const firebaseConfig = {
    apiKey: "AIzaSyAdOPaE_pyww3OkoD_WfVbhM3MSSP_obMw",
    authDomain: "vrms-1fa68.firebaseapp.com",
    databaseURL: "https://vrms-1fa68-default-rtdb.firebaseio.com",
    projectId: "vrms-1fa68",
    storageBucket: "vrms-1fa68.appspot.com",
    messagingSenderId: "303714734275",
    appId: "1:303714734275:web:e0ba62b777da134efd5276"
};

// Initialize Firebase
// @ts-ignore
export const app = firebase || !firebase?.getApps().length ? initializeApp(firebaseConfig) : firebase.getApps()[0];