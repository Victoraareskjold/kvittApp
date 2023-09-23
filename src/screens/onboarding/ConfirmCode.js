import React, { useState, useRef, useEffect } from "react";
import { Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from '@expo/vector-icons';

import { db } from "../../../firebase";
import { collection, addDoc, updateDoc } from 'firebase/firestore';
import firebase from "firebase/compat/app";
import { firebaseConfig } from '../../../firebase';

import * as SecureStore from 'expo-secure-store';

import Colors from "../../../Styles/Colors";
import FontStyles from "../../../Styles/FontStyles";
import ButtonStyles from "../../../Styles/ButtonStyles";
import ContainerStyles from "../../../Styles/ContainerStyles";

export default function ConfirmCode({ route, navigation }) {
    const [setupCode, setSetupCode] = useState(null);
    const [code, setCode] = useState(['', '', '', '']);
    const refs = [useRef(), useRef(), useRef(), useRef()];

    useEffect(() => {
        // Fokus på den første TextInput når komponenten lastes
        refs[0].current.focus();
    
        // Hente 4-sifret kode fra navigasjonsparametre
        if (route.params && route.params.code) {
            setSetupCode(route.params.code);  // Endret denne linjen
        }
    }, []);    

    const handleCodeChange = (text, index) => {
        const newCode = [...code];
        newCode[index] = text;

        if (text !== '') {
            // Fokus på neste TextInput hvis brukeren har skrevet inn et siffer
            if (index < 3) {
                refs[index + 1].current.focus();
            }
        } else {
            // Fokus på forrige TextInput hvis brukeren fjerner tekst
            if (index > 0) {
                refs[index - 1].current.focus();
            }
        }

        setCode(newCode);
    };

    // Denne funksjonen kaller du etter vellykket autentisering
    const storeUserToken = async () => {
        const userToken = "GENERERT_TOKEN"; // Dette er en forenkling. Du kan generere eller hente en mer kompleks token.
        const userId = firebase.auth().currentUser.uid; // Henter uid fra Firebase Auth
      
        // Lagre token i SecureStore
        await SecureStore.setItemAsync('userToken', userToken);
      
        // Lagre mapping av token til userId i Firebase
        const db = firebase.firestore();
        const tokenRef = db.collection('tokenToUserId');
      
        await tokenRef.add({
          token: userToken,
          userId: userId
        });
      };        

    /* oppdaterer database for å legge til kode */
    const storeCodeAndContinue = async () => {
        const enteredCode = code.join('');

        console.log("Entered Code:", enteredCode); // Debugging line
        console.log("Setup Code:", setupCode); // Debugging line
    
        if (enteredCode === setupCode) {
            try {
                const userDocRef = db.collection('users').doc(firebase.auth().currentUser.uid);
                
                // Oppdater dokumentet med den 4-sifrede koden
                await userDocRef.update({ code: enteredCode });

                // Lagre token i SecureStore
                await storeUserToken();
    
                navigation.navigate("FaceId");
            } catch (error) {
                console.error("Error updating document: ", error);
                alert('En feil oppsto ved oppdatering av dokumentet.');
            }
        } else {
            alert('Kodene skrevet er ikke like.');
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
                    Bekreft kode
                </Text>

                <Text style={[FontStyles.body2, { marginBottom: 32 }]}>
                    Skriv inn den 4-sifrede koden på nytt
                </Text>

                <View style={styles.codeInputContainer}>
                    {code.map((value, index) => (
                        <TextInput 
                            key={index}
                            style={styles.codeInput}
                            value={value}
                            onChangeText={(text) => handleCodeChange(text, index)}
                            keyboardType="number-pad"
                            maxLength={1}
                            ref={refs[index]}
                        />
                    ))}
                </View>

                <View style={{ position: 'absolute', width: '100%', alignSelf: 'center', bottom: 12 }}>
                    <TouchableOpacity 
                        style={ButtonStyles.primaryBtn} 
                        onPress={storeCodeAndContinue} 
                    >
                        <Text style={FontStyles.bigBtn}>Gå videre</Text>
                    </TouchableOpacity>
                </View>

            </SafeAreaView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    codeInputContainer: {
        alignSelf: 'center',
        width: 250,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    codeInput: {
        width: 48,
        height: 48,
        backgroundColor: Colors.grey,
        borderRadius: 50,
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
