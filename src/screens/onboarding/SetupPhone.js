import React, { useState } from "react";
import { Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from '@expo/vector-icons';

import Colors from "../../../Styles/Colors";
import FontStyles from "../../../Styles/FontStyles";
import ButtonStyles from "../../../Styles/ButtonStyles";
import ContainerStyles from "../../../Styles/ContainerStyles";

export default function SetupPhone({ route, navigation }) {

    const [phoneNumber, setPhoneNumber] = useState('');

    const [validationMessage, setValidationMessage] = useState('');

    const storeDataAndContinue = () => {
        if (!phoneNumber) {
            setValidationMessage('Vennligst fyll ut telefonnummerfeltet');
            return;
        }
    
        // Data from the SetupName screen
        const { firstName, lastName } = route.params;
        
        navigation.navigate("SetupCode", {
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
                    Legg inn Telefonnummer
                </Text>

                <Text style={[FontStyles.body2, { marginBottom: 64 }]}>
                    Skriv inn ditt telefonnummer
                </Text>

                <Text style={FontStyles.body2Fat}>Telefonnummer</Text>
                <TextInput 
                    style={[ButtonStyles.defaultPlaceholder, { marginTop: 4}]}
                    placeholder="+47 123 45 678"
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                />

                <View style={{ position: 'absolute', width: '100%', alignSelf: 'center', bottom: 12 }}>
                    <TouchableOpacity 
                        style={ButtonStyles.primaryBtn} 
                        onPress={storeDataAndContinue} 
                    >
                        <Text style={FontStyles.bigBtn}>Gå videre</Text>
                    </TouchableOpacity>
                </View>

            </SafeAreaView>
        </KeyboardAvoidingView>
    );
}