import { initializeApp } from "firebase/app";
//import { getDatabase } from "firebase/database";
import { getDatabase, ref} from "firebase/database";
import {remove } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyArr_MlmDlhqA5wn3oeFbTlAgKc1hsWq_Q",
    authDomain: "react-contacts-9a87e.firebaseapp.com",
    projectId: "react-contacts-9a87e",
    storageBucket: "react-contacts-9a87e.appspot.com",
    messagingSenderId: "309596835914",
    appId: "1:309596835914:web:4f13f36cdd3b1c852996b3"
};

const app = initializeApp(firebaseConfig);
export const fireDB = getDatabase(app);

