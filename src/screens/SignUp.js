import { StyleSheet, Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from "react-native";
import React from "react";
import { useState } from "react";

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    let [validationMessage, setValidationMessage] = useState('')

    let validateAndSet = (value, valueToCompare, setValue) => {
        if (value !== valueToCompare) {
            setValidationMessage('Passordene matcher ikke');
        } else {
            setValidationMessage('');
        }
        setValue(value);
    };

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
                    Si nei til kassalappen lorem ipsum dolor sit amet dolor amet!
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
                style={{width: '100%', backgroundColor: '#F4F9FF', marginTop: 4, paddingVertical: 16, paddingHorizontal: 12, borderRadius: 15, marginBottom: 12}}
                placeholder='Passord'

                value={password}
                onChangeText={(value) => validateAndSet(value, confirmPassword, setPassword)}
            ></TextInput>

            {/* Bekreft password */}
            <Text style={styles.body}>Bekreft passord</Text>
            <TextInput 
                secureTextEntry={true}
                style={{width: '100%', backgroundColor: '#F4F9FF', marginTop: 4, paddingVertical: 16, paddingHorizontal: 12, borderRadius: 15, marginBottom: 12}}
                placeholder='Bekreft passord'

                value={confirmPassword}
                onChangeText={(value) => validateAndSet(value, password, setConfirmPassword)}
            ></TextInput>

            {/* Validation message */}
            <View style={styles.validationMessageContainer}>
                <Text style={styles.validationMessage}>{validationMessage}</Text>
            </View>

            {/* Registrer deg */}
            <TouchableOpacity
                onPress={() => navigation.navigate('HomeScreen')}
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
                <Text style={{ fontSize: 14, color: "#fff", fontWeight: "500" }}>Kom i gang</Text>
            </TouchableOpacity>

            {/* Har du allerede bruker? */}
            <View style={{alignItems: 'center', marginBottom: 80}}>
                <TouchableOpacity 
                onPress={() => navigation.pop()}
                style={{flexDirection: 'row'}}
                >
                    <Text style={{marginRight: 4, fontSize: 14, color: '#272727', opacity: 0.5,}}>Har du allere en bruker?</Text>
                    <Text style={styles.fatBody}>Logg inn</Text>
                    </TouchableOpacity>
            </View>
            
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({

    /* Containers */
    validationMessageContainer: {
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
    validationMessage: {
        color: 'red',
    },
});