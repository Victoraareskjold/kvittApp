import { StyleSheet, Text, View, Image, placeholder } from "react-native";
import React from "react";
import Header from "../components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchFilter from "../components/SearchFilter";
import CategoriesFilter from "../components/CategoriesFilter";
import KvitteringCard from "../components/KvitteringCard";

const RecipeListScreen = () => {
    return (
        <SafeAreaView styles={{ flex: 1 }}>
            
            {/* Render header */}
            <Header headerText={"Alle kvitteringer"}/>
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
    filterContainer: {
        marginLeft: 24,
    },
    subHeader: {
        fontSize: 24,
    },
});