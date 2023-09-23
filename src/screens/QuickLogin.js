import React, { useEffect } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import * as SecureStore from 'expo-secure-store';

export default function QuickLoginScreen({ navigation }) {
  const [code, setCode] = React.useState('');
  const [userId, setUserId] = React.useState(null);

  useEffect(() => {
    const getUserByToken = async () => {
        const storedToken = await SecureStore.getItemAsync('userToken');
        
        if (storedToken) {
            const db = firebase.firestore();
            const tokenRef = db.collection('tokenToUserId');
            
            const snapshot = await tokenRef.where('token', '==', storedToken).get();
            if (!snapshot.empty) {
                const doc = snapshot.docs[0];
                setUserId(doc.data().userId);
            }
        }
    };
    
    getUserByToken();
}, []);

  const handleLogin = async () => {
    console.log("Handle login called."); // Debugging line
    if (!userId) {
      console.log("User ID is not set."); // Debugging line
      return;
    }
  
    const db = firebase.firestore();
    const userRef = db.collection('users').doc(userId);
  
    try {
      const doc = await userRef.get();
      if (doc.exists) {
        const userData = doc.data();
        const storedCode = userData.code;
        console.log("Stored Code:", storedCode); // Debugging line
        if (storedCode === code) {
          navigation.navigate('HomeScreen');
        } else {
          Alert.alert("Feil", "Koden er ikke korrekt.");
        }
      } else {
        Alert.alert("Feil", "Dokumentet finnes ikke.");
      }
    } catch (error) {
      console.error("Error during login:", error); // Debugging line
      Alert.alert("Feil", "Noe gikk galt ved innlogging.");
    }
  };
  

  return (
    <View>
      <Text>Angi din 4-sifrede kode</Text>
      <TextInput 
        value={code} 
        onChangeText={setCode} 
        keyboardType="numeric" 
        maxLength={4} 
      />
      <Button title="Logg inn" onPress={handleLogin} />
    </View>
  );
}
