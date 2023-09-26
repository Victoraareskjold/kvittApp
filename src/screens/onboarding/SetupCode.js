import React, { useState, useRef, useEffect } from "react";
import { Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from '@expo/vector-icons';

import Colors from "../../../Styles/Colors";
import FontStyles from "../../../Styles/FontStyles";
import ButtonStyles from "../../../Styles/ButtonStyles";
import ContainerStyles from "../../../Styles/ContainerStyles";

export default function SetupCode({ route, navigation }) {
    const [code, setCode] = useState(['', '', '', '']);
    const refs = [useRef(), useRef(), useRef(), useRef()];
    const [isCodeVisible, setIsCodeVisible] = useState(false);

    useEffect(() => {
        const indexToFocus = code.findIndex((c) => c === '');
        if (indexToFocus !== -1 && refs[indexToFocus].current) {
            refs[indexToFocus].current.focus();
        }
    }, [code]);    

    const handleKeyPress = (e, index) => {
        if (e.nativeEvent.key === 'Backspace') {
            if (code[index] === '' && index > 0) {
                const newCode = [...code];
                newCode[index - 1] = '';
                setCode(newCode);
                refs[index - 1].current.focus();
            } else {
                const newCode = [...code];
                newCode[index] = '';
                setCode(newCode);
            }
        }
    };
    
    const handleCodeChange = (text, index) => {
        if (/[^0-9]/.test(text)) return;
        
        const newCode = [...code];
        newCode[index] = text;
        setCode(newCode);
        
        if (text && index < 3) {
            // Setter fokus til neste TextInput kun hvis den aktuelle er fylt ut
            setTimeout(() => {
                refs[index + 1].current.focus();
            }, 0);
        }
    };       

    const storeCodeAndContinue = () => {
        const enteredCode = code.join('');

        if (enteredCode.length !== 4 || !/^\d+$/.test(enteredCode)) {
            alert('Koden må være 4 sifre og kun inneholde sifre (0-9)');
            return;
        }

        const { firstName, lastName, phoneNumber } = route.params;

        navigation.navigate("ConfirmCode", {
            firstName: firstName,
            lastName: lastName,
            phoneNumber: phoneNumber,
            code: enteredCode
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
                    Opprett din kode
                </Text>

                <Text style={[FontStyles.body2, { marginBottom: 64 }]}>
                    Vennligst opprett en 4-sifret kode. Denne koden vil bli brukt for å verifisere din identitet.
                </Text>

                <View style={styles.codeInputContainer}>
                    {code.map((value, index) => (
                        <TextInput
                            secureTextEntry={!isCodeVisible}
                            key={index}
                            style={styles.codeInput}
                            value={value}
                            onChangeText={(text) => handleCodeChange(text, index)}
                            keyboardType="number-pad"
                            maxLength={1}
                            ref={refs[index]}
                            onKeyPress={(e) => handleKeyPress(e, index)}
                            defaultValue=""
                            editable={index === 0 || code[index - 1] !== ''}
                        />
                    ))}
                </View>

                <TouchableOpacity 
                    onPress={() => setIsCodeVisible(!isCodeVisible)}
                    style={{alignSelf: 'center', marginTop: 8}}
                >
                    <Text style={{ color: Colors.default }}> 
                        {isCodeVisible ? 'Skjul Kode' : 'Vis Kode'} 
                    </Text>
                </TouchableOpacity>

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
