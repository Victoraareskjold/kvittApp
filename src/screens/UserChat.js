import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, Alert, Modal, FlatList, Pressable } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import { SafeAreaView } from "react-native-safe-area-context";

import Colors from '../../Styles/Colors';
import FontStyles from '../../Styles/FontStyles';
import ContainerStyles from '../../Styles/ContainerStyles';
import ButtonStyles from '../../Styles/ButtonStyles';
import ReceiptStyles from '../../Styles/ReceiptStyles';
import StoreLogos from '../components/StoreLogos';

import firebase from 'firebase/compat';
import { auth, db } from "../../firebase";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  orderBy
} from "@firebase/firestore";

const UserChat = ({ route }) => {

    const { user } = route.params;

    const [receiptsModalVisible, setReceiptsModalVisible] = useState(false);
    const [sharedReceipts, setSharedReceipts] = useState([]);
    
    const [userReceipts, setUserReceipts] = useState([]);

    const shareReceipt = async (receiverId, receiptId) => {
        try {
            const sharedReceiptsCollection = db.collection('sharedReceipts');
            await sharedReceiptsCollection.add({
                senderId: auth.currentUser.uid,
                receiverId: receiverId,
                receiptId: receiptId,
            });
            alert('Kvittering delt!');
        } catch (error) {
            console.error('Feil ved deling av kvittering:', error);
        }
    };    
      
      useEffect(() => {
        const fetchSharedReceipts = async () => {
          try {
            const sharedReceiptsQuery = query(
              collection(db, 'sharedReceipts'),
              where('receiverId', '==', auth.currentUser.uid)
            );
            const sharedReceiptsSnapshot = await getDocs(sharedReceiptsQuery);
            
            const receiptPromises = sharedReceiptsSnapshot.docs.map(async doc => {
              const sharedReceiptData = doc.data();
              
              // Correct the way to get a document reference
              const receiptRef = db.collection('receipts').doc(sharedReceiptData.receiptId);
              const receiptSnapshot = await receiptRef.get();
              
              if(receiptSnapshot.exists) 
                return { ...receiptSnapshot.data(), id: receiptSnapshot.id };
              
              throw new Error('Receipt does not exist');
            });
            
            const receipts = await Promise.all(receiptPromises);
            
            setSharedReceipts(receipts); // Correctly set sharedReceipts
          } catch (error) {
            console.error('Feil ved henting av delte kvitteringer:', error);
          }
        };
        
        fetchSharedReceipts();
    }, []);    

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
                    onPress={() => shareReceipt(user.id, item.id)}
                    style={ReceiptStyles.receiptCard}
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
      
  return (
    <View style={ContainerStyles.backgroundContainer}>
      <SafeAreaView />

      <Text>{user.name}</Text>

      <TouchableOpacity onPress={openReceiptsModal}>
        <Text>Del kvitteringer</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        visible={receiptsModalVisible}
        onRequestClose={() => setReceiptsModalVisible(false)}>
        <View style={{ flex: 1, padding: 20 }}>
          <FlatList
            data={userReceipts}
            keyExtractor={(item) => item.id}
            renderItem={renderReceiptItem} // Here you should call renderReceiptItem function
          />
          <TouchableOpacity onPress={() => setReceiptsModalVisible(false)}>
            <Text>Lukk</Text>
          </TouchableOpacity>
        </View>
      </Modal>

    </View>
  )
}

export default UserChat

const styles = StyleSheet.create({})