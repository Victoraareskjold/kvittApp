import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, Alert } from 'react-native'
import React from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { BackHandler } from 'react-native';

import { db } from "../../../firebase";
import firebase from "firebase/compat/app";
import { firebaseConfig } from '../../../firebase';

import Colors from "../../../Styles/Colors";
import FontStyles from "../../../Styles/FontStyles";
import ButtonStyles from "../../../Styles/ButtonStyles";
import ContainerStyles from "../../../Styles/ContainerStyles";
import ReceiptStyles from "../../../Styles/ReceiptStyles";

const UserSettings = () => {

    const [hasChanges, setHasChanges] = useState(false);

    const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: ''
    });

    const userId = firebase.auth().currentUser?.uid;

    useEffect(() => {
    if (!userId) return;

    const userDocRef = db.collection('users').doc(userId);
    const unsubscribe = userDocRef.onSnapshot((doc) => {
        if (doc.exists) setUser(doc.data());
    });

    return unsubscribe; // Unsubscribe on component unmount
    }, [userId]);
    
    /* Update changes */
    const updateUser = async () => {
        if (!userId) return;
        
        const userDocRef = db.collection('users').doc(userId);
        try {
          await userDocRef.update(user);
          alert('Profil oppdatert!');
        } catch (error) {
          console.error("Error updating document: ", error);
          alert('En feil oppsto ved oppdatering av profilen.');
        }
      };

      const deleteUser = () => {
        Alert.alert(
          'Bekreft sletting',
          'Er du sikker på at du vil slette din profil?',
          [
            {
              text: 'Avbryt',
              onPress: () => console.log('Avbrutt'),
              style: 'cancel',
            },
            {
              text: 'OK',
              onPress: async () => {
                try {
      
                  // Slett bruker fra Firestore
                  await db.collection('users').doc(userId).delete();
      
                  // Slett bruker fra Firebase Authentication
                  await firebase.auth().currentUser.delete();
      
                  alert('Profil slettet!');
                  navigation.navigate('Onboarding'); // Navn på Onboarding skjerm
                } catch (error) {
                  console.error("Error deleting user: ", error);
                  alert('En feil oppsto ved sletting av profilen.');
                }
              },
            },
          ],
          { cancelable: false },
        );
      };            

      const navigation = useNavigation();

  return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : '1'}
            style={[ContainerStyles.backgroundContainer, { paddingTop: 32 }]}
        >

        {/* Header container */}
        <View style={[ContainerStyles.centerContainer, { marginBottom: 32 }]}>
            <Image 
                value={user.profileImage}
                source={require('../../../assets/user.png')}
                style={ContainerStyles.userPhoto}
            />
        </View>

        {/* Text fields */}
        <View style={ContainerStyles.paddingContainer}>

            {/* Firstname */}
            <Text style={FontStyles.body2Fat}>Fornavn & mellomnavn</Text>
                <TextInput 
                    style={[ButtonStyles.defaultPlaceholder, { marginTop: 4 }]}
                    placeholder='Ola'

                    value={user.firstName}
                    onChangeText={(text) => {
                        setUser({ ...user, firstName: text });
                        setHasChanges(true); // Sett hasChanges til true når tekst endres
                      }}
                ></TextInput>

            {/* Lastname */}
            <Text style={FontStyles.body2Fat}>Etternavn</Text>
                <TextInput 
                    style={[ButtonStyles.defaultPlaceholder, { marginTop: 4, marginBottom: 32 }]}
                    placeholder='Nordmann'

                    value={user.lastName}
                    onChangeText={(text) => {
                        setUser({ ...user, lastName: text });
                        setHasChanges(true); // Sett hasChanges til true når tekst endres
                      }}
                ></TextInput>

            {/* Update user */}
            <TouchableOpacity 
                style={[ButtonStyles.primaryBtn, {}]}
                onPress={updateUser}
            >

                <Text style={[FontStyles.bigBtn]}>Oppdater profil</Text>
            </TouchableOpacity>

            {/* Delete user */}
            <TouchableOpacity onPress={deleteUser}>
                <Image 
                    source={require('../../../assets/trash.png')}
                    style={{ height: 20, width: 20, marginRight: 12}}
                />
                <Text style={[FontStyles.body2Fat, {textAlign: 'center'}]}>Slett profilen din</Text>
            </TouchableOpacity>

        </View>
        </KeyboardAvoidingView>
  )
}

export default UserSettings