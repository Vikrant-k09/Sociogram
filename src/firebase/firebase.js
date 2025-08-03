// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';





const firebaseConfig = {
  apiKey: "AIzaSyCHzZ7CZWACDD64IBahweVKa17_v0VCn8M",
  authDomain: "instaclone-54eae.firebaseapp.com",
  projectId: "instaclone-54eae",
  storageBucket: "instaclone-54eae.appspot.com",
  messagingSenderId: "297630674302",
  appId: "1:297630674302:web:34fa1f16ccfdb8f6b3d72f",
  measurementId: "G-GW8QC3K3JT"
};

const app = initializeApp(firebaseConfig);
const auth  = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export {app,auth, firestore, storage};
