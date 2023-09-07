import { StyleSheet, Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from "react-native";
import React from "react";
import { useState } from "react";

import { auth } from "../../firebase";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

console.disableYellowBow= true;

export default function LoginScreen({ navigation }) {

    /* if (auth.currentUser) {
        navigation.navigate('HomeScreen');
    }   else {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                navigation.navigate('HomeScreen');
            } 
        });
    } */

    let [errorMessage, setErrorMessage] = useState('')
    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')

    let login = () => {
        if (email !== '' && password !== '') {
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    /* Signed in */
                    navigation.navigate('HomeScreen', {user: userCredential.user});
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
            style={{ flex: 1, backgroundColor: '#fff', justifyContent: 'center', paddingHorizontal: 24 }}
        >

            {/* Header & subheader */}
            <View style={{alignItems: "center"}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    {/* <Image 
                        source={require('../../assets/kvittLogo.png')}
                        style={{height: 32, width: 32, marginRight: 12}}
                    /> */}
                    <Text style={{ color: "#272727", fontSize: 38, fontWeight: "bold" }}>
                        Kvitt
                    </Text>
                </View>

                <Text style={{ color: "#272727", opacity: 0.76, fontSize: 14, fontWeight: "500", marginTop: 12, marginBottom: 80, letterSpacing: 1, marginHorizontal: 32, textAlign: 'center' }}>
                    Logg inn
                </Text>
            </View>

            {/* Email */}
            <Text style={styles.body}>Email</Text>
                <TextInput 
                style={{width: '100%', backgroundColor: '#F4F9FF', marginTop: 4, paddingVertical: 16, paddingHorizontal: 12, borderRadius: 15, marginBottom: 12}}
                placeholder='Email'
                
                value={email}
                onChangeText={text => setEmail(text)}
            ></TextInput>

            {/* Password */}
            <Text style={styles.body}>Passord</Text>
            <TextInput 
                secureTextEntry={true}
                style={{width: '100%', backgroundColor: '#F4F9FF', marginTop: 4, paddingVertical: 16, paddingHorizontal: 12, borderRadius: 15, marginBottom: 24}}
                placeholder='Passord'

                value={password}
                onChangeText={text => setPassword(text)}
            ></TextInput>

            {/* Forgot password? */}
            <View style={{alignItems: 'flex-end', marginBottom: 80}}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('ResetPassword')}
                >
                    <Text style={styles.fatBody}>Glemt passord?</Text>
                </TouchableOpacity>
            </View>

            {/* Error message */}
            <View style={styles.errorMessageContainer}>
                <Text style={styles.errorMessage}>{errorMessage}</Text>
            </View>

            {/* Log inn */}
            <TouchableOpacity
                onPress={login}
                style={{
                    backgroundColor: "#2984FF",
                    borderRadius: 50,
                    height: 54,
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 12,
                }}
            >
                <Text style={{ fontSize: 14, color: "#fff", fontWeight: "500" }}>Logg inn</Text>
            </TouchableOpacity>

            {/* Register */}
            <View style={{alignItems: 'center', marginBottom: 80}}>
                <TouchableOpacity 
                onPress={() => navigation.navigate('SignUp')}
                style={{flexDirection: 'row'}}
                >
                    <Text style={{marginRight: 4, fontSize: 14, color: '#272727', opacity: 0.5,}}>Har du ikke bruker?</Text>
                    <Text style={styles.fatBody}>Registrer deg</Text>
                    </TouchableOpacity>
            </View>
            
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({

    /* Container */
    errorMessageContainer: {
        alignItems: 'center',
        marginBottom: 24,
    },

    fatBody: {
        fontSize: 14,
        color: '#272727',
        fontWeight: '800',
    },
    body: {
        color: '#272727',
        opacity: 0.76,
        fontSize: 14,
        fontWeight: '600',
    },
    body2: {
        fontSize: 14,
        color: '#272727',
        opacity: 0.5,
    },
    errorMessage: {
        color: 'red',
    },
});