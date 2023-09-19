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
  KeyboardAvoidingView,
  SectionList
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchBox from "../components/SearchBox";
import CategoriesFilter from "../components/CategoriesFilter";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import AddReceiptModal from "./AddReceiptModal";
import StoreLogos from "../components/StoreLogos";

import { auth, db } from "../../firebase";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  orderBy
} from "@firebase/firestore";

import Colors from "../../Styles/Colors";
import FontStyles from "../../Styles/FontStyles";
import ButtonStyles from "../../Styles/ButtonStyles";
import ContainerStyles from "../../Styles/ContainerStyles";
import ReceiptStyles from "../../Styles/ReceiptStyles";

const ReceiptsScreen = () => {
  const { navigate } = useNavigation();

  let [modalVisible, setModalVisible] = useState(false);
  let [isLoading, setIsLoading] = useState(true);
  let [isRefreshing, setIsRefreshing] = useState(false);
  let [receipts, setReceipts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Alle"); 
  const [groupedReceipts, setGroupedReceipts] = useState({});

  const formatDate = (dateString) => {
    const [day, month, year] = dateString.split('.');
    return `${year}-${month}-${day}`;
  };    

  useFocusEffect(
    React.useCallback(() => {
      loadReceiptList();
  
      return () => {};
    }, [selectedCategory])
  );  

  useEffect(() => {
    loadReceiptList();
  }, [selectedCategory]); 

  let loadReceiptList = async () => {
    try {
        let q;
        if (selectedCategory === "Alle") {
          q = query(
            collection(db, "receipts"), 
            /* where("userId", "==", auth.currentUser.uid), */
            orderBy("Date", "desc")
          );
        } else {
          q = query(
            collection(db, "receipts"),
            /* where("userId", "==", auth.currentUser.uid), */
            where("Category", "==", selectedCategory),
            orderBy("Date", "desc")
          );
        }    

        const querySnapshot = await getDocs(q);
        let receipts = [];
        querySnapshot.forEach((doc) => {
          let receipt = doc.data();
          receipt.id = doc.id;
          receipts.push(receipt);
        });

        receipts.sort((a, b) => {
            return dateStringToSortableNumber(b.Date) - dateStringToSortableNumber(a.Date);
        });

        const receiptsGroupedByDate = groupReceiptsByDate(receipts);
        
        setGroupedReceipts(receiptsGroupedByDate);
        setIsLoading(false);
        setIsRefreshing(false);

    } catch (error) {
        console.error("Feil ved henting av kvitteringer:", error);
    }
};

const dateStringToSortableNumber = (dateString) => {
  const [day, month, year] = dateString.split('.');
  return parseInt(year + month + day, 10);
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

  return groupedReceipts;
};  

  let renderReceiptItem = ({ item }) => {
    const StoreLogo = StoreLogos[item.Store.toLowerCase()] || StoreLogos["default"];

    return (
      <View>
        <Pressable
          onPress={() => navigate("ReceiptView", { item: item })}
          style={ReceiptStyles.receiptCard}
        >

          <View style={ReceiptStyles.receiptAlignment}>

            <View style={ReceiptStyles.cardAlignment}>
              <Image 
                source={StoreLogo}
                style={ReceiptStyles.iconStyle}
              />
              <View>
                <Text style={ReceiptStyles.storeText}>{item.Store}</Text>
                <Text style={ReceiptStyles.categoryText}>{item.Category}</Text>
              </View>
            </View>

            <View style={ReceiptStyles.priceContainer}>
                <Text style={ReceiptStyles.priceText}>{item.Price}</Text>
                <Text style={ReceiptStyles.priceText}> ,-</Text>
            </View>

          </View>
        </Pressable>
      </View>
    );
  };

  let addReceipt = async ({ store, selectedCategory, price, dateOfReceipt }) => {
    let receiptSave = {
      Store: store,
      Category: selectedCategory,
      Price: price,
      Date: dateOfReceipt,
      /* userId: auth.currentUser.uid, */
    };
    const docRef = await addDoc(collection(db, "receipts"), receiptSave);

    receiptSave.id = docRef.id;

    let updatedReceipts = [...receipts];
    updatedReceipts.push(receiptSave);

    setReceipts(updatedReceipts);
    loadReceiptList(); // Oppdaterer sectionList
  };

  return (
    <View style={ContainerStyles.backgroundContainer}>
      <SafeAreaView />

      {/* Header container */}
      <View style={ContainerStyles.headerContainer}>
        <Text style={FontStyles.header}>Alle kvitteringer</Text>

        {/* Add receipt btn */}
        <TouchableOpacity
          style={ButtonStyles.addReceiptBtn}
          onPress={() => setModalVisible(true)}
        >
          <Text style={FontStyles.smallBtn}>Legg til</Text>
        </TouchableOpacity>
      </View>

      {/* Searchbar */}
      <View style={{ paddingHorizontal: 24 }}>
        <SearchBox 
          placeholder={'Søk etter butikk eller produkt'}
        />
      </View>

      {/* Categories filter */}
      <View style={ContainerStyles.filterContainer}>
        <CategoriesFilter 
          onSelectCategory={setSelectedCategory}  
          excludeAll={false}/>{""}
      </View>

      {/* Receipts */}
      <View style={{flex: 1}}>
        {isLoading ? (
          <ActivityIndicator size='small' />
        ) : (
          <SectionList
            showsVerticalScrollIndicator={false}
            sections={Object.entries(groupedReceipts).map(([date, data]) => ({
              title: date,
              data,
            }))}
            keyExtractor={(item) => item.id}
            renderItem={renderReceiptItem}
            renderSectionHeader={({ section: { title } }) => (
              <Text style={ReceiptStyles.dateHeader}>{title}</Text>
            )}
            refreshing={isRefreshing}
            onRefresh={() => {
              loadReceiptList();
              setIsRefreshing(true);
            }}
          />
        )}
      </View>
      
      <Modal
        animationType="slide"
        /* transparent={true} */
        visible={modalVisible}
        presentationStyle='formSheet'
        onRequestClose={() => setModalVisible(false)}
      >
        <AddReceiptModal onClose={() => setModalVisible(false)} addReceipt={addReceipt} />
      </Modal>
    </View>
  );
};

export default ReceiptsScreen;
