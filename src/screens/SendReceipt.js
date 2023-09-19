import React, { useState, useEffect } from "react";
import { View, Text, TextInput, FlatList, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { db } from "../../firebase";
import { collection, query, where, getDocs, addDoc, orderBy } from "@firebase/firestore";
import ContainerStyles from "../../Styles/ContainerStyles";
import FontStyles from "../../Styles/FontStyles";
import SearchResults from "../components/SearchResults";

import ReceiptStyles from "../../Styles/ReceiptStyles";

const SendReceipt = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const [recentContacts, setRecentContacts] = useState([]);

    useEffect(() => {
      const fetchRecentUsers = async () => {
          const recentUsersQuery = query(
              collection(db, "users"),
              /* orderBy("desc"), */
              /* limit(10) // henter de 10 siste brukerne, juster etter behov */
          );
  
          const snapshot = await getDocs(recentUsersQuery);
          const usersList = [];
          snapshot.forEach(doc => {
              const data = doc.data();
              usersList.push({ ...data, id: doc.id, name: `${data.firstName} ${data.lastName}` });
          });
  
          console.log("Recent Contacts:", recentContacts);
          setRecentContacts(usersList);
      };
  
      fetchRecentUsers();
  }, []);

    useEffect(() => {
        const fetchUsers = async () => {
            if (searchTerm === "") {
                setSearchResults([]);
                return;
            }

            const userQuery = query(
                collection(db, "users"),
                where("firstName", ">=", searchTerm),
                where("firstName", "<=", searchTerm + "\uf8ff")
            );
            const userSnapshot = await getDocs(userQuery);
            const users = [];
            userSnapshot.forEach((doc) => {
                const data = doc.data();
                const fullName = `${data.firstName} ${data.lastName}`;
                if (fullName.includes(searchTerm) || data.phoneNumber.includes(searchTerm)) {
                    users.push({ ...data, id: doc.id, name: fullName });
                }
            });
            setSearchResults(users);
        };

        fetchUsers();
    }, [searchTerm]);

    const sendFriendRequest = async (userId) => {
        try {
            await addDoc(collection(db, "friendRequests"), {
                senderId: auth.currentUser.uid, // ID of the sender
                receiverId: userId // ID of the receiver
            });
            alert("Venneforespørsel sendt!");
        } catch (error) {
            alert("Det oppsto en feil ved sending av venneforespørsel.");
        }
    };

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

                <SearchResults 
                    results={searchResults} 
                    sendFriendRequest={sendFriendRequest} 
                    style={ContainerStyles.paddingContainer}
                />

            </View>

            {/* Recent contacts */}
            {/* <View style={[ContainerStyles.contactsContainer, {marginTop: 32}]}>
              <Text style={[FontStyles.subHeader, {marginBottom: 12}]}>Nylige kontakter</Text>
              <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  data={recentContacts}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => (

                      <View style={{ marginRight: 24 }}>
                        <Image 
                            source={require('../../assets/user.png')}
                            style={ContainerStyles.smallUserPhoto}
                        />
                        <Text 
                            style={[ContainerStyles.userName, ReceiptStyles.storeText]}
                            numberOfLines={2}
                            ellipsizeMode='tail'
                        >{item.firstName}</Text>
                      </View>

                  )}
              />
            </View> */}

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
                          {/* <Text style={{ marginRight: 12 }}>{item.profileImage}</Text> */}
                          <Text style={ReceiptStyles.storeText}>{item.name}</Text>
                        </View>

                      </View>

                  )}
                  style={{ height: 200 }}
              />
            </View>

        </View>
    );
};

export default SendReceipt;