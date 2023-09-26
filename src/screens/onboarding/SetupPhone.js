import React, { useState, useEffect, useRef } from "react";
import { Text, View, TouchableOpacity, TextInput, Alert, Platform, KeyboardAvoidingView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from '@expo/vector-icons';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import firebase from "firebase/compat/app";

import Colors from "../../../Styles/Colors";
import FontStyles from "../../../Styles/FontStyles";
import ButtonStyles from "../../../Styles/ButtonStyles";
import ContainerStyles from "../../../Styles/ContainerStyles";
import { firebaseConfig } from '../../../firebase';

export default function SetupPhone({ navigation, route }) {

  const [phoneNumber, setPhoneNumber] = useState('');
  const [fullPhoneNumber, setFullPhoneNumber] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [code, setCode] = useState('');
  const recaptchaVerifier = useRef(null);
  const [verificationId, setVerificationId] = useState('');

  const phoneNumberRef = useRef(null);
  const codeRef = useRef(null);

  /* Focus on load */
  useEffect(() => {
    if (phoneNumberRef.current) {
      phoneNumberRef.current.focus();
    }
  }, []); // En tom avhengighetsarray for å kjøre kun ved montering

  /* Focus on isCodeSent */
  useEffect(() => {
    if (codeSent) {
      if (codeRef.current) {
        codeRef.current.focus(); // Fokuser på 6-sifret kode TextInput når codeSent er true
      }
    } else if (phoneNumberRef.current) {
      phoneNumberRef.current.focus(); // Fokuser på telefonnummer TextInput når komponenten er montert, og codeSent er false
    }
  }, [codeSent]); // codeSent som avhengighet, slik at hook kjøres når codeSent endrer seg

  useEffect(() => {
    const cleanedPhoneNumber = phoneNumber.replace(/[^\d]/g, '');
    if (cleanedPhoneNumber.length === 8) setFullPhoneNumber('+47' + cleanedPhoneNumber);
  }, [phoneNumber]);

  useEffect(() => {
    console.log('Full Phone Number:', fullPhoneNumber);
  }, [fullPhoneNumber]);

  const formatPhoneNumber = (number) => {
    let cleaned = number.replace(/[^\d]/g, ''); 
    if (cleaned.length > 3 && cleaned.length <= 6) cleaned = cleaned.replace(/(\d{3})(\d{1,3})/, '$1 $2');
    else if (cleaned.length > 6) cleaned = cleaned.replace(/(\d{3})(\d{2})(\d{3})/, '$1 $2 $3');
    return cleaned;
  };

  const sendVerification = async () => {
    const cleanedPhoneNumber = phoneNumber.replace(/[^\d]/g, ''); // Renser telefonnummeret for å fjerne alle ikke-numeriske tegn
    if (cleanedPhoneNumber.length !== 8) return Alert.alert('Feil', 'Ugyldig telefonnummer');
  
    const constructedFullPhoneNumber = '+47' + cleanedPhoneNumber;
  
    try {
      const phoneProvider = new firebase.auth.PhoneAuthProvider();
      const id = await phoneProvider.verifyPhoneNumber(constructedFullPhoneNumber, recaptchaVerifier.current);
      setVerificationId(id);
      setCodeSent(true);
      setFullPhoneNumber(constructedFullPhoneNumber);
    } catch (error) {
      console.error('Error sending verification code: ', error);
      Alert.alert('Feil', 'En feil oppsto ved sending av verifiseringskode.');
    }
  };  

  const confirmCode = async () => {
    if (code.length === 0) return Alert.alert('Feil', 'Vennligst skriv inn verifiseringskoden du mottok.');

    try {
      const credential = firebase.auth.PhoneAuthProvider.credential(verificationId, code);
      const { user } = await firebase.auth().signInWithCredential(credential);
      const { firstName, lastName } = route.params;

      await firebase.firestore().collection('users').doc(user.uid).set({
        firstName,
        lastName,
        phoneNumber: fullPhoneNumber
      });

      navigation.navigate("SetupCode", { firstName, lastName, phoneNumber: fullPhoneNumber });
    } catch (error) {
      console.error('Error confirming code: ', error);
      Alert.alert('Feil', 'En feil oppsto. Vennligst prøv igjen senere.');
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : '0'} style={[ContainerStyles.backgroundContainer, { paddingHorizontal: 24 }]}>
      <SafeAreaView style={{ backgroundColor: Colors.white, flex: 1 }}>
        <FirebaseRecaptchaVerifierModal ref={recaptchaVerifier} firebaseConfig={firebaseConfig} />
        <Ionicons name="chevron-back" size={24} color="black" onPress={() => navigation.goBack()} />

        <Text style={FontStyles.header}>Bekreft din identitet! 📱</Text>
        <Text style={[FontStyles.body2, { marginBottom: 64 }]}>For å sikre din konto og bekrefte din identitet, trenger vi å verifisere ditt telefonnummer. </Text>
        
        <Text style={FontStyles.body2Fat}>Mobilnummer</Text>
        <TextInput
          ref={phoneNumberRef}
          style={[ButtonStyles.defaultPlaceholder, { marginTop: 4 }]}
          placeholder="123 45 678"
          keyboardType="phone-pad"
          maxLength={10}
          value={phoneNumber}
          onChangeText={(text) => setPhoneNumber(formatPhoneNumber(text))}
          autoComplete="tel"
          editable={!codeSent} // Make uneditable when codeSent is true
        />
        
        {codeSent && (
          <>
            <Text style={FontStyles.body2Fat}>6-sifret kode</Text>
            <TextInput
              ref={codeRef}
              placeholder="Mottat på SMS"
              maxLength={6}
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              value={code}
              onChangeText={setCode}
              style={[ButtonStyles.defaultPlaceholder, { marginTop: 4 }]}
            />
          </>
        )}
        
        <TouchableOpacity
          onPress={codeSent ? confirmCode : sendVerification}
          style={[ButtonStyles.primaryBtn, { position: 'absolute', bottom: 12}]}
        >
          <Text style={FontStyles.bigBtn}>{codeSent ? 'Bekreft kode' : 'Send kode'}</Text>
        </TouchableOpacity>
        
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
