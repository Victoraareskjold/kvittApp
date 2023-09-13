import { StyleSheet, Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from "react-native";
import React from "react";
import { useState } from "react";

import { auth, db } from "../../firebase";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";


import Colors from "../../Styles/Colors";
import FontStyles from "../../Styles/FontStyles";
import ButtonStyles from "../../Styles/ButtonStyles";
import ContainerStyles from "../../Styles/ContainerStyles";

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState("");

    let [validationMessage, setValidationMessage] = useState('');

    let validateAndSet = (value, valueToCompare, setValue) => {
        if (value !== valueToCompare) {
            setValidationMessage('Passordene er ikke like');
        } else {
            setValidationMessage('');
        }
        setValue(value);
    };

    let signUp = () => {
        if (password === confirmPassword) {
          createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
              // Opprett Firestore-dokument for brukeren og lagre brukerinformasjon
              const user = userCredential.user;
              const uid = user.uid;
    
              const userDocRef = doc(db, "users", uid);
    
              // Legg til brukerinformasjon i Firestore
              setDoc(userDocRef, {
                navn: name,
                epost: email,
                // Legg til andre felt om nødvendig
              });
    
              // Send e-postbekreftelse
              sendEmailVerification(user);
    
              // Naviger til hjemmesiden
              navigation.navigate("HomeScreen", { user: user });
            })
            .catch((error) => {
              setValidationMessage(error.message);
            });
        }
      };

    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={[ContainerStyles.backgroundContainer, { paddingHorizontal: 24, justifyContent: 'center' }]}
        >

            {/* Header & subheader */}
            <View style={{alignItems: "center"}}>
            
                <Text style={FontStyles.header}>
                    Kvitt
                </Text>

                <Text style={[FontStyles.body2, { marginBottom: 80 }]}>
                    Registrer deg
                </Text>
            </View>

             {/* Firstname */}
            <Text style={FontStyles.body2Fat}>Fullt navn</Text>
            <TextInput
                style={[ButtonStyles.defaultPlaceholder, { marginTop: 4 }]}
                placeholder="Fullt navn"
                value={name}
                onChangeText={(text) => setName(text)}
            ></TextInput>


            {/* Email */}
            <Text style={FontStyles.body2Fat}>Email</Text>
                <TextInput 
                style={[ButtonStyles.defaultPlaceholder, { marginTop: 4 }]}
                placeholder='Email'
                
                value={email}
                onChangeText={text => setEmail(text)}
            ></TextInput>

            {/* Password */}
            <Text style={FontStyles.body2Fat}>Passord</Text>
            <TextInput 
                secureTextEntry={true}
                style={[ButtonStyles.defaultPlaceholder, { marginTop: 4 }]}
                placeholder='Passord'

                value={password}
                onChangeText={(value) => validateAndSet(value, confirmPassword, setPassword)}
            ></TextInput>

            {/* Confirn password */}
            <Text style={FontStyles.body2Fat}>Bekreft passord</Text>
            <TextInput 
                secureTextEntry={true}
                style={[ButtonStyles.defaultPlaceholder, { marginTop: 4 }]}
                placeholder='Bekreft passord'

                value={confirmPassword}
                onChangeText={(value) => validateAndSet(value, password, setConfirmPassword)}
            ></TextInput>

            {/* Validation message */}
            <View style={ContainerStyles.errorMessageContainer}>
                <Text style={ContainerStyles.errorMessageContainer}>{validationMessage}</Text>
            </View>

            {/* Register */}
            <TouchableOpacity
                onPress={signUp}
                style={ButtonStyles.primaryBtn}
            >
                <Text style={FontStyles.bigBtn}>Registrer deg</Text>
            </TouchableOpacity>

            {/* Already have an account? */}
            <View style={{alignItems: 'center', marginBottom: 80}}>
                <TouchableOpacity 
                onPress={() => navigation.popToTop()}
                style={{flexDirection: 'row'}}
                >
                    <Text style={FontStyles.body2}>Har du allerede en bruker? </Text>
                    <Text style={FontStyles.fatBody}>Logg inn</Text>
                    </TouchableOpacity>
            </View>
            
        </KeyboardAvoidingView>
    );
};