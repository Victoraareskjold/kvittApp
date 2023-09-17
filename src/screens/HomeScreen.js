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
  Button,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import AddReceiptModal from "./AddReceiptModal";
import { db } from "../../firebase";
import { collection, 
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

const HomeScreen = () => {
  const navigation = useNavigation();

  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [receipts, setReceipts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Alle");

  const [groupedReceipts, setGroupedReceipts] = useState({});

  const dateStringToSortableNumber = (dateString) => {
    const [day, month, year] = dateString.split('.');
    return parseInt(year + month + day, 10);
  };  

  useFocusEffect(
    React.useCallback(() => {
      loadReceiptList();
  
      return () => {};
    }, [selectedCategory])
  );  

  const loadReceiptList = async () => {
    let q;
    if (selectedCategory === "Alle") {
      /* console.log(db); */
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
    let fetchedReceipts = [];
    querySnapshot.forEach((doc) => {
      let receipt = doc.data();
      receipt.id = doc.id;
      fetchedReceipts.push(receipt);
    });

    // Sorter kvitteringene etter dato-feltet som strenger
    fetchedReceipts.sort((a, b) => {
      return dateStringToSortableNumber(b.Date) - dateStringToSortableNumber(a.Date);
    });  

    const limitedReceipts = fetchedReceipts.slice(0, 5);

    // Sort and group the limited receipts
    limitedReceipts.sort((a, b) => {
        return dateStringToSortableNumber(b.Date) - dateStringToSortableNumber(a.Date);
    });

    const receiptsGroupedByDate = groupReceiptsByDate(limitedReceipts);

    setGroupedReceipts(receiptsGroupedByDate);
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
    return groupedReceipts;
  };

  let renderReceiptItem = ({ item }) => {
    return (
      <View style={{flex: 1}}>
        <Pressable
          onPress={() => navigation.navigate("KvitteringDetails", { item: item })}
          style={ReceiptStyles.receiptCard}
        >

          <View style={ReceiptStyles.receiptAlignment}>

            <View style={ReceiptStyles.cardAlignment}>
              <Image 
                source={require('../../assets/StoreIcon/rema1000.png')} 
                style={ReceiptStyles.iconStyle} 
              />
              <View>
                <Text style={ReceiptStyles.storeText}>{item.Store}</Text>
                <Text style={ReceiptStyles.dateText}>{item.Date}</Text>
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

  return (
    <View style={ContainerStyles.backgroundContainer}>
      <SafeAreaView />

      {/* Header container */}
    <View style={ContainerStyles.headerContainer}>
      <Text style={FontStyles.header}>Hjem</Text>
    </View>

      {/* Receipts */}
        <View style={ContainerStyles.subHeaderContainer}>
          <Text style={FontStyles.subHeader}>Nylige kvitteringer</Text>

          {/* Se alle btn */}
          <TouchableOpacity 
            onPress={() => navigation.navigate('ReceiptsScreen')}
          >
              <Text style={FontStyles.linkBtn}>Se alle</Text>
          </TouchableOpacity>

          {/* Recent receipts list */}
          </View>
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
                refreshing={isRefreshing}
                onRefresh={() => {
                  loadReceiptList();
                  setIsRefreshing(true);
                }}
              />
            )}
          </View>
  );
};

export default HomeScreen;