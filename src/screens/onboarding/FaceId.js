import React, { useState, useRef, useEffect } from "react";
import { Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, StyleSheet, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from '@expo/vector-icons';

import Colors from "../../../Styles/Colors";
import FontStyles from "../../../Styles/FontStyles";
import ButtonStyles from "../../../Styles/ButtonStyles";
import ContainerStyles from "../../../Styles/ContainerStyles";
import OnboardingStyles from "../../../Styles/OnboardingStyles";

export default function FaceId({ route, navigation }) {

    return (
        <SafeAreaView style={{flex:1, backgroundColor: Colors.white,}}>
        <View style={OnboardingStyles.centerContainer}>

            <View style={OnboardingStyles.imageContainer}>
                <Image 
                    source={require('../../../assets/faceId.png')}
                    style={{height: 250, width: 250, marginBottom: 32}}
                />
                <Text style={OnboardingStyles.subHeader}>Raskere pålogging</Text>
            <Text style={OnboardingStyles.body}>Lorem ipsum</Text>
            </View>

            <View style={OnboardingStyles.buttonsContainer}>
                <TouchableOpacity 
                    style={OnboardingStyles.primaryBtn}
                    onPress={navigation.navigate("HomeScreen")}
                >
                    <Text style={OnboardingStyles.linkText}>Aktiver Face ID</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={navigation.navigate("HomeScreen")}
                >
                    <Text style={OnboardingStyles.linkText2}>Nei takk</Text>
                </TouchableOpacity>
            </View>

        </View>
        </SafeAreaView>
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
