import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import Colors from "../../../Styles/Colors";
import FontStyles from "../../../Styles/FontStyles";
import ButtonStyles from "../../../Styles/ButtonStyles";
import ContainerStyles from "../../../Styles/ContainerStyles";
import { Ionicons } from '@expo/vector-icons';

import { db, auth } from "../../../firebase";
import firebase from "firebase/compat/app";
import { firebaseConfig } from '../../../firebase';

import * as SecureStore from 'expo-secure-store';

const SettingsScreen = () => {
  const navigation = useNavigation()

  /* Logg ut btn */
  const handleSignOut = async () => {
    try {
      // Få tak i brukerens token
      const userToken = await SecureStore.getItemAsync('userToken');
      console.log("UserToken from SecureStore:", userToken);  // Logg dette for debugging

      // Slett tokenet fra Firebase Database
      const db = firebase.firestore();
      const userDocRef = db.collection('users').doc(firebase.auth().currentUser.uid);
      await userDocRef.update({ token: firebase.firestore.FieldValue.delete() });

      if (!snapshot.empty) {
        const docId = snapshot.docs[0].id;
        await tokenRef.doc(docId).delete();
      }
  
      // Logg brukeren ut fra Firebase
      await auth.signOut();
  
      // Send brukeren tilbake til Onboarding
      navigation.replace('Onboarding');
    } catch (error) {
      alert(error.message);
    }
  };    

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
            onPress={handleSignOut}
            o/* nPress={() => navigation.replace("Onboarding")} */
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