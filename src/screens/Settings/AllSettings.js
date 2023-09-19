import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth } from "../../../firebase";
import { useNavigation } from "@react-navigation/native";

import Colors from "../../../Styles/Colors";
import FontStyles from "../../../Styles/FontStyles";
import ButtonStyles from "../../../Styles/ButtonStyles";
import ContainerStyles from "../../../Styles/ContainerStyles";
import { Ionicons } from '@expo/vector-icons';

const SettingsScreen = () => {
  const navigation = useNavigation()

  /* Logg ut btn */
  /* const handleSignOut = () => {
    auth
    .signOut()
    .then(() => {
      navigation.replace('Onboarding')
    })
    .catch(error => alert(error.message))
  } */

  return (
    <View style={ContainerStyles.backgroundContainer}>
      <SafeAreaView />

        {/* Header container */}
        <View style={ContainerStyles.headerContainer}>
          <Text style={FontStyles.header}>Innstillinger</Text>
        </View>

        {/* Settings container */}
        <View style={ContainerStyles.paddingContainer}>

          {/* My account */}
          <TouchableOpacity 
            style={ContainerStyles.settingsBtnContainer}
            onPress={() => navigation.navigate("Din profil")}
          >
            <Image 
              source={require('../../../assets/innstillinger/bruker.png')}
              style={ButtonStyles.settingsIcon}
            />
            <Text style={FontStyles.body}>Din profil</Text>
          </TouchableOpacity>

          {/* My cards */}
          <TouchableOpacity 
            style={ContainerStyles.settingsBtnContainer}
            onPress={() => navigation.navigate("Dine kort")}
          >
            <Image 
              source={require('../../../assets/innstillinger/bankkort.png')}
              style={ButtonStyles.settingsIcon}
            />
            <Text style={FontStyles.body}>Mine kort</Text>
          </TouchableOpacity>
          
          {/* Help and support */}
          <TouchableOpacity style={ContainerStyles.settingsBtnContainer}>
            <Image 
              source={require('../../../assets/innstillinger/_.png')}
              style={ButtonStyles.settingsIcon}
            />
            <Text style={FontStyles.body}>Hjelp & kundestøtte</Text>
          </TouchableOpacity>
          
          {/* Sign out */}
          <TouchableOpacity 
            /* onPress={handleSignOut} */
            onPress={() => navigation.replace("Onboarding")}
            style={ContainerStyles.settingsBtnContainer}
          >
            <Image 
              source={require('../../../assets/innstillinger/loggut.png')}
              style={ButtonStyles.settingsIcon}
            />
            <Text style={FontStyles.body}>Logg ut</Text>
          </TouchableOpacity>
          
        </View>

    </View>
  );
};

export default SettingsScreen;