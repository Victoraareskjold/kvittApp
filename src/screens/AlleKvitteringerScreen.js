import { StyleSheet, Text, View, Image, placeholder, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { useState } from "react";
import Header from "../components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchFilter from "../components/SearchFilter";
import CategoriesFilter from "../components/CategoriesFilter";
import KvitteringCard from "../components/KvitteringCard";
import { categories } from "../Constant";

const AlleKvitteringerScreen = () => {
  return (
    <SafeAreaView style={{ backgroundColor: "#FFF", flex: 1 }}>
      <ScrollView  showsVerticalScrollIndicator={false}>
        {/* Header container */}
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Alle kvitteringer</Text>

          <TouchableOpacity
            style={{
              backgroundColor: "#2984FF",
              borderRadius: 50,
              paddingVertical: 6,
              paddingHorizontal: 12,
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 14, color: "#fff", fontWeight: "500" }}>
              Legg til
            </Text>
          </TouchableOpacity>
        </View>

        {/* Søkefelt */}
        <SearchFilter />

        {/* Categories filter */}
        <View style={styles.filterContainer}>
          <CategoriesFilter />
        </View>

        {/* Kvittering list filter */}
        <View style={styles.kvitteringContainer}>
          <Text style={styles.subHeader}>I dag</Text>
          {/* Kvitteringer */}
          <KvitteringCard />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AlleKvitteringerScreen;

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
        marginHorizontal: 24
    },
    kvitteringContainer: {
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