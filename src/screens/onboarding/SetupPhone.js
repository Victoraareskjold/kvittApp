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

        <Text style={FontStyles.header}>Legg inn Telefonnummer</Text>
        <Text style={[FontStyles.body2, { marginBottom: 64 }]}>Skriv inn ditt telefonnummer</Text>

        {!codeSent ? (
          <>
            <TextInput
              style={ButtonStyles.defaultPlaceholder}
              placeholder="123 45 678"
              keyboardType="phone-pad"
              onChangeText={(text) => setPhoneNumber(formatPhoneNumber(text))}
              value={phoneNumber}
              autoComplete="tel"
              maxLength={10}
            />
            <TouchableOpacity style={ButtonStyles.primaryBtn} onPress={sendVerification}>
              <Text style={FontStyles.bigBtn}>Send kode</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TextInput
              style={ButtonStyles.defaultPlaceholder}
              placeholder="6 Siffer"
              keyboardType="number-pad"
              onChangeText={setCode}
              value={code}
              maxLength={6}
            />
            <TouchableOpacity style={ButtonStyles.primaryBtn} onPress={confirmCode}>
              <Text style={FontStyles.bigBtn}>Bekreft kode</Text>
            </TouchableOpacity>
          </>
        )}
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
