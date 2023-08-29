import { StyleSheet, Text, View, Image, placeholder } from "react-native";
import React from "react";
import Header from "../components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchFilter from "../components/SearchFilter";
import CategoriesFilter from "../components/CategoriesFilter";
import KvitteringCard from "../components/KvitteringCard";

const RecipeListScreen = () => {
    return (
        <SafeAreaView styles={styles.container}>

            {/* Header container */}
            <View style={styles.headerContainer}>
                <Text style={styles.header}>Alle kvitteringer</Text>
            </View>

            {/* Søkefelt */}
            <SearchFilter placeholder={'Søk etter butikk eller produkt'}/>

            {/* Categories filter */}
            <View style={styles.filterContainer}>
                <CategoriesFilter/>
            </View>

            {/* Kvittering list filter */}
            <View style={styles.container}>
                <Text style={styles.subHeader}>I dag</Text>
                {/* Kvitteringer */}
                <KvitteringCard />
            </View>
        </SafeAreaView>
    );
};

export default RecipeListScreen;

const styles = StyleSheet.create ({
    container: {
        marginHorizontal: 24,
    },
    headerContainer: {
        marginTop: 32,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginHorizontal: 24,
    },
    header: {
        fontSize: 28,
        fontWeight: 'bold',
    },
    filterContainer: {
        marginLeft: 24,
    },
    subHeader: {
        fontSize: 24,
    },
});