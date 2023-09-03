import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Modal, ActivityIndicator, FlatList, PanResponder } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchBox from "../components/SearchBox";
import CategoriesFilter from "../components/CategoriesFilter";
import KvitteringCard from "../components/KvitteringCard";
import { useNavigation } from "@react-navigation/native";
import AddReceiptModal from "./AddReceiptModal";

import { auth, db } from "../../firebase";
import { collection, addDoc, query, where, getDocs } from "@firebase/firestore";

const ReceiptsScreen = () => {

  let [modalVisible, setModalVisible] = useState(false);
  let [isLoading, setIsLoading] = useState(true);
  let [isRefreshing, setIsRefreshing] = useState(false);
  let [receipts, setReceipts] = useState([]);

  let loadReceiptList = async () => {
    const q = query(collection(db, 'receipts'), where ('userId', '==', auth.currentUser.uid));

    const querySnapshot = await getDocs(q);
    let receipts = [];
    querySnapshot.forEach((doc) => {
      let receipt = doc.data();
      receipt.id = doc.id;
      receipts.push(receipt);
    });

    setReceipts(receipts);
    setIsLoading(false);
    setIsRefreshing(false);
  };

  if (isLoading) {
    loadReceiptList();
  }  

  let renderReceiptItem = ({item}) => {
    return (
      <View>
        <Text>{item.text}</Text>
      </View>
    );
  }

  let addReceipt = async (receipt) => {
    let receiptSave = {
      text: receipt,
      completed: false,
      userId: auth.currentUser.uid
    }
    const docRef = await addDoc(collection(db, 'receipts'), receiptSave);

    receiptSave.id = docRef.id;

    let updatedReceipts = [...receipts];
    updatedReceipts.push(receiptSave);

    setReceipts(updatedReceipts);
  };

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

            {isLoading ? (
            <ActivityIndicator size='small' />
            ) : (
              <FlatList
                style={{ height: 500, backgroundColor: 'red' }}

                data={receipts}
                refreshing={isRefreshing}
                onRefresh={() => {
                  loadReceiptList();
                  setIsRefreshing(true);
                }}
                renderItem={renderReceiptItem}
                keyExtractor={item => item.id}
              />
            )}

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
            addReceipt={addReceipt}
/*             addStore={(store) => console.log(store)} */
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