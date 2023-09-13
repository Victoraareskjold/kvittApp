import { StyleSheet, Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, Image } from "react-native";
import React from "react";
import { useState } from "react";

import { auth } from "../../firebase";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

import Colors from "../../Styles/Colors";
import FontStyles from "../../Styles/FontStyles";
import ButtonStyles from "../../Styles/ButtonStyles";
import ContainerStyles from "../../Styles/ContainerStyles";

console.disableYellowBow= true;

export default function LoginScreen({ navigation }) {

    if (auth.currentUser) {
        navigation.navigate('HomeScreen');
    }   else {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                navigation.navigate('HomeScreen');
            } 
        });
    }

    let [errorMessage, setErrorMessage] = useState('')
    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')

    let login = () => {
        if (email !== '' && password !== '') {
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    /* Signed in */
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'HomeScreen' }],  // or 'HomeStackGroup', see note below
                      });
                })
                .catch((error) => {
                    setErrorMessage(error.message)
                });
        } else {
            setErrorMessage('Vennligst skriv inn email og passord')
        }
    }

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
                    Logg inn
                </Text>
                
            </View>

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
                onChangeText={text => setPassword(text)}
            ></TextInput>

            {/* Forgot password? */}
            <View style={{alignItems: 'flex-end', marginBottom: 80}}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('ResetPassword')}
                >
                    <Text style={FontStyles.fatBody}>Glemt passord?</Text>
                </TouchableOpacity>
            </View>

            {/* Error message */}
            <View style={ContainerStyles.errorMessageContainer}>
                <Text style={{color: 'red'}}>{errorMessage}</Text>
            </View>

            {/* Log inn */}
            <TouchableOpacity
                onPress={login}
                style={ButtonStyles.primaryBtn}
            >
                <Text style={FontStyles.bigBtn}>Logg inn</Text>
            </TouchableOpacity>

            {/* Register */}
            <View style={{alignItems: 'center', marginBottom: 80}}>
                <TouchableOpacity 
                    onPress={() => navigation.navigate('SignUp')}
                    style={{flexDirection: 'row'}}
                >
                    <Text style={FontStyles.body2}>Har du ikke bruker? </Text>
                    <Text style={FontStyles.fatBody}>Registrer deg</Text>
                    </TouchableOpacity>
            </View>
            
        </KeyboardAvoidingView>
    );
};