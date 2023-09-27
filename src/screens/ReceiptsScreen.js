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
  SectionList,
  Button
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
  orderBy,
  getDoc
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
    return `${day}.${month}.${year}`;
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
              
              console.log('Combined Receipt Data:', combinedData);
          } catch (error) {
              console.error('Error fetching receipt:', error);
          }
        });

        console.log('Shared Receipts Query Snapshot:', querySnapshot);

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
    console.log('Final Receipts List:', receipts);
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

    console.log('Rendering Item:', item)

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
                      <Text style={[FontStyles.linkBtn, {fontSize: 12, color: '#1CC800', fontWeight: '600'}]}>Delt </Text>
                      <Image 
                        source={require('../../assets/sharedArrow.png')}
                        style={{ height: 8, width: 8, resizeMode: 'contain'}}
                      />
                    </View>
                  )}
                  
                </View>

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

  let addReceipt = async ({ store, selectedCategory, price, dateOfReceipt, imageUrl  }) => {
    try {
      if (!imageUrl) {
        console.error("imageUrl er undefined");
        // Du kan også sette imageUrl til en standardverdi her, eller returnere og vise en feilmelding til brukeren.
        return;
      }
        let receiptSave = {
          Store: store,
          Category: selectedCategory,
          Price: price,
          Date: formatDate(dateOfReceipt), // antar at du vil formatere datoen her
          userId: auth.currentUser.uid,
          Image: imageUrl, 
        };
        
        // Legge til ny kvittering med compat versjon
        const receiptsCollection = db.collection('receipts');
        const docRef = await receiptsCollection.add(receiptSave);
        
        // Legger til id til kvitteringobjektet og oppdaterer lokal tilstand
        receiptSave.id = docRef.id;
        
        let updatedReceipts = [...receipts];
        updatedReceipts.push(receiptSave);
        setReceipts(updatedReceipts);
        
        loadReceiptList(); // Oppdaterer sectionList
    } catch(error) {
        console.error("Feil ved tillegg av kvittering:", error);
    }
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
          <Text style={[FontStyles.bodyFat, {color: Colors.white, opacity: 1}]}>Legg til</Text>
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
              title: formatDate(date),
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
