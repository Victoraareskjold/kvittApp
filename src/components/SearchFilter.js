import { StyleSheet, View, Image, TextInput } from "react-native";
import { useState } from "react";
import React from "react";

const SearchFilter = ({  placeholder }) => {
    const [ input, setInput ] = useState("");
    console.log(input)
    return (
        <View style={styles.container}>
            <Image 
            source={require("../../assets/searchIcon.png")}
            style={{ width: 18, height: 18, marginRight: 4 }}
            />
            <TextInput 
                value={input} onChangeText={(text) => setInput(text)} 
                placeholder="Søk etter butikk eller produkt">
            </TextInput>
        </View>
    );
};

export default SearchFilter;

const styles = StyleSheet.create ({
    container: {
        flexDirection: 'row',
        marginTop: 24,
        backgroundColor: '#FBFBFB',
        paddingVertical: 12,
        flexDirection: 'row',
        borderRadius: 15,
        paddingHorizontal: 12,
        alignItems: 'center',
        marginHorizontal: 24,

        shadowcolor: '#',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0,
        shadowradius: 0,
    },
});