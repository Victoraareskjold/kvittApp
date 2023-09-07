import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  FlatList,
  Pressable,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchBox from "../components/SearchBox";
import CategoriesFilter from "../components/CategoriesFilter";
import { useNavigation } from "@react-navigation/native";
import AddReceiptModal from "./AddReceiptModal";

import { auth, db } from "../../firebase";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
} from "@firebase/firestore";

const ReceiptsScreen = () => {
  const { navigate } = useNavigation();

  let [modalVisible, setModalVisible] = useState(false);
  let [isLoading, setIsLoading] = useState(true);
  let [isRefreshing, setIsRefreshing] = useState(false);
  let [receipts, setReceipts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Alle"); 

  useEffect(() => {
    loadReceiptList();
  }, [selectedCategory]); 

  let loadReceiptList = async () => {
    let q;
    if (selectedCategory === "Alle") {
      q = query(collection(db, "receipts"), where("userId", "==", auth.currentUser.uid));
    } else {
      q = query(
        collection(db, "receipts"),
        where("userId", "==", auth.currentUser.uid),
        where("Category", "==", selectedCategory) 
      );
    }

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

  let renderReceiptItem = ({ item }) => {
    return (
      <View>
        <Pressable
          onPress={() => navigate("KvitteringDetails", { item: item })}
          style={{
            backgroundColor: "#FFF",
            borderRadius: 15,
            marginBottom: 12,
            alignItems: "center",
            paddingHorizontal: 12,
            paddingVertical: 12,

            shadowColor: "#000",
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0,
            shadowRadius: 0,
          }}
        >
          {/* Kvittering innhold */}
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {/* Ikon, kategori og dato */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                height: 36,
              }}
            >
              <Image source={item.image} style={{ width: 24, height: 24, marginRight: 12 }} />
              <View>
                <Text style={{ fontSize: 16 }}>{item.Store}</Text>
                <Text style={{ opacity: 0.6 }}>{item.Date}</Text>
              </View>
            </View>

            {/* Pris */}
            <View style={styles.priceContainer}>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ color: "#2984FF", fontWeight: "600" }}>{item.Price}</Text>
                <Text style={{ color: "#2984FF", fontWeight: "600" }}> ,-</Text>
              </View>
            </View>
          </View>
        </Pressable>
      </View>
    );
  };

  let addReceipt = async ({ store, receipt, price, dateOfReceipt }) => {
    let receiptSave = {
      Store: store,
      Category: receipt,
      Price: price,
      Date: dateOfReceipt,
      userId: auth.currentUser.uid,
    };
    const docRef = await addDoc(collection(db, "receipts"), receiptSave);

    receiptSave.id = docRef.id;

    let updatedReceipts = [...receipts];
    updatedReceipts.push(receiptSave);

    setReceipts(updatedReceipts);
  };

  return (
    <View style={{ backgroundColor: "#FFF", flex: 1 }}>
      <SafeAreaView />

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
        <CategoriesFilter onSelectCategory={setSelectedCategory} />{""}
        {/* Oppdater den valgte kategorien */}
      </View>

      {/* Receipts */}
      <View style={styles.kvitteringContainer}>
        <Text style={styles.subHeader}>I dag</Text>

        {isLoading ? (
          <ActivityIndicator size="small" />
        ) : (
          <FlatList
            /* style={{ padding: 12, backgroundColor: '#FBFBFB', borderRadius: 15 }} */
            data={receipts}
            refreshing={isRefreshing}
            onRefresh={() => {
              loadReceiptList();
              setIsRefreshing(true);
            }}
            keyExtractor={(item) => item.id}
            renderItem={renderReceiptItem}
            nestedScrollEnabled={true}
          />
        )}

        {/* Receipt component */}
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <AddReceiptModal onClose={() => setModalVisible(false)} addReceipt={addReceipt} />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  /* Containers */
  headerContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
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
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
  },
  filterContainer: {
    paddingLeft: 24,
  },
  priceContainer: {
    backgroundColor: "#F4F9FF",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 3,
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
    fontWeight: "bold",
  },
  subHeader: {
    fontSize: 24,
    marginBottom: 12,
  },
  linkBtn: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2984FF",
  },
});

export default ReceiptsScreen;
