import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

export const firebaseConfig = {
    apiKey: "AIzaSyAOo2Sy-RUXQ6Ka7Fd7T0pLzMfNzKjTQmU",
    authDomain: "kvittapp-51ecd.firebaseapp.com",
    projectId: "kvittapp-51ecd",
    storageBucket: "kvittapp-51ecd.appspot.com",
    messagingSenderId: "761636648550",
    appId: "1:761636648550:web:a2f4b25bd23e88853ddfa7",
    measurementId: "G-QZGMJQF71H"
};

console.disableYellowBox= true;

if (!firebase.apps.length){
    firebase.initializeApp(firebaseConfig)
}

export const auth = firebase.auth();
export const db = firebase.firestore();