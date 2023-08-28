import { StyleSheet, Text, View, Image, TextInput } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const SearchFilter = ({  placeholder }) => {
    return (
        <View style={styles.container}>
            <Image 
            source={require("../../assets/icon.png")}
            style={{ width: 18, height: 18, marginRight: 4 }}
            />
            <TextInput>{placeholder}</TextInput>
        </View>
    );
};

export default SearchFilter;

const styles = StyleSheet.create ({
    container: {
        flexDirection: 'row',
        marginHorizontal: 24,
        marginTop: 24,
        backgroundColor: '#FBFBFB',
        paddingVertical: 12,
        flexDirection: 'row',
        borderRadius: 15,
        paddingHorizontal: 12,
        alignItems: 'center',

        shadowcolor: '#',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0,
        shadowradius: 0,
    },
});