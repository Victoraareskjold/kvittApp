import { StyleSheet, View, Image, TextInput } from "react-native";
import { useState } from "react";
import React from "react";

const SearchBox = ({  placeholder }) => {
    const [ input, setInput ] = useState("");
    console.log(input)
    return (
        <View style={styles.searchContainer}>
            <Image 
            source={require("../../assets/searchIcon.png")}
            style={{ width: 18, height: 18, marginRight: 4 }}
            />
            <TextInput 
                value={input} onChangeText={(text) => setInput(text)} 
                placeholder="Søk etter butikk eller produkt"
                style={{width: '100%'}}
            >
            </TextInput>
        </View>
    );
};

export default SearchBox;

const styles = StyleSheet.create ({
    searchContainer: {
        flexDirection: 'row',
        marginTop: 0,
        backgroundColor: '#FBFBFB',
        paddingVertical: 12,
        flexDirection: 'row',
        borderRadius: 50,
        paddingHorizontal: 12,
        alignItems: 'center',

        shadowcolor: '#',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0,
        shadowradius: 0,
    },
});