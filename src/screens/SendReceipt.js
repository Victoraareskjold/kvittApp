import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth, db } from "../../firebase";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  updateDoc,
} from "@firebase/firestore";
import Colors from "../../Styles/Colors";
import FontStyles from "../../Styles/FontStyles";
import ContainerStyles from "../../Styles/ContainerStyles";
import SearchResults from "../components/SearchResults"; // Sjekk importen her

const SendReceipt = () => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // Funksjon for å søke etter brukere
  const searchUsers = async () => {
    try {
      // Gjør Firestore-spørring basert på søkeordet (her søker vi etter brukernavn)
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("navn", "==", searchTerm));
      const querySnapshot = await getDocs(q);

      const results = [];
      querySnapshot.forEach((doc) => {
        results.push({
          id: doc.id, // Bruk id i stedet for uid for nøkkelen
          name: doc.data().navn,
          // Legg til andre felt om nødvendig
        });
      });

      setSearchResults(results);
    } catch (error) {
      console.error("Feil ved søk etter brukere: ", error);
    }
  };

  // Funksjon for å legge til en venn
  const addFriend = async (vennUID) => {
    try {
      const currentUserUID = auth.currentUser.uid;
      const friendsRef = collection(db, "friends");
      const friendsQuery = query(
        friendsRef,
        where("uid", "==", currentUserUID)
      );
      const friendsSnapshot = await getDocs(friendsQuery);

      if (!friendsSnapshot.empty) {
        // Hent vennelisten for den nåværende brukeren
        const venneliste = friendsSnapshot.docs[0].data().venner;

        // Sjekk om vennen allerede er i vennelisten før du legger til
        if (!venneliste.includes(vennUID)) {
          // Legg til vennen i vennelisten
          venneliste.push(vennUID);

          // Oppdater vennelisten i Firestore
          await updateDoc(friendsSnapshot.docs[0].ref, {
            venner: venneliste,
          });
        } else {
          console.log("Vennen er allerede i vennelisten.");
        }
      }
    } catch (error) {
      console.error("Feil ved legging til venn: ", error);
    }
  };

  // Utfør søket fortløpende mens brukeren taster
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm.trim() !== "") {
        searchUsers();
      } else {
        setSearchResults([]);
      }
    }, 100); // Vent 300 millisekunder etter at brukeren slutter å skrive

    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentUserUID = auth.currentUser.uid;
        const friendsRef = collection(db, "friends");
        const friendsQuery = query(
          friendsRef,
          where("uid", "==", currentUserUID)
        );
        const friendsSnapshot = await getDocs(friendsQuery);

        if (!friendsSnapshot.empty) {
          // Hent vennelisten for den nåværende brukeren
          const venneliste = friendsSnapshot.docs[0].data().venner;
          setFriends(venneliste);
        }
      } catch (error) {
        console.error("Feil ved henting av venneliste: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={ContainerStyles.backgroundContainer}>
      <SafeAreaView />

      {/* Header container */}
      <View style={ContainerStyles.headerContainer}>
        <Text style={FontStyles.header}>Dine kontakter</Text>
      </View>

      {/* Søkefelt */}
      <TextInput
        placeholder="Søk etter brukere"
        value={searchTerm}
        onChangeText={(text) => setSearchTerm(text)}
      />

      {/* Vis søkeresultater */}
      <SearchResults results={searchResults} sendFriendRequest={addFriend} />

      {/* Vis venneliste */}
      <FlatList
        data={friends}
        keyExtractor={(venn) => venn}
        renderItem={({ item: venn }) => (
          <TouchableOpacity onPress={() => {}}>
            <Text>{venn}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default SendReceipt;
