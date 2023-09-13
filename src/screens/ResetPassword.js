import { StyleSheet, Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from "react-native";
import React from "react";
import { useState } from "react";

import { auth } from "../../firebase";
import { sendPasswordResetEmail } from "firebase/auth";

import Colors from "../../Styles/Colors";
import FontStyles from "../../Styles/FontStyles";
import ButtonStyles from "../../Styles/ButtonStyles";
import ContainerStyles from "../../Styles/ContainerStyles";

export default function ResetPassword({ navigation }) {

    let [email, setEmail] = useState('');
    let [errorMessage, setErrorMessage] = useState('');

    let resetPassword = () => {
        sendPasswordResetEmail(auth, email)
        .then(() => {
            /* Password reset email sent! */
            navigation.popToTop();
        })
        .catch((error) => {
            setErrorMessage(error.message);
        });
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
                    Nullstill passordet ditt
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

            {/* Error message */}
            <View style={ContainerStyles.errorMessageContainer}>
                <Text style={{color: 'red'}}>{errorMessage}</Text>
            </View>

            {/* Reset password */}
            <TouchableOpacity
                onPress={resetPassword}
                style={ButtonStyles.primaryBtn}
            >
                <Text style={FontStyles.bigBtn}>Nullstill passord</Text>
            </TouchableOpacity>

            {/* Sign up */}
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