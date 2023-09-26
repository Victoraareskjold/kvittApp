import { StyleSheet, Text, View, Pressable, Image, ScrollView, Alert } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import React from 'react'
import StoreLogos from './StoreLogos';
import ReceiptStyles from '../../Styles/ReceiptStyles';
import ContainerStyles from "../../Styles/ContainerStyles";

import { db, storage } from "../../firebase";
import { doc, deleteDoc, getDoc } from "@firebase/firestore";
import { getStorage, ref, deleteObject } from 'firebase/storage';
import 'firebase/compat/storage';

import ButtonStyles from '../../Styles/ButtonStyles';
import FontStyles from '../../Styles/FontStyles';

const ReceiptView = ({ navigation, route }) => {

  const { item }= route.params;
  const StoreLogo = StoreLogos[item.Store.toLowerCase()] || StoreLogos["default"];

  const storage = getStorage();

  // Funksjon for å slette kvittering
  const deleteReceipt = async () => {
    try {
        const receiptRef = doc(db, "receipts", item.id);
        const receiptData = (await getDoc(receiptRef)).data();
        
        console.log("receiptData:", receiptData);
        
        if (receiptData.Image) { 
            const urlParts = receiptData.Image.split("/");
            let imagePath = urlParts[urlParts.length - 1].split('?')[0]; 
            
            // Decoding %2F to /
            imagePath = decodeURIComponent(imagePath);
            
            console.log("Bildets navn:", imagePath);
            
            const imageRef = ref(storage, imagePath);
            console.log("Sletter bilde fra sti:", imageRef.toString());
            
            await deleteObject(imageRef);
        }
        
        await deleteDoc(receiptRef);
        navigation.goBack();
    } catch (error) {
        console.error("Feil ved sletting av kvittering:", error);
    }
};

  // Funksjon for å vise bekreftelsesdialog
  const showDeleteAlert = () => {
    Alert.alert(
      "Slett kvittering",
      "Er du sikker på at du vil slette denne kvitteringen?",
      [
        {
          text: "Nei",
          onPress: () => console.log("Sletting avbrutt"),
          style: "cancel"
        },
        {
          text: "Ja",
          onPress: deleteReceipt
        }
      ]
    );
  };
  
  console.log(item.Image);

  return (
    <View style={ContainerStyles.backgroundContainer}>
      {/* <SafeAreaView /> */}

        <View style={styles.container}>

            {/* Kvittering innhold */}
            <View style={styles.kvitteringContainer}>

                {/* Butikk logo */}
                <Image 
                    source={StoreLogo}
                    style={{ width: '100%', height: 100, resizeMode: 'contain', marginBottom: 32 }}
                />

                {/* Overskrift & dato */}
                <View style={{ marginBottom: 32 }}>
                    <Text style={styles.subHeader}>{item.Store}</Text>
                    <Text style={styles.body2}>{item.Category}</Text>
                    <Text style={styles.body2}>{item.Date}</Text>

                </View>

                {/* Divider */}
                <Image 
                    source={require("../../assets/divider.png")}
                    style={{ width: '100%', height: 0, marginBottom: 32 }}
                />
                
                {/* Barcode */}
                {/* <Image 
                    source={require("../../assets/barcode.png")}
                    style={{ width: '100%', height: 62 }}
                /> */}

                {/* Receipt image */}
                {item.Image ? (
                <View style={{alignItems: 'center', marginVertical: 10}}>
                    <Image 
                        source={{uri: item.Image}}
                        style={{width: 150, height: 150}} 
                        resizeMode="cover"
                    />
                </View>
            ) : null}

            </View>

            {/* Sletteknapp */}
            <Pressable style={ButtonStyles.deleteButton} onPress={showDeleteAlert}>
                <Image 
                    source={require('../../assets/trash.png')}
                    style={ButtonStyles.settingsIcon}
                />
            <Text style={FontStyles.bigBtn}>Slett kvittering</Text>
            </Pressable>

        </View>

    </View>
  )
}

export default ReceiptView

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        marginHorizontal: 24,
    },
    bgContainer: {
        backgroundColor: '#FFF',
    },
    headerContainer: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    kvitteringContainer: {
        marginTop: 32,
        backgroundColor: '#FFF',
        paddingHorizontal: 24,
        paddingVertical: 24,

        
        shadowColor: '#959da5',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.25, 
        shadowRadius: 8, 
        elevation: 2,
    },
    filterContainer: {
        marginLeft: 24,
    },
    varerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    alleVarerContainer: {
        marginBottom: 32,
    },
    totPrisContainer: {
        marginBottom: 32,
    },

    header: {
        fontSize: 28,
        fontWeight: 'bold',
    },
    subHeader: {
        fontSize: 24,
    },
    body1: {
        fontSize: 16,
        fontWeight: '600',
    },
    body2: {
        fontSize: 14,
    },
});