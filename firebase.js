import { initializeApp } from 'firebase/app'
import { getAuth, onAuthStateChanged, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { ReactNativeAsyncStorage } from '@react-native-async-storage/async-storage'
import { getFirestore } from "firebase/firestore"

export const firebaseConfig = {
    apiKey: "AIzaSyAOo2Sy-RUXQ6Ka7Fd7T0pLzMfNzKjTQmU",
    authDomain: "kvittapp-51ecd.firebaseapp.com",
    projectId: "kvittapp-51ecd",
    storageBucket: "kvittapp-51ecd.appspot.com",
    messagingSenderId: "761636648550",
    appId: "1:761636648550:web:a2f4b25bd23e88853ddfa7",
    measurementId: "G-QZGMJQF71H"
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
const db = getFirestore();

export { 
    auth,
    db
};
