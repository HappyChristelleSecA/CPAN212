
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCNU_Bu1k_Dr4U24kqJ1pMOAIGugW-vCxw",
    authDomain: "winter25-97e4c.firebaseapp.com",
    projectId: "winter25-97e4c",
    storageBucket: "winter25-97e4c.firebasestorage.app",
    messagingSenderId: "710898104112",
    appId: "1:710898104112:web:eedae37cc5414accc57af5"
  };
  

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);




