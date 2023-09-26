import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

export const firebaseConfig = {
    apiKey: "AIzaSyAOo2Sy-RUXQ6Ka7Fd7T0pLzMfNzKjTQmU",
    authDomain: "kvittapp-51ecd.firebaseapp.com",
    projectId: "kvittapp-51ecd",
    storageBucket: "kvittapp-51ecd.appspot.com",
    messagingSenderId: "761636648550",
    appId: "1:761636648550:web:a2f4b25bd23e88853ddfa7",
    measurementId: "G-QZGMJQF71H"
};

export const uploadImage = async (uri) => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      const ref = firebase.storage().ref().child(`images/${new Date().getTime()}`);
      const uploadTask = ref.put(blob);
  
      return new Promise((resolve, reject) => {
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            // Vis fremdrift
          },
          (error) => {
            console.error('Error uploading image:', error);
            reject(error);
          },
          () => {
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
              console.log('File available at', downloadURL);
              resolve(downloadURL);
            });
          }
        );
      });
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error; // Throw error så du kan catche den der du kaller denne funksjonen.
    }
  };  

console.disableYellowBox= true;

if (!firebase.apps.length){
    firebase.initializeApp(firebaseConfig)
}

export const auth = firebase.auth();
export const db = firebase.firestore();
export const storage = firebase.storage();