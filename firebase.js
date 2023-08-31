// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAOo2Sy-RUXQ6Ka7Fd7T0pLzMfNzKjTQmU",
  authDomain: "kvittapp-51ecd.firebaseapp.com",
  projectId: "kvittapp-51ecd",
  storageBucket: "kvittapp-51ecd.appspot.com",
  messagingSenderId: "761636648550",
  appId: "1:761636648550:web:a2f4b25bd23e88853ddfa7",
  measurementId: "G-QZGMJQF71H"
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app()
}

const auth = firebase.auth()

export { auth };