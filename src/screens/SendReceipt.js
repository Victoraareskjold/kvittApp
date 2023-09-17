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
import SearchResults from "../components/SearchResults";

const SendReceipt = () => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

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
        value={''}
        onChangeText={(text) => setSearchTerm(text)}
      />

      {/* Vis søkeresultater */}
      <SearchResults results={searchResults} sendFriendRequest={''} />

      {/* Vis venneliste */}
      <FlatList
        data={''}
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
