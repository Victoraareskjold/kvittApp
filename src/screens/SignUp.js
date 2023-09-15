import { StyleSheet, Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from "react-native";
import React from "react";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from '@expo/vector-icons';

import { auth, db } from "../../firebase";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";

import Colors from "../../Styles/Colors";
import FontStyles from "../../Styles/FontStyles";
import ButtonStyles from "../../Styles/ButtonStyles";
import ContainerStyles from "../../Styles/ContainerStyles";
import OnboardingStyles from "../../Styles/OnboardingStyles";

export default function SignupScreen({ navigation }) {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    let [validationMessage, setValidationMessage] = useState('');

    let validateAndSet = (value, valueToCompare, setValue) => {
        if (value !== valueToCompare) {
            setValidationMessage('Passordene er ikke like');
        } else {
            setValidationMessage('');
        }
        setValue(value);
    };

    let storeDataAndContinue = () => {
        if (!firstName || !lastName) {
            setValidationMessage('Vennligst fyll ut alle feltene');
            return;
        }
        
        navigation.navigate("PhoneVerification", {
            firstName: firstName,
            lastName: lastName,
        });
    };
    
    /* let signUp = () => {
        if (!firstName || !lastName) {
            setValidationMessage('Vennligst fyll ut alle feltene');
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
              const user = userCredential.user;
              const uid = user.uid;
              const userDocRef = doc(db, "users", uid);
              
              setDoc(userDocRef, {
                fornavn: firstName,
                mellomnavn: middleName,
                etternavn: lastName,
                epost: email,
                // Legg til andre felt om nødvendig
              });
              sendEmailVerification(user);
              navigation.navigate("HomeScreen", { user: user });
            })
            .catch((error) => {
              setValidationMessage(error.message);
            });
        }; */

    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={[ContainerStyles.backgroundContainer, { paddingHorizontal: 24 }]}
        >
            <SafeAreaView style={{backgroundColor: Colors.white, flex: 1}}>

            {/* Header & subheader */}
                <Ionicons 
                    name="chevron-back" 
                    size={24} 
                    color="black" 
                    style={{marginBottom: 12}}
                    onPress={() => navigation.goBack()}
                />

                <Text style={FontStyles.header}>
                    Kom i gang
                </Text>

                <Text style={[FontStyles.body2, { marginBottom: 64 }]}>
                    Hvem er du?
                </Text>

                {/* First name */}
                <Text style={FontStyles.body2Fat}>Fornavn & mellomnavn</Text>
                <TextInput
                    style={[ButtonStyles.defaultPlaceholder, { marginTop: 4 }]}
                    placeholder="Ola"
                    value={firstName}
                    onChangeText={(text) => setFirstName(text)}
                ></TextInput>

                {/* Last name */}
                <Text style={FontStyles.body2Fat}>Etternavn</Text>
                <TextInput 
                    style={[ButtonStyles.defaultPlaceholder, { marginTop: 4 }]}
                    placeholder='Nordmann'
                    value={lastName}
                    onChangeText={text => setLastName(text)}
                ></TextInput>

            {/* Validation message */}
            <View style={ContainerStyles.errorMessageContainer}>
                <Text style={ContainerStyles.errorMessageContainer}>{validationMessage}</Text>
            </View>

            {/* Log inn */}
            <View style={{ position: 'absolute', width: '100%', alignSelf: 'center', bottom: 12 }}>
                <TouchableOpacity
                    onPress={storeDataAndContinue}
                    style={ButtonStyles.primaryBtn}
                >
                    <Text style={FontStyles.bigBtn}>Gå videre</Text>
                </TouchableOpacity>
            </View>

            </SafeAreaView>
        </KeyboardAvoidingView>
    );
};