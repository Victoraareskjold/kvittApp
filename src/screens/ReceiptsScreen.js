import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Modal } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchBox from "../components/SearchBox";
import CategoriesFilter from "../components/CategoriesFilter";
import KvitteringCard from "../components/KvitteringCard";
import { useNavigation } from "@react-navigation/native";
import AddReceiptModal from "./AddReceiptModal";

const ReceiptsScreen = () => {

  let [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={{backgroundColor: '#FFF', flex: 1}}>
    <SafeAreaView />
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Header container */}
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Alle kvitteringer</Text>

          {/* Legg til btn */}
          <TouchableOpacity
            style={styles.leggTilBtnContainer}
            onPress={() => setModalVisible(true)}
          >

            <Text style={styles.leggTilBtn}>Legg til</Text>
          </TouchableOpacity>
        </View>

        {/* Searchbar */}
        <View style={styles.searchContainer}>
          <SearchBox />
        </View>

        {/* Categories filter */}
        <View style={styles.filterContainer}>
          <CategoriesFilter />
        </View>

        {/* Receipts */}
        <View style={styles.kvitteringContainer}>
          <Text style={styles.subHeader}>I dag</Text>

          {/* Receipt component */}
          {/* {<KvitteringCard />} */}
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <AddReceiptModal 
            onClose={() => setModalVisible(false)}
            addReceipt={(receipt) => console.log(receipt)}
          />
        </Modal>
      </ScrollView>
      </View>
  );
};

export default ReceiptsScreen;

const styles = StyleSheet.create ({

  /* Containers */
  headerContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  kvitteringContainer: {
    paddingHorizontal: 24,
  },
  searchContainer: {
    paddingHorizontal: 24,
  },
  subHeaderContainer: {
    flex: 1, 
    flexDirection: 'row', 
    alignItems: 'baseline', 
    justifyContent: 'space-between',
  },
  filterContainer: {
    paddingLeft: 24,
  },

  /* Buttons */
  leggTilBtn: {
    fontSize: 14, 
    color: "#fff", 
    fontWeight: "500",
  },
  leggTilBtnContainer: {
    backgroundColor: "#2984FF",
    borderRadius: 50,
    paddingVertical: 6,
    paddingHorizontal: 12,
    alignItems: "center",
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
});