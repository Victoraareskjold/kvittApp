import { StyleSheet, Text, View, Image, placeholder, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { useState } from "react";
import Header from "../components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchFilter from "../components/SearchFilter";
import CategoriesFilter from "../components/CategoriesFilter";
import KvitteringCard from "../components/KvitteringCard";
import { categories } from "../Constant";

const RecipeListScreen = () => {
    return (
        <SafeAreaView style={{ backgroundColor: '#FFF' }}>

            <View style={styles.bgContainer}>

                <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>

                    {/* Header container */}
                    <View style={styles.headerContainer}>
                        <Text style={styles.header}>Alle kvitteringer</Text>

                        <TouchableOpacity
                        style={{ backgroundColor:"#2984FF", borderRadius: 50, paddingVertical: 6, paddingHorizontal: 12, alignItems: "center" }}>
                            <Text style={{ fontSize: 14, color: "#fff", fontWeight: "500" }}>Legg til</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Søkefelt */}
                    <SearchFilter />

                    {/* Categories filter */}
                    <View style={styles.filterContainer}>
                        <CategoriesFilter/>
                    </View>

                    {/* Kvittering list filter */}
                    <View>
                        <Text style={styles.subHeader}>I dag</Text>
                        {/* Kvitteringer */}
                        <KvitteringCard />
                    </View>

                    <View>
                        <Text style={styles.subHeader}>I går</Text>
                        {/* Kvitteringer */}
                        <KvitteringCard />
                    </View>

                </ScrollView>

            </View>

        </SafeAreaView>
    );
};

export default RecipeListScreen;

const styles = StyleSheet.create ({
    container: {
        marginHorizontal: 24,
    },
    bgContainer: {
        backgroundColor: '#FFF',
    },
    headerContainer: {
        marginTop: 32,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    header: {
        fontSize: 28,
        fontWeight: 'bold',
    },
    filterContainer: {
    },
    subHeader: {
        fontSize: 24,
    },
});