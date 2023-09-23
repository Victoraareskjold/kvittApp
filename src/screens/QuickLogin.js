import React, { useState, useRef, useEffect } from "react";
import { Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as SecureStore from 'expo-secure-store';

import Colors from "../../Styles/Colors";
import FontStyles from "../../Styles/FontStyles";
import ButtonStyles from "../../Styles/ButtonStyles";
import ContainerStyles from "../../Styles/ContainerStyles";

export default function QuickLogin({ navigation }) {
    const [code, setCode] = useState(['', '', '', '']);
    const refs = [useRef(), useRef(), useRef(), useRef()];

    useEffect(() => {
        refs[0].current.focus();
    }, []);

    const handleCodeChange = (text, index) => {
        const newCode = [...code];
        newCode[index] = text;
        setCode(newCode);
        if (text && index < 3) refs[index + 1].current.focus();
    };

    const loginWithCode = async () => {
        const enteredCode = code.join('');

        if (enteredCode.length !== 4 || !/^\d+$/.test(enteredCode)) {
            alert('Koden må være 4 sifre og kun inneholde sifre (0-9)');
            return;
        }

        try {
            const storedCode = await SecureStore.getItemAsync('userCode');

            if (enteredCode === storedCode) {
                // naviger til hovedskjermen eller annen skjerm
                navigation.navigate("HomeScreen");
            } else {
                alert('Ugyldig kode.');
            }
        } catch (error) {
            alert('Det oppstod en feil under innlogging.');
        }
    };

    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : '0'}
            style={[ContainerStyles.backgroundContainer, { paddingHorizontal: 24 }]}
        >
            <SafeAreaView style={{backgroundColor: Colors.white, flex: 1}}>

            <Text style={FontStyles.header}>
                    Velkommen tilbake
                </Text>

                <Text style={[FontStyles.body2, { marginBottom: 32 }]}>
                    Skriv inn den 4-sifrede koden på nytt
                </Text>

                <View style={styles.codeInputContainer}>
                    {code.map((value, index) => (
                        <TextInput 
                            key={index}
                            style={styles.codeInput}
                            value={value}
                            onChangeText={(text) => handleCodeChange(text, index)}
                            keyboardType='numeric'
                            maxLength={1}
                            ref={refs[index]}
                        />
                    ))}
                </View>
                <TouchableOpacity 
                    onPress={loginWithCode}
                    style={ButtonStyles.primaryBtn}
                >
                    <Text style={FontStyles.bigBtn}>Login</Text>
                </TouchableOpacity>
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
        marginBottom: 32,
        marginTop: 4,
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
