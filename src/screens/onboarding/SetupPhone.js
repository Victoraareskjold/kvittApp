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

    const [codeSent, setCodeSent] = useState(false);
    const [code, setCode] = useState('');
    const [verificationId, setVerificationId] = useState(null);
    const recaptchaVerifier = useRef(null); 
  
    const sendVerification = () => {
      const phoneProvider = new firebase.auth.PhoneAuthProvider(); 
      phoneProvider
          .verifyPhoneNumber(phoneNumber, recaptchaVerifier.current) 
          .then
            (setVerificationId);
            setCodeSent(true);
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

    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : '0'}
        style={[ContainerStyles.backgroundContainer, { paddingHorizontal: 24 }]}
      >
        <SafeAreaView style={{ backgroundColor: Colors.white, flex: 1 }}>
          <FirebaseRecaptchaVerifierModal ref={recaptchaVerifier} firebaseConfig={firebaseConfig} />
          <Ionicons name="chevron-back" size={24} color="black" style={{ marginBottom: 12 }} onPress={() => navigation.goBack()} />
  
          <Text style={FontStyles.header}>Legg inn Telefonnummer</Text>
          <Text style={[FontStyles.body2, { marginBottom: 64 }]}>Skriv inn ditt telefonnummer</Text>
  
          {!codeSent ? (
            <>
              <TextInput
                style={ButtonStyles.defaultPlaceholder}
                placeholder="+47 123 45 678"
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
                autoComplete="tel"
              />
              <TouchableOpacity style={ButtonStyles.primaryBtn} onPress={sendVerification}>
                <Text style={FontStyles.bigBtn}>Send kode</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TextInput
                style={ButtonStyles.defaultPlaceholder}
                placeholder="Verifiseringskode"
                onChangeText={(text) => {
                  setCode(text);
                }}
                keyboardType="number-pad"
              />
              <TouchableOpacity style={ButtonStyles.primaryBtn} onPress={confirmCode}>
                <Text style={FontStyles.bigBtn}>Bekreft kode og gå videre</Text>
              </TouchableOpacity>
            </>
          )}
        </SafeAreaView>
      </KeyboardAvoidingView>
    );
  }