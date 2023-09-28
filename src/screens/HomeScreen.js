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
  FlatList
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import AddReceiptModal from "./AddReceiptModal";
import StoreLogos from "../components/StoreLogos";

import { auth, db } from "../../firebase";
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
import RecentContacts from "../components/RecentContacts";

const HomeScreen = () => {

  const navigation = useNavigation();

  const { navigate } = useNavigation();

  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [receipts, setReceipts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Alle");

  const [groupedReceipts, setGroupedReceipts] = useState({});

  const [recentContacts, setRecentContacts] = useState([]);

  const dateStringToSortableNumber = (dateString) => {
    const [day, month, year] = dateString.split('.');
    return parseInt(year + month + day, 10);
  };  

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

  useFocusEffect(
    React.useCallback(() => {
      loadReceiptList();
  
      return () => {};
    }, [selectedCategory])
  );  

  let loadReceiptList = async () => {
    try {
        let receipts = [];
  
        // Load user's own receipts
        let q;
        if (selectedCategory === "Alle") {
          q = query(
            collection(db, "receipts"), 
            where("userId", "==", auth.currentUser.uid),
            orderBy("Date", "desc")
          );
        } else {
          q = query(
            collection(db, "receipts"),
            where("userId", "==", auth.currentUser.uid),
            where("Category", "==", selectedCategory),
            orderBy("Date", "desc")
          );
        }
  
        let querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          let receipt = doc.data();
          receipt.id = doc.id;
          receipts.push(receipt);
        });
  
        // Load shared receipts
        let sharedReceiptsQuery = query(
          collection(db, "sharedReceipts"), 
          where("receiverId", "==", auth.currentUser.uid)
        );
  
        querySnapshot = await getDocs(sharedReceiptsQuery);

        // Anta at querySnapshot er resultatet av den delte kvitteringsspørringen
        querySnapshot.docs.forEach(async (doc) => {
          const sharedReceiptData = doc.data(); // Dette vil gi deg dataene for det delte kvitteringsdokumentet
          
          try {
              // Bruke receiptId for å hente det faktiske kvitteringsdokumentet
              const receiptDocRef = await db.collection('receipts').doc(sharedReceiptData.receiptId).get();
              
              if (!receiptDocRef.exists) {
                  console.log(`No receipt found for id ${sharedReceiptData.receiptId}`);
                  return;
              }
              
              const receiptData = receiptDocRef.data(); // Dette vil gi deg dataene for kvitteringsdokumentet
              
              // Nå kan du kombinere sharedReceiptData og receiptData som du vil
              const combinedData = { ...sharedReceiptData, ...receiptData, id: sharedReceiptData.receiptId };
              
          } catch (error) {
              console.error('Error fetching receipt:', error);
          }
        });

        await Promise.all(querySnapshot.docs.map(async (doc) => {
          try {
            const sharedReceiptData = doc.data(); 
            const receiptDocRef = await db.collection('receipts').doc(sharedReceiptData.receiptId).get();
                      
            if (!receiptDocRef.exists) return;
                      
            const receiptData = receiptDocRef.data(); 

            // Når du legger til combinedData til receipts array
            const combinedData = {
              ...sharedReceiptData,
              ...receiptData,
              id: sharedReceiptData.receiptId,
              isShared: true // eller bruk isShared fra receiptData hvis det er tilgjengelig
            };            

            receipts.push(combinedData);  // Legger til combinedData til receipts array
          } catch (error) {
            console.error('Error fetching receipt:', error);
          }
        }));

        // Sort and group the combined list of receipts
        receipts.sort((a, b) => dateStringToSortableNumber(b.Date) - dateStringToSortableNumber(a.Date));
        const receiptsGroupedByDate = groupReceiptsByDate(receipts);
        
        setGroupedReceipts(receiptsGroupedByDate);
        setIsLoading(false);
        setIsRefreshing(false);
  
    } catch (error) {
        console.error("Feil ved henting av kvitteringer:", error);
    }
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

              <View style={{flexDirection: 'column'}}>

                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={ReceiptStyles.storeText}>{item.Store}</Text>
                  {/* {item.isShared && (
                    <View style={ButtonStyles.sharedIndicator}>
                      <Text style={[FontStyles.linkBtn, {fontSize: 12, color: '#1CC800', fontWeight: '600'}]}>Delt </Text>
                      <Image 
                        source={require('../../assets/sharedArrow.png')}
                        style={{ height: 8, width: 8, resizeMode: 'contain'}}
                      />
                    </View>
                  )} */}
                  {item.isSharedByUser && (
                    <View style={ButtonStyles.sharedIndicator}>
                      <Text style={[FontStyles.linkBtn, {fontSize: 12, color: '#1CC800', fontWeight: '600'}]}></Text>
                      <Image 
                        source={require('../../assets/sharedArrow.png')}
                        style={{ height: 8, width: 8, resizeMode: 'contain'}}
                      />
                    </View>
                  )}
                  
                </View>

                <Text style={ReceiptStyles.categoryText}>{item.Date}</Text>
                
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

      <RecentContacts 
        recentContacts={recentContacts}/>

      {/* Recent receipts */}
        <View style={ContainerStyles.subHeaderContainer}>
          <Text style={FontStyles.subHeader}>Nylige kvitteringer</Text>

          {/* Se alle btn */}
          <TouchableOpacity 
            onPress={() => navigation.navigate('ReceiptsScreen')}
          >
              <Text style={FontStyles.linkBtn}>Se alle</Text>
          </TouchableOpacity>

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