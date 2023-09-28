import { StyleSheet, Text, View, Image, TouchableOpacity, Modal, FlatList, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute } from '@react-navigation/native';

import FontStyles from '../../Styles/FontStyles';
import ContainerStyles from '../../Styles/ContainerStyles';
import ButtonStyles from '../../Styles/ButtonStyles';
import ReceiptStyles from '../../Styles/ReceiptStyles';
import StoreLogos from '../components/StoreLogos';

import SearchBox from '../components/SearchBox';
import CategoriesFilter from '../components/CategoriesFilter';

import { auth, db } from "../../firebase";

import {
  doc,
  collection,
  addDoc,
  query,
  where,
  getDocs,
  orderBy,
  getDoc
} from "@firebase/firestore";

const UserChat = ({ route }) => {

    const { user } = route.params;

    const [receiptsModalVisible, setReceiptsModalVisible] = useState(false);
    const [sharedReceipts, setSharedReceipts] = useState([]);
    
    const [userReceipts, setUserReceipts] = useState([]);

    const [isSharing, setIsSharing] = useState(false);

    const [selectedCategory, setSelectedCategory] = useState('');

    const [isLoading, setIsLoading] = useState(true);


    const shareReceipt = async (receiverId, receiptId) => {
        try {
            setIsSharing(true); // Set isSharing to true when user taps the button
           
            const sharedReceiptsCollection = collection(db, 'sharedReceipts');

            const alreadySharedQuery = query(
                sharedReceiptsCollection,
                where('receiverId', '==', receiverId)
            );
            
            const alreadySharedSnapshot = await getDocs(alreadySharedQuery);
            
            let isAlreadyShared = false;
            
            alreadySharedSnapshot.forEach(doc => {
                if (doc.data().receiptId === receiptId) {
                    isAlreadyShared = true;
                }
            });
            
            if (isAlreadyShared) {
                alert('Kvitteringen er allerede delt med denne brukeren!');
                return;
            }            
            
            // Fortsett å dele kvittering hvis den ikke allerede er delt
            const receiptRef = db.collection('receipts').doc(receiptId);
            await receiptRef.update({
                isSharedByUser: true,
            });
    
            await addDoc(sharedReceiptsCollection, {
              senderId: auth.currentUser.uid,
              receiverId: receiverId,
              receiptId: receiptId,
          });
          
            
            alert('Kvittering delt!');
        } catch (error) {
            console.error('Feil ved deling av kvittering:', error);
        } finally {
            setIsSharing(false);
        }
    };
  
    useEffect(() => {
    const loadSharedReceipts = async () => {
        try {
            const { uid } = auth.currentUser;
            const { uid: otherUserId } = route.params.user; // Henter uid av den andre brukeren fra navigasjonsparametre.

            let receipts = [];
            
            // Henter kvitteringer hvor enten sender eller mottaker er den påloggede brukeren, og den andre parten er den valgte brukeren.
            const sharedReceiptsQuery = query(
              collection(db, "sharedReceipts"), 
              where("receiverId", "in", [uid, otherUserId]), 
              where("senderId", "in", [uid, otherUserId])
            );

            const sharedReceiptsSnapshot = await getDocs(sharedReceiptsQuery);
            
            if(sharedReceiptsSnapshot.empty) {
              console.log(`No shared receipts found between users: ${uid} and ${otherUserId}`);
              return;
            }
            
            await Promise.all(sharedReceiptsSnapshot.docs.map(async (doc) => {
              try {
                const sharedReceiptData = doc.data();

                const receiptRef = db.collection('receipts').doc(sharedReceiptData.receiptId);
                const receiptDocRef = await receiptRef.get();
                
                if (!receiptDocRef.exists) {
                    console.error('No receipt found with ID:', sharedReceiptData.receiptId);
                    return;
                }
                
                const receiptData = receiptDocRef.data();
                const combinedData = {
                    ...sharedReceiptData,
                    ...receiptData,
                    id: sharedReceiptData.receiptId,
                    isShared: true
                };
                receipts.push(combinedData);
            
            } catch (error) {
                console.error('Error fetching receipt:', error);
            }
            
            }));
            
            setSharedReceipts(receipts);
            setIsLoading(false);
        } catch (error) {
            console.error("Error loading shared receipts:", error);
        }
    };

    loadSharedReceipts();
}, [route.params.user]);


    const loadReceiptList = async () => {
        try {
            const q = query(
                collection(db, "receipts"), 
                where("userId", "==", auth.currentUser.uid),
                orderBy("Date", "desc")
            );
    
            const querySnapshot = await getDocs(q);
            let receipts = [];
            querySnapshot.forEach((doc) => {
              let receipt = doc.data();
              receipt.id = doc.id;
              receipts.push(receipt);
            });
    
            setUserReceipts(receipts);
        } catch (error) {
            console.error("Feil ved henting av kvitteringer:", error);
        }
    };

    const openReceiptsModal = async () => {
        try {
            await loadReceiptList();
            setReceiptsModalVisible(true);
        } catch (error) {
            console.error('Feil ved åpning av kvitteringsmodal:', error);
        }
    };

    const renderReceiptItem = ({ item }) => {
        const StoreLogo = StoreLogos[item.Store.toLowerCase()] || StoreLogos["default"];
        return (
          <View>

            <Pressable
                    onPress={() => {
                        if (!isSharing) shareReceipt(user.id, item.id); // Check if isSharing is false before calling shareReceipt
                    }}
                    style={ReceiptStyles.receiptCard}
                    disabled={isSharing} // Disable the button when isSharing is true
                    >

            <View style={ReceiptStyles.receiptAlignment}>
              <View style={ReceiptStyles.cardAlignment}>

                <Image source={StoreLogo} style={ReceiptStyles.iconStyle} />

                <View>
                  <Text style={ReceiptStyles.storeText}>{item.Store}</Text>
                  <Text style={ReceiptStyles.categoryText}>{item.Category}</Text>
                </View>

              </View>
              <View style={ReceiptStyles.priceContainer}>
                <Text style={ReceiptStyles.priceText}>{item.Price}</Text>
                <Text style={ReceiptStyles.priceText}>,-</Text>
              </View>
            </View>

            </Pressable>

          </View>
        );
      };

      const renderSharedReceiptItem = ({ item }) => {

        const StoreLogo = StoreLogos[item.Store.toLowerCase()] || StoreLogos["default"];

        return (
          <View style={{ paddingVertical: 12, paddingHorizontal: 24}}>

            <View style={ReceiptStyles.receiptAlignment}>
              <View style={ReceiptStyles.cardAlignment}>

                <Image source={StoreLogo} style={ReceiptStyles.iconStyle} />

                <View>
                  <Text style={ReceiptStyles.storeText}>{item.Store}</Text>
                  <Text style={ReceiptStyles.categoryText}>{item.Category}</Text>
                </View>

              </View>
              <View style={ReceiptStyles.priceContainer}>
                <Text style={ReceiptStyles.priceText}>{item.Price}</Text>
                <Text style={ReceiptStyles.priceText}>,-</Text>
              </View>
            </View>

          </View>
        );
      };      
      
  return (
    <View style={ContainerStyles.backgroundContainer}>

      <FlatList
        style={{marginTop: 32}}
        data={sharedReceipts} // Bruker sharedReceipts som datakilde
        keyExtractor={(item) => item.id}
        renderItem={renderSharedReceiptItem} // Du må lage en ny render-funksjon for delte kvitteringer
        ListEmptyComponent={<Text style={{ alignSelf: 'center' }}>Ingen delte kvitteringer</Text>}
      />

      {/* Bottombar */}
      <View style={{position: 'absolute', bottom: 0, paddingHorizontal: 12, width: '100%' }}>
        <TouchableOpacity 
          onPress={openReceiptsModal}
          style={ButtonStyles.primaryBtn}
        >
          <Text style={FontStyles.smallBtn}>Del kvitteringer</Text>
        </TouchableOpacity>
      </View>

      <Modal
        presentationStyle='formSheet'
        animationType="slide"
        visible={receiptsModalVisible}
        onRequestClose={() => setReceiptsModalVisible(false)}>
        <View style={{ flex: 1 }}>
        <SafeAreaView style={{ marginTop: 32 }}/>

          {/* Top bar */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 24, alignItems: 'center', marginBottom: 24}}>
            <Text style={FontStyles.header}>Del kvittering</Text>
            <Pressable 
                onPress={() => setReceiptsModalVisible(false)}>
                  <Text style={FontStyles.linkBtn}>Avbryt</Text>
            </Pressable>
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

          {/* List of receipts */}
          <FlatList
            data={userReceipts}
            keyExtractor={(item) => item.id}
            renderItem={renderReceiptItem} // Here you should call renderReceiptItem function
          />

        </View>
      </Modal>

    </View>
  )
}

export default UserChat

const styles = StyleSheet.create({})