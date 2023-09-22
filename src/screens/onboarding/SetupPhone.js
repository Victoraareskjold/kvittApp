import React, { useState, useRef, useEffect } from "react";
import { Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from '@expo/vector-icons';

import Colors from "../../../Styles/Colors";
import FontStyles from "../../../Styles/FontStyles";
import ButtonStyles from "../../../Styles/ButtonStyles";
import ContainerStyles from "../../../Styles/ContainerStyles";

import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { firebaseConfig } from '../../../firebase';
import firebase from "firebase/compat/app";

export default function SetupPhone({ route, navigation }) {

    const [phoneNumber, setPhoneNumber] = useState('');
    const [confirmedPhoneNumber, setConfirmedPhoneNumber] = useState('');

    const [code, setCode] = useState('');
    const [verificationId, setVerificationId] = useState(null);
    const recaptchaVerifier = useRef(null); 
  
    const sendVerification = () => {
      const phoneProvider = new firebase.auth.PhoneAuthProvider(); 
      phoneProvider
          .verifyPhoneNumber(phoneNumber, recaptchaVerifier.current) 
          .then(setVerificationId);
      setConfirmedPhoneNumber(phoneNumber); // Lagre telefonnummer før du nullstiller det.
      setPhoneNumber(''); 
    };    
        
    const confirmCode = () => {
      const credential = firebase.auth.PhoneAuthProvider.credential(
        verificationId,
        code
      );
      firebase
        .auth()
        .signInWithCredential(credential)
        .then((userCredential) => {
          setCode('');
    
          const user = userCredential.user;
          const uid = user.uid;
          
          const { firstName, lastName } = route.params;
          
          firebase
            .firestore()
            .collection('users')
            .doc(uid)
            .set({
              firstName: firstName,
              lastName: lastName,
              phoneNumber: confirmedPhoneNumber // Oppdatert her
            })
            .then(() => {
              console.log('User added to Firestore');
            })
            .catch((error) => {
              console.error('Error adding user to Firestore: ', error);
            });
          
          navigation.navigate("SetupCode", {
            firstName: firstName,
            lastName: lastName,
            phoneNumber: confirmedPhoneNumber // Oppdatert her
          });
        })
        .catch((error) => {
          alert(error);
        });
    };    
  
      /* const verifyCodeAndContinue = () => {
        console.log('verificationId:', verificationId); // Logg verificationId
        console.log('verificationCode:', verificationCode); // Logg verificationCode
        console.log('auth:', auth); // Logg auth-objektet
        
        if(!verificationId || !verificationCode) {
          console.error('Either verificationId or verificationCode is undefined.');
          return; // Avslutt funksjonen hvis en av dem er undefined
        }
        
        const credential = PhoneAuthProvider.credential(
          verificationId,
          verificationCode
        );
        console.log('credential:', credential); // Logg credential-objektet
        
        auth
          .signInWithCredential(credential)
          .then((result) => {
            console.log('Successful signInWithCredential:', result); // Logg resultatet ved suksess
            // Navigate or do something with the result
          })
          .catch((error) => {
            console.error('Error during signInWithCredential:', error); // Logg feilen
            console.error('Detailed Error Info:', JSON.stringify(error)); // Logg detaljert feilinfo
          });
      };

    const storeDataAndContinue = () => {
        if (!phoneNumber) {
            setValidationMessage('Vennligst fyll ut telefonnummerfeltet');
            return;
        }
    
        // Data from the SetupName screen
        const { firstName, lastName } = route.params;
        
        navigation.navigate("SetupCode", {
            firstName: firstName,
            lastName: lastName,
            phoneNumber: phoneNumber
        });
    }; */    

    return (
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : '0'}
          style={[ContainerStyles.backgroundContainer, { paddingHorizontal: 24 }]}
        >
          <SafeAreaView style={{backgroundColor: Colors.white, flex: 1}}>

            <FirebaseRecaptchaVerifierModal 
              ref={recaptchaVerifier}
              firebaseConfig={firebaseConfig}
            />
      
            <Ionicons 
              name="chevron-back" 
              size={24} 
              color="black" 
              style={{marginBottom: 12}}
              onPress={() => navigation.goBack()}
            />
      
            <Text style={FontStyles.header}>
              Legg inn Telefonnummer
            </Text>
      
            <Text style={[FontStyles.body2, { marginBottom: 64 }]}>
              Skriv inn ditt telefonnummer
            </Text>
      
            <Text style={FontStyles.body2Fat}>Telefonnummer</Text>
            <TextInput 
              style={[ButtonStyles.defaultPlaceholder, { marginTop: 4}]}
              placeholder="+47 123 45 678"
              /* value={phoneNumber} */ // Sjekk at denne er korrekt initiert og oppdatert
              onChangeText={setPhoneNumber} // Sjekk at denne funksjonen er definert og oppdaterer tilstanden korrekt
              keyboardType="phone-pad"
              maxLength={15} // +47, 3 mellomrom, og 8 sifre
              autoComplete="tel"
            />

            <TextInput 
              style={[ButtonStyles.defaultPlaceholder, { marginTop: 4}]}
              placeholder="Confirm code"
              onChangeText={(text) => {
                setCode(text);
              }}
              keyboardType="phone-pad"
              maxLength={14} // +47, 3 mellomrom, og 8 sifre
              autoComplete="tel"
            />
      
            {/* Sjekk at denne View ikke blokkerer for TextInput over */}
            <View style={{ position: 'absolute', width: '100%', alignSelf: 'center', bottom: 12 }}>
              <TouchableOpacity 
                style={ButtonStyles.primaryBtn} 
                onPress={confirmCode} 
              >
                <Text style={FontStyles.bigBtn}>Bekreft kode</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={ButtonStyles.primaryBtn} 
                onPress={sendVerification} 
              >
                <Text style={FontStyles.bigBtn}>Send kode</Text>
              </TouchableOpacity>
            </View>
      
            {/* {!codeSent ? (
              <TouchableOpacity
                style={ButtonStyles.primaryBtn}
                onPress={sendVerificationCode}
              >
                <Text style={FontStyles.bigBtn}>Send kode</Text>
              </TouchableOpacity>
            ) : (
              <>
                <TextInput
                  style={ButtonStyles.defaultPlaceholder}
                  placeholder="Verifiseringskode"
                  value={verificationCode}
                  onChangeText={setVerificationCode}
                  keyboardType="number-pad"
                  maxLength={6}
                />
                <TouchableOpacity
                  style={ButtonStyles.primaryBtn}
                  onPress={verifyCodeAndContinue}
                >
                  <Text style={FontStyles.bigBtn}>Bekreft kode og gå videre</Text>
                </TouchableOpacity>
              </>
            )} */}
          </SafeAreaView>
        </KeyboardAvoidingView>
      );
}