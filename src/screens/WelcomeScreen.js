import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from "react-native";
import React from "react";

const WelcomeScreen = ({ navigation }) => {
    return (
        <View style={{ flex: 1, backgroundColor: '#fff', justifyContent: 'center', paddingHorizontal: 24 }}>

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
            ></TextInput>

            {/* Password */}
            <Text style={styles.body}>Passord</Text>
            <TextInput 
                secureTextEntry={true}
                input
                style={{width: '100%', backgroundColor: '#F4F9FF', marginTop: 4, paddingVertical: 16, paddingHorizontal: 12, borderRadius: 15, marginBottom: 24}}
                placeholder='Passord'
            ></TextInput>

            {/* Glemt passord? */}
            <View style={{alignItems: 'flex-end', marginBottom: 80}}>
                <TouchableOpacity>
                    <Text style={styles.fatBody}>Glemt passord?</Text>
                    </TouchableOpacity>
            </View>

            {/* Logg inn */}
            <TouchableOpacity 
                onPress={()=>navigation.navigate('HomeScreen')}
                style={{ backgroundColor:"#2984FF", borderRadius: 50, height: 54, width: "100%", alignItems: "center", justifyContent: 'center', marginBottom: 12 }}>
                    <Text style={{ fontSize: 14, color: "#fff", fontWeight: "500" }}>Logg inn</Text>
            </TouchableOpacity>

            {/* Logg inn med Google */}
                <TouchableOpacity 
                    onPress={()=>navigation.navigate('HomeScreen')}
                    style={{ backgroundColor:"#F8F8F8", borderRadius: 50, height: 54, width: "100%", alignItems: "center", justifyContent: 'center', flexDirection: 'row', marginBottom:24 }}>
                        <Image 
                            source={require('../../assets/googleLogo.png')}
                            style={{height: 24, width: 24, marginRight: 12}}
                        />
                        <Text style={{ fontSize: 14, color: "#272727", fontWeight: "500" }}>Logg inn med google</Text>
                </TouchableOpacity>

            {/* Registrer deg */}
            <View style={{alignItems: 'center', marginBottom: 80}}>
                <TouchableOpacity style={{flexDirection: 'row'}}>
                    <Text style={{marginRight: 4, fontSize: 14, color: '#272727', opacity: 0.5,}}>Har du ikke bruker?</Text>
                    <Text style={styles.fatBody}>Registrer deg</Text>
                    </TouchableOpacity>
            </View>
            
        </View>
    );
};

export default WelcomeScreen;

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