import { StyleSheet, Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, Image, Alert } from "react-native";
import React from "react";
import { useState, useRef, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import Colors from "../../Styles/Colors";
import FontStyles from "../../Styles/FontStyles";
import ButtonStyles from "../../Styles/ButtonStyles";
import ContainerStyles from "../../Styles/ContainerStyles";
import { Ionicons } from '@expo/vector-icons';

import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import firebase from "firebase/compat/app";
import { firebaseConfig } from '../../firebase'; 

export default function LoginScreen({ navigation }) {

    const [phoneNumber, setPhoneNumber] = useState('');
    const [code, setCode] = useState('');
    const [codeSent, setCodeSent] = useState(false);
    const [verificationId, setVerificationId] = useState('');
    const recaptchaVerifier = useRef(null);
    const [fullPhoneNumber, setFullPhoneNumber] = useState('');

    useEffect(() => {
        const cleanedPhoneNumber = phoneNumber.replace(/[^\d]/g, '');
        if (cleanedPhoneNumber.length === 8) setFullPhoneNumber('+47' + cleanedPhoneNumber);
    }, [phoneNumber]);    
    
    const formatPhoneNumber = (number) => {
        let cleaned = number.replace(/[^\d]/g, '');
        if (cleaned.length > 3 && cleaned.length <= 6) cleaned = cleaned.replace(/(\d{3})(\d{1,3})/, '$1 $2');
        else if (cleaned.length > 6) cleaned = cleaned.replace(/(\d{3})(\d{2})(\d{3})/, '$1 $2 $3');
        return cleaned;
    };
    
    const sendVerification = async () => {
        try {
            if (!fullPhoneNumber) return Alert.alert('Feil', 'Ugyldig telefonnummer');
    
            const userRef = firebase.firestore().collection('users');
            const snapshot = await userRef.where('phoneNumber', '==', fullPhoneNumber).get();
    
            if (snapshot.empty) {
                return Alert.alert('Feil', 'Dette nummeret er ikke registrert i vår database.');
            }
    
            const phoneProvider = new firebase.auth.PhoneAuthProvider();
            const id = await phoneProvider.verifyPhoneNumber(fullPhoneNumber, recaptchaVerifier.current);
            setVerificationId(id);
            setCodeSent(true);
        } catch (error) {
            console.error('Error sending verification code: ', error);
            Alert.alert('Feil', 'En feil oppsto ved sending av verifiseringskode.');
        }
    };  
    
    const confirmCode = async () => {
        try {
          const credential = firebase.auth.PhoneAuthProvider.credential(verificationId, code);
          await firebase.auth().signInWithCredential(credential);
          navigation.navigate('HomeScreen');
        } catch (error) {
          Alert.alert('Feil', 'Feil kode ble oppgitt');
        }
    };

    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : '0'} 
            style={[ContainerStyles.backgroundContainer, { paddingHorizontal: 24 }]}
        >
          <SafeAreaView style={{ backgroundColor: Colors.white, flex: 1 }}>
            <FirebaseRecaptchaVerifierModal ref={recaptchaVerifier} firebaseConfig={firebaseConfig} />
            
            {/* Header & subheader */}
            <Ionicons 
                name="chevron-back" 
                size={24} 
                color="black" 
                style={{marginBottom: 12}}
                onPress={() => navigation.goBack()}
            />

                <Text style={FontStyles.header}>
                    Velkommen tilbake
                </Text>

                <Text style={[FontStyles.body2, { marginBottom: 64 }]}>
                    Lorem ipsum dolor sit amet
                </Text>
            
            {!codeSent ? (
              <>
                <Text style={FontStyles.body2Fat}>Mobilnummer</Text>
                <TextInput
                    style={[ButtonStyles.defaultPlaceholder, { marginTop: 4 }]}
                    placeholder="123 45 678"
                    keyboardType="phone-pad"
                    maxLength={10}
                    value={phoneNumber}
                    onChangeText={(text) => setPhoneNumber(formatPhoneNumber(text))}
                    autoComplete="tel"
                />
                <TouchableOpacity 
                    onPress={sendVerification}
                    style={ButtonStyles.primaryBtn}
                >
                  <Text style={FontStyles.bigBtn}>Send kode</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Text style={FontStyles.body2Fat}>Verifiseringskode</Text>
                <TextInput
                  placeholder="6 Siffer"
                  maxLength={6}
                  keyboardType="number-pad"
                  textContentType="oneTimeCode"
                  value={code}
                  onChangeText={setCode}
                  style={[ButtonStyles.defaultPlaceholder, { marginTop: 4 }]}
                />
                <TouchableOpacity 
                    onPress={confirmCode}
                    style={ButtonStyles.primaryBtn}
                >
                  <Text style={FontStyles.bigBtn}>Bekreft kode</Text>
                </TouchableOpacity>
              </>
            )}
          </SafeAreaView>
        </KeyboardAvoidingView>
      );
    }