import { initializeApp } from 'firebase/app';
import { getAuth} from "firebase/auth";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig ={
    apiKey: "AIzaSyCGRPGN1zY2Qag2OmA1T7z5sw_KBe3-ssY",
    authDomain: "survey-c29f6.firebaseapp.com",
    projectId: "survey-c29f6",
    storageBucket: "survey-c29f6.appspot.com",
    messagingSenderId: "376469694892",
    appId: "1:376469694892:web:08c44ee278c4b488617209",
    measurementId: "G-BHJXH5CLCB"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db }