import React, { useState, useEffect } from "react";
import { View, Text, TextInput, FlatList, Image, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { db, auth } from "../../firebase";
import { collection, query, where, getDocs, addDoc, orderBy } from "@firebase/firestore";
import ContainerStyles from "../../Styles/ContainerStyles";
import FontStyles from "../../Styles/FontStyles";
import SearchResults from "../components/SearchResults";

import ReceiptStyles from "../../Styles/ReceiptStyles";

import * as Permissions from 'expo-permissions';
import * as Contacts from 'expo-contacts';

const SendReceipt = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [recentContacts, setRecentContacts] = useState([]);
    const [hasSearched, setHasSearched] = useState(false);

      const fetchUsers = async () => {
        const usersQuery = query(
          collection(db, "users"),
          where("uid", "!=", auth.currentUser.uid)
        );
    
        const snapshot = await getDocs(usersQuery);
        const usersList = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          usersList.push({ ...data, id: doc.id, name: `${data.firstName} ${data.lastName}` });
        });
        
        setRecentContacts(usersList);
    };
    
    useEffect(() => {
      fetchUsers();
  }, []);  

    /* Søkefunksjon */
    useEffect(() => {
        let isCancelled = false; // Ny linje for å sjekke om komponenten er avmontert
    
        const fetchUsers = async () => {
            if (!isCancelled) {
                setIsLoading(true); 
                setHasSearched(true);
            }
    
            if (searchTerm === "" || searchTerm.length < 2) {
                if (!isCancelled) {
                  setSearchResults([]);
                  setIsLoading(false);
                }
                return;
              }

        // Søk etter navn
        const nameQuery = query(
            collection(db, "users"),
            where("firstName", ">=", searchTerm),
            where("firstName", "<=", searchTerm + "\uf8ff")
        );
        const nameSnapshot = await getDocs(nameQuery);
        const nameUsers = [];
        nameSnapshot.forEach((doc) => {
            const data = doc.data();
            const fullName = `${data.firstName} ${data.lastName}`;
            if (fullName.includes(searchTerm)) {
                nameUsers.push({ ...data, id: doc.id, name: fullName });
            }
        });

        // Søk etter telefonnummer med automatisk +47-prefix
        const phoneSearchTerm = "+47" + searchTerm;
        const phoneQuery = query(
            collection(db, "users"),
            where("phoneNumber", ">=", phoneSearchTerm),
            where("phoneNumber", "<=", phoneSearchTerm + "\uf8ff")
        );
        const phoneSnapshot = await getDocs(phoneQuery);
        const phoneUsers = [];
        phoneSnapshot.forEach((doc) => {
            const data = doc.data();
            const fullName = `${data.firstName} ${data.lastName}`;
            if (data.phoneNumber.includes(phoneSearchTerm)) {
                phoneUsers.push({ ...data, id: doc.id, name: fullName });
            }
        });

        // Kombiner og sett resultatene
        const combinedUsers = [...nameUsers, ...phoneUsers];
        if (!isCancelled) {
            setSearchResults(combinedUsers);
            setIsLoading(false); 
        }
    };

    fetchUsers();

    return () => {
        isCancelled = true; // Oppdater isCancelled når komponenten avmonteres
    };
}, [searchTerm]);

    /* const sendFriendRequest = async (userId) => {
        try {
            await addDoc(collection(db, "friendRequests"), {
                senderId: auth.currentUser.uid, // ID of the sender
                receiverId: userId // ID of the receiver
            });
            alert("Venneforespørsel sendt!");
        } catch (error) {
            alert("Det oppsto en feil ved sending av venneforespørsel.");
        }
    }; */

    return (
        <View style={ContainerStyles.backgroundContainer}>
            <SafeAreaView />

            <View style={ContainerStyles.headerContainer}>
                <Text style={FontStyles.header}>Dine kontakter</Text>
            </View>

            <View style={{ paddingHorizontal: 24}}>
              <View style={ContainerStyles.searchContainer}>

                <Image 
                    source={require("../../assets/searchIcon.png")}
                    style={{ width: 18, height: 18, marginRight: 4 }}
                />

                <TextInput
                    style={{ width: '100%' }}
                    placeholder="Søk etter brukere"
                    value={searchTerm}
                    onChangeText={(text) => setSearchTerm(text)}
                />

              </View>

              {isLoading ? (
                    <ActivityIndicator size="small" style={{marginTop: 24}} />
                ) : hasSearched && searchResults.length === 0 && searchTerm.length >= 3 ? ( // Sjekk om brukeren har søkt, ingen resultater er funnet, og søkefrasen har minst 3 tegn
                    <Text style={[FontStyles.body2, {marginTop: 24, textAlign: 'center'}]}>Ingen treff</Text>
                ) : (
                    <SearchResults 
                        results={searchResults} 
                        /* sendFriendRequest={sendFriendRequest} */ 
                        style={ContainerStyles.paddingContainer}
                    />
                )}

            </View>

            {/* All contacts */}
            <View style={[ContainerStyles.contactsContainer, {marginTop: 20, flex: 1}]}>
              {/* <Text style={[FontStyles.subHeader, {marginBottom: 12}]}>Alle kontakter</Text> */}
              <FlatList
                  data={recentContacts}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => (

                      <View style={{ paddingVertical: 12 }}>

                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <Image 
                              source={require('../../assets/user.png')}
                              style={ContainerStyles.smallerUserPhoto}
                          />
                          <Text style={ReceiptStyles.storeText}>{item.name}</Text>
                        </View>

                      </View>

                  )}
              />
            </View>

        </View>
    );
};

export default SendReceipt;