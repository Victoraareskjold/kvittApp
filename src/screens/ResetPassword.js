import { StyleSheet, Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from "react-native";
import React from "react";
import { useState } from "react";

import { auth } from "../../firebase";

export default function ResetPassword({ navigation }) {
    const [email, setEmail] = useState('')

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
                    Nullstill passordet ditt
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

            {/* Reset password */}
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
                <Text style={{ fontSize: 14, color: "#fff", fontWeight: "500" }}>Nullstill passord</Text>
            </TouchableOpacity>

            {/* Sign up */}
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
});