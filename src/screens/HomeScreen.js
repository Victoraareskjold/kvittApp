import { StyleSheet, Text, View, Image, placeholder, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import KvitteringCard from "../components/KvitteringCard";

const HomeScreen = () => {
  return (
    <View style={{backgroundColor: '#FFF', flex: 1}}>
    <SafeAreaView style={{ backgroundColor: "#FFF"}}/>
      <ScrollView  
      showsVerticalScrollIndicator={false}
      >

        {/* Header container */}
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Hjem</Text>
        </View>

        {/* Kvittering list filter */}
        <View style={styles.kvitteringContainer}>

            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between' }}>
                <Text style={styles.subHeader}>Nylige kvitteringer</Text>
                <TouchableOpacity >
                    <Text style={styles.linkBtn}>Se alle</Text>
                </TouchableOpacity>
            </View>

          {/* Kvitteringer */}
          <KvitteringCard />
        </View>

        </ScrollView>
      </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create ({
    container: {
        marginHorizontal: 24,
    },
    bgContainer: {
        backgroundColor: '#FFF',
    },
    headerContainer: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginHorizontal: 24,
        marginBottom: 48,
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
    linkBtn: {
        fontSize: 16,
        fontWeight: '600',
        color: '#2984FF',
    },
});