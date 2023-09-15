import { StyleSheet, Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, Image } from "react-native";
import React from "react";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { auth } from "../../firebase";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

import Colors from "../../Styles/Colors";
import FontStyles from "../../Styles/FontStyles";
import ButtonStyles from "../../Styles/ButtonStyles";
import ContainerStyles from "../../Styles/ContainerStyles";
import { Ionicons } from '@expo/vector-icons';

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
                    Velkommen tilbake
                </Text>

                <Text style={[FontStyles.body2, { marginBottom: 64 }]}>
                    Lorem ipsum dolor sit amet
                </Text>

            {/* Email */}
            <Text style={FontStyles.body2Fat}>Mobilnummer</Text>
                <TextInput 
                style={[ButtonStyles.defaultPlaceholder, { marginTop: 4 }]}
                placeholder='+47 123 45 678'
                
                value={email}
                onChangeText={text => setEmail(text)}
            ></TextInput>

            {/* Error message */}
            <View style={ContainerStyles.errorMessageContainer}>
                <Text style={{color: 'red'}}>{errorMessage}</Text>
            </View>

            {/* Log inn */}
            <View style={{ position: 'absolute', width: '100%', alignSelf: 'center', bottom: 12 }}>
                <TouchableOpacity
                    onPress={login}
                    style={ButtonStyles.primaryBtn}
                >
                    <Text style={FontStyles.bigBtn}>Logg inn</Text>
                </TouchableOpacity>
            </View>
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
};