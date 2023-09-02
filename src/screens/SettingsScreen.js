import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth } from "../../firebase";
import { useNavigation } from "@react-navigation/native";

const SettingsScreen = () => {
  const navigation = useNavigation()

  /* Logg ut btn */
  const handleSignOut = () => {
    auth
    .signOut()
    .then(() => {
      navigation.replace('LoginScreen')
    })
    .catch(error => alert(error.message))
  }

  return (
    <View style={{backgroundColor: '#FFF', flex: 1}}>
    <SafeAreaView />
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Header container */}
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Innstillinger</Text>
        </View>

        {/* Innstillinger */}
        <View style={styles.settingsContainer}>

          {/* Min bruker */}
          <TouchableOpacity style={styles.settingsBtnContainer}>
            <Image 
            source={require('../../assets/innstillinger/bruker.png')}
            style={styles.settingsIcon}
            />
            <Text>Min bruker</Text>
          </TouchableOpacity>

          {/* Mine kort */}
          <TouchableOpacity style={styles.settingsBtnContainer}>
            <Image 
            source={require('../../assets/innstillinger/bankkort.png')}
            style={styles.settingsIcon}
            />
            <Text>Mine kort</Text>
          </TouchableOpacity>
          
          {/* Hjelp & kundestøtte */}
          <TouchableOpacity style={styles.settingsBtnContainer}>
            <Image 
            source={require('../../assets/innstillinger/_.png')}
            style={styles.settingsIcon}
            />
            <Text>Hjelp & kundestøtte</Text>
          </TouchableOpacity>
          
          {/* Logg ut */}
          <TouchableOpacity 
          onPress={handleSignOut}
          style={styles.settingsBtnContainer}
          >
            <Image 
            source={require('../../assets/innstillinger/loggut.png')}
            style={styles.settingsIcon}
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

  /* Containers */
    headerContainer: {
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: 'row',
      paddingHorizontal: 24,
      marginBottom: 32,
    },
    settingsContainer: {
        paddingHorizontal: 24,
    },
    settingsBtnContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
    },

    /* Text */
    header: {
        fontSize: 28,
        fontWeight: 'bold',
    },
    subHeader: {
        fontSize: 24,
    },
    linkBtn: {
        fontSize: 16,
        fontWeight: '600',
        color: '#2984FF',
    },

    /* Icons */
    settingsIcon: {
      height: 24, 
      width: 24, 
      resizeMode: 'contain', 
      marginRight: 12,
    },
});