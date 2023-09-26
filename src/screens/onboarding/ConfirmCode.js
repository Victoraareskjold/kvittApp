import React, { useState, useRef, useEffect } from "react";
import { Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from '@expo/vector-icons';

import { db } from "../../../firebase";
import { collection, addDoc, updateDoc } from 'firebase/firestore';
import firebase from "firebase/compat/app";
import { firebaseConfig } from '../../../firebase';

import Colors from "../../../Styles/Colors";
import FontStyles from "../../../Styles/FontStyles";
import ButtonStyles from "../../../Styles/ButtonStyles";
import ContainerStyles from "../../../Styles/ContainerStyles";

export default function ConfirmCode({ route, navigation }) {
    const [setupCode, setSetupCode] = useState(null);
    const [code, setCode] = useState(['', '', '', '']);
    const refs = [useRef(), useRef(), useRef(), useRef()];
    const [isCodeVisible, setIsCodeVisible] = useState(false);

    useEffect(() => {
        refs[0].current.focus();

        if (route.params && route.params.code) {
            setSetupCode(route.params.code);
        }
    }, []);   

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
            setTimeout(() => {
                refs[index + 1].current.focus();
            }, 0);
        }
    };    

    /* oppdaterer database for å legge til kode */
    const storeCodeAndContinue = async () => {
        const enteredCode = code.join('');

        console.log("Entered Code:", enteredCode); // Debugging line
        console.log("Setup Code:", setupCode); // Debugging line
    
        if (enteredCode === setupCode) {
            try {
                const userDocRef = db.collection('users').doc(firebase.auth().currentUser.uid);
                
                // Oppdater dokumentet med den 4-sifrede koden
                await userDocRef.update({ code: enteredCode });
    
                navigation.navigate("FaceId");
            } catch (error) {
                console.error("Error updating document: ", error);
                alert('En feil oppsto ved oppdatering av dokumentet.');
            }
        } else {
            alert('Kodene skrevet er ikke like.');
        }
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
                    Bekreft din kode
                </Text>

                <Text style={[FontStyles.body2, { marginBottom: 64 }]}>
                    Vennligst tast inn den 4-sifret koden du opprettet for å bekrefte den.
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
