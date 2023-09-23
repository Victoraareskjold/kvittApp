import React, { useState, useRef, useEffect } from "react";
import { Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from '@expo/vector-icons';

import Colors from "../../../Styles/Colors";
import FontStyles from "../../../Styles/FontStyles";
import ButtonStyles from "../../../Styles/ButtonStyles";
import ContainerStyles from "../../../Styles/ContainerStyles";

import * as SecureStore from 'expo-secure-store';

export default function SetupCode({ route, navigation }) {
    const [code, setCode] = useState(['', '', '', '']);
    const refs = [useRef(), useRef(), useRef(), useRef()];

    useEffect(() => {
        // Fokus på den første TextInput når komponenten lastes
        refs[0].current.focus();
    }, []); // Tomt avhengighetsarray for å kjøre denne effekten kun ved innlasting

    const handleCodeChange = (text, index) => {
        const newCode = [...code];
        newCode[index] = text;

        if (text !== '') {
            // Fokus på neste TextInput hvis brukeren har skrevet inn et siffer
            if (index < 3) {
                refs[index + 1].current.focus();
            }
        } else {
            // Fokus på forrige TextInput hvis brukeren fjerner tekst
            if (index > 0) {
                refs[index - 1].current.focus();
            }
        }

        setCode(newCode);
    };

    const storeCodeAndContinue = async () => {
        const enteredCode = code.join('');
    
        if (enteredCode.length !== 4 || !/^\d+$/.test(enteredCode)) {
            alert('Koden må være 4 sifre og kun inneholde sifre (0-9)');
            return;
        }
    
        // Lagre koden sikkert
        try {
            await SecureStore.setItemAsync('userCode', enteredCode);
        } catch (error) {
            alert('Det oppstod en feil under lagring av koden.');
            return;
        }
    
        // Data fra SetupPhone-skjermen
        const { firstName, lastName, phoneNumber } = route.params;
    
        navigation.navigate("ConfirmCode", {
            firstName: firstName,
            lastName: lastName,
            phoneNumber: phoneNumber
        });
    };    

    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : '0'}
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
                    Sett opp kode
                </Text>

                <Text style={[FontStyles.body2, { marginBottom: 32 }]}>
                    Skriv inn en 4-sifret kode
                </Text>

                <View style={styles.codeInputContainer}>
                    {code.map((value, index) => (
                        <TextInput 
                            key={index}
                            style={styles.codeInput}
                            value={value}
                            onChangeText={(text) => handleCodeChange(text, index)}
                            keyboardType="number-pad"
                            maxLength={1}
                            ref={refs[index]}
                        />
                    ))}
                </View>

                <View style={{ position: 'absolute', width: '100%', alignSelf: 'center', bottom: 12 }}>
                    <TouchableOpacity 
                        style={ButtonStyles.primaryBtn} 
                        onPress={storeCodeAndContinue} 
                    >
                        <Text style={FontStyles.bigBtn}>Gå videre</Text>
                    </TouchableOpacity>
                </View>

            </SafeAreaView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    codeInputContainer: {
        alignSelf: 'center',
        width: 250,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    codeInput: {
        width: 48,
        height: 48,
        backgroundColor: Colors.grey,
        borderRadius: 50,
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});