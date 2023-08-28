import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const Header = ({ headerText, headerIcon}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.header}> {headerText}</Text>
        </View>
    );
};

export default Header;

const styles = StyleSheet.create ({
    container: {
        flexDirection: 'row',
        marginHorizontal: 16,
        marginTop: 24,
    },
    header: {
        fontSize: 28,
        fontWeight: 'bold',
    },
});