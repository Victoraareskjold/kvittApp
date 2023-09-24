import React, { useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, KeyboardAvoidingView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import firebase from 'firebase/compat/app';
import { db, auth } from '../../firebase'
import 'firebase/compat/firestore';
import * as SecureStore from 'expo-secure-store';

import ContainerStyles from '../../Styles/ContainerStyles';
import Colors from '../../Styles/Colors';
import FontStyles from '../../Styles/FontStyles';

export default function QuickLoginScreen({ navigation }) {
  const [code, setCode] = React.useState('');
  const [userId, setUserId] = React.useState(null);

  useEffect(() => {
    const getUserByToken = async () => {
        const storedToken = await SecureStore.getItemAsync('userToken');
        
        if (storedToken) {
            const db = firebase.firestore();
            const userRef = db.collection('users');
            
            const snapshot = await userRef.where('token', '==', storedToken).get();
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
    <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : '0'}
            style={[ContainerStyles.backgroundContainer, { paddingHorizontal: 24 }]}
        >
            <SafeAreaView style={{backgroundColor: Colors.white, flex: 1}}>

                <Ionicons 
                    name="chevron-back" 
                    size={24} 
                    color="black" 
                    style={{marginBottom: 12}}
                    onPress={() => navigation.goBack()}
                />

                <Text style={FontStyles.header}>
                    Logg inn
                </Text>

                <Text style={[FontStyles.body2, { marginBottom: 32 }]}>
                    Skriv inn en 4-sifret kode
                </Text>
                <TextInput 
                    value={code} 
                    onChangeText={setCode} 
                    keyboardType="numeric" 
                    maxLength={4} 
                />
                <Button title="Logg inn" onPress={handleLogin} />
            </SafeAreaView>
        </KeyboardAvoidingView>
  );
}
