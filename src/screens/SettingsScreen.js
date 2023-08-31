import { StyleSheet, Text, View, Image, placeholder, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import KvitteringCard from "../components/KvitteringCard";

const SettingsScreen = ({navigation}) => {
  return (
    <View style={{backgroundColor: '#FFF', flex: 1}}>
    <SafeAreaView style={{ backgroundColor: "#FFF"}}/>
      <ScrollView  
      showsVerticalScrollIndicator={false}
      >

        {/* Header container */}
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Innstillinger</Text>
        </View>

        {/* Innstillinger */}
        <View style={styles.container}>

          {/* Min bruker */}
          <TouchableOpacity style={styles.innstillingerContainer}>
            <Image 
            source={require('../../assets/innstillinger/bruker.png')}
            style={{height: 24, width: 24, resizeMode: 'contain', marginRight: 12}}
            />
            <Text>Min bruker</Text>
          </TouchableOpacity>

          {/* Mine kort */}
          <TouchableOpacity style={styles.innstillingerContainer}>
            <Image 
            source={require('../../assets/innstillinger/bankkort.png')}
            style={{height: 24, width: 24, resizeMode: 'contain', marginRight: 12}}
            />
            <Text>Mine kort</Text>
          </TouchableOpacity>
          
          {/* Hjelp & kundestøtte */}
          <TouchableOpacity style={styles.innstillingerContainer}>
            <Image 
            source={require('../../assets/innstillinger/_.png')}
            style={{height: 24, width: 24, resizeMode: 'contain', marginRight: 12}}
            />
            <Text>Hjelp & kundestøtte</Text>
          </TouchableOpacity>
          
          {/* Logg ut */}
          <TouchableOpacity 
          onPress={() => navigation.navigate('WelcomeScreen')}
          style={styles.innstillingerContainer}
          >
            <Image 
            source={require('../../assets/innstillinger/loggut.png')}
            style={{height: 24, width: 24, resizeMode: 'contain', marginRight: 12}}
            />
            <Text>Logg ut</Text>
          </TouchableOpacity>
          
        </View>

      </ScrollView>
    </View>
  );
};

export default SettingsScreen;

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
    innstillingerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
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