import { StyleSheet, Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from '@expo/vector-icons';

import { auth, db } from "../../../firebase";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";

import Colors from "../../../Styles/Colors";
import FontStyles from "../../../Styles/FontStyles";
import ButtonStyles from "../../../Styles/ButtonStyles";
import ContainerStyles from "../../../Styles/ContainerStyles";
import OnboardingStyles from "../../../Styles/OnboardingStyles";

export default function SetupName({ navigation }) {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const firstNameRef = useRef(null);

    /* Set focus on load */
    useEffect(() => {
        if (firstNameRef.current) {
            firstNameRef.current.focus();
        }
    }, []); // Tom avhengighetsarray betyr at effekten kjøres ved montering

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
        
        navigation.navigate("SetupPhone", {
            firstName: firstName,
            lastName: lastName,
        });
    };

    /* Capitalize words */
    const capitalizeWords = (str) => 
    str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');

    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : '0'}
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
                    Velkommen til Kvitt! 👋
                </Text>

                <Text style={[FontStyles.body2, { marginBottom: 64 }]}>
                    Fortell oss litt om deg selv.
                </Text>

                {/* First name */}
                <Text style={FontStyles.body2Fat}>Fornavn & mellomnavn</Text>
                <TextInput
                    ref={firstNameRef}
                    style={[ButtonStyles.defaultPlaceholder, { marginTop: 4 }]}
                    placeholder="Ola Nordmann"
                    value={firstName}
                    onChangeText={(text) => setFirstName(capitalizeWords(text))}
                ></TextInput>

                {/* Last name */}
                <Text style={FontStyles.body2Fat}>Etternavn</Text>
                <TextInput 
                    style={[ButtonStyles.defaultPlaceholder, { marginTop: 4 }]}
                    placeholder='Hansen'
                    value={lastName}
                    onChangeText={text => setLastName(capitalizeWords(text))}
                ></TextInput>

            {/* Validation message */}
            <View style={ContainerStyles.errorMessageContainer}>
                <Text style={ContainerStyles.errorMessageContainer}>{validationMessage}</Text>
            </View>

            {/* Log inn */}
                <TouchableOpacity
                    onPress={storeDataAndContinue}
                    style={[ButtonStyles.primaryBtn, { position: 'absolute', bottom: 12}]}
                >
                    <Text style={FontStyles.bigBtn}>Gå videre</Text>
                </TouchableOpacity>
           
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
};