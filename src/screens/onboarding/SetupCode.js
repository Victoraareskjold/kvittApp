import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from '@expo/vector-icons';
import { auth, getAuth, signInWithCredential, PhoneAuthProvider } from "firebase/auth";

import Colors from "../../../Styles/Colors";
import FontStyles from "../../../Styles/FontStyles";
import ButtonStyles from "../../../Styles/ButtonStyles";
import ContainerStyles from "../../../Styles/ContainerStyles";
import OnboardingStyles from "../../../Styles/OnboardingStyles";

export default function SetupCode({ route, navigation }) {

    const [phoneNumber, setPhoneNumber] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [isCodeSent, setIsCodeSent] = useState(false);
    let verificationId;

    const sendVerificationCode = async () => {
        const phoneProvider = new PhoneAuthProvider();
        verificationId = await phoneProvider.verifyPhoneNumber(phoneNumber, window.recaptchaVerifier);
        setIsCodeSent(true);
    };
    
    const verifyCodeAndContinue = async () => {
        const credential = PhoneAuthProvider.credential(verificationId, verificationCode);
        try {
            await signInWithCredential(getAuth(), credential);
    
            // Data from the SignupScreen component
            const { firstName, lastName } = route.params;
    
            // Save or send data for further registration
            // Here we're just passing it to another screen for the sake of demonstration
            navigation.navigate("setupCode", {
                firstName: firstName,
                lastName: lastName,
                phoneNumber: phoneNumber
            });
    
        } catch (error) {
            console.error("Feil ved kodeverifisering: ", error);
        }
    };    

    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
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
                    Bekreft Telefonnummer
                </Text>

                <TextInput 
                    style={[ButtonStyles.defaultPlaceholder, { marginTop: 4}]}
                    placeholder="123 45 678"
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                />

                {isCodeSent && (
                    <TextInput 
                        style={[ButtonStyles.defaultPlaceholder, { marginTop: 4}]}
                        placeholder="8 siffer"
                        value={verificationCode}
                        onChangeText={setVerificationCode}
                    />
                )}

                {isCodeSent ? (
                    <TouchableOpacity 
                        style={ButtonStyles.primaryBtn}
                        onPress={verifyCodeAndContinue} 
                    >
                        <Text style={FontStyles.bigBtn}>Gå videre</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity 
                        style={ButtonStyles.primaryBtn} 
                        onPress={sendVerificationCode} 
                    >
                        <Text style={FontStyles.bigBtn}>Send kode</Text>
                    </TouchableOpacity>
                )}

            </SafeAreaView>
        </KeyboardAvoidingView>
    );
}
