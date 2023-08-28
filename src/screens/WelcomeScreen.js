import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";

const WelcomeScreen = ({ navigation }) => {
    return (
        <View style={{ flex: 1, alignItems: "center", backgroundColor: '#fff' }}>
            <Image 
            source={require("../../assets/adaptive-icon.png")}
            style={{ width: 400, height: 500, marginBottom: 50 }}
            />

            <Text style={{ color: "#2984FF", fontSize: 22, fontWeight: "bold" }}>
                til den søteste
            </Text>

            <Text style={{ color: "#3c444c", fontSize: 42, fontWeight: "bold", marginTop: 48, marginBottom: 40 }}>
                Boo' thang
            </Text>

            <TouchableOpacity 
            onPress={()=>navigation.navigate("RecipeList")}
            style={{ backgroundColor:"#2984FF", borderRadius: 18, paddingVertical: 18, width: "80%", alignItems: "center" }}>
                <Text style={{ fontSize: 18, color: "#fff", fontWeight: "700" }}>ferdy</Text>
            </TouchableOpacity>
        </View>
    );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
    header: {
        fontFamily: 'inter',
        fontSize: 28,
        fontWeight: 'bold',
    },
    subHeader: {
        fontSize: 20,
    },
    fatBody: {
        fontSize: 16,
    },
    body: {
        fontSize: 16,
    },
    body2: {
        fontSize: 14,
    },
});