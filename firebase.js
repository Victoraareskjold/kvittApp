import { initializeApp, getApps } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { ReactNativeAsyncStorage } from '@react-native-async-storage/async-storage';
import { getFirestore } from "firebase/firestore";

export const firebaseConfig = {
    apiKey: "AIzaSyAOo2Sy-RUXQ6Ka7Fd7T0pLzMfNzKjTQmU",
    authDomain: "kvittapp-51ecd.firebaseapp.com",
    projectId: "kvittapp-51ecd",
    storageBucket: "kvittapp-51ecd.appspot.com",
    messagingSenderId: "761636648550",
    appId: "1:761636648550:web:a2f4b25bd23e88853ddfa7",
    measurementId: "G-QZGMJQF71H"
};

let app;
let auth;
let db;

// Check if Firebase app is already initialized
if (!getApps().length) {
    app = initializeApp(firebaseConfig);
    auth = initializeAuth(app, {
        persistence: getReactNativePersistence(ReactNativeAsyncStorage)
    });
    db = getFirestore(app);
} else {
    app = getApps()[0]; // use the already initialized app
    auth = getAuth(app);
    db = getFirestore(app);
}

export { 
    auth,
    db
};
