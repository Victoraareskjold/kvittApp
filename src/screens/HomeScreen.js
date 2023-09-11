import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  SectionList,
  Pressable,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import AddReceiptModal from "./AddReceiptModal";
import { auth, db } from "../../firebase";
import { collection, query, where, getDocs } from "@firebase/firestore";

const HomeScreen = () => {
  const navigation = useNavigation();

  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [receipts, setReceipts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Alle");

  useEffect(() => {
    loadReceiptList();
  }, [selectedCategory]);

  const loadReceiptList = async () => {
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
    let fetchedReceipts = [];
    querySnapshot.forEach((doc) => {
      let receipt = doc.data();
      receipt.id = doc.id;
      fetchedReceipts.push(receipt);
    });

    fetchedReceipts.sort((a, b) => new Date(b.Date) - new Date(a.Date));

    const limitedReceipts = fetchedReceipts.slice(0, 5);

    setReceipts(limitedReceipts);
    setIsLoading(false);
    setIsRefreshing(false);
  };

  const groupReceiptsByDate = (receipts) => {
    const groupedReceipts = {};

    receipts.forEach((receipt) => {
      const date = receipt.Date;
      if (!groupedReceipts[date]) {
        groupedReceipts[date] = [];
      }
      groupedReceipts[date].push(receipt);
    });

    return Object.keys(groupedReceipts).map(date => ({
      title: date,
      data: groupedReceipts[date]
    }));
  };

  const sectionedReceipts = groupReceiptsByDate(receipts);

  let renderReceiptItem = ({ item }) => {
    return (
      <View>
        <Pressable
          onPress={() => navigate("KvitteringDetails", { item: item })}
          style={{
            backgroundColor: "#FFF",
            borderRadius: 15,
            marginBottom: 0,
            alignItems: "center",
            paddingHorizontal: 24,
            paddingVertical: 20,

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
              <Image source={item.Image} style={{ width: 24, height: 24, marginRight: 12 }} />
              <View>
                <Text style={{ fontSize: 18, textTransform: 'capitalize' }}>{item.Store}</Text>
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

  return (
    <View style={{ backgroundColor: "#FFF", flex: 1 }}>
      <SafeAreaView />

      {/* Header container */}
    <View style={styles.headerContainer}>
      <Text style={styles.header}>Hjem</Text>
    </View>

      {/* Receipts */}
      <View style={styles.kvitteringContainer}>
        <View style={styles.nyligeContainer}>
          <Text style={styles.subHeader}>Nylige kvitteringer</Text>
          {/* Se alle btn */}
          <TouchableOpacity 
            onPress={() => navigation.navigate('ReceiptsScreen')}
          >
              <Text style={styles.linkBtn}>Se alle</Text>
          </TouchableOpacity>
      </View>
        {isLoading ? (
          <ActivityIndicator size='small' />
        ) : (
          <SectionList
            showsVerticalScrollIndicator={false}
            sections={sectionedReceipts}
            keyExtractor={(item) => item.id}
            renderItem={renderReceiptItem}
            refreshing={isRefreshing}
            onRefresh={() => {
              loadReceiptList();
              setIsRefreshing(true);
            }}
          />
        )}
      </View>
    </View>
  );
};

export default HomeScreen;

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
    paddingHorizontal: 0,
    flex: 1,
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
  nyligeContainer: {
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
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
  dateHeader: {
    backgroundColor: '#FBFBFB',
    fontSize: 20,
    marginBottom: 0,
    paddingVertical: 2,
    paddingHorizontal: 24,
  },
});