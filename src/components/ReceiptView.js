import { StyleSheet, Text, View, Pressable, Image, ScrollView, Alert } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import React from 'react'
import StoreLogos from './StoreLogos';
import ReceiptStyles from '../../Styles/ReceiptStyles';
import ContainerStyles from "../../Styles/ContainerStyles";

import { db } from "../../firebase";
import { doc, deleteDoc } from "@firebase/firestore";
import ButtonStyles from '../../Styles/ButtonStyles';
import FontStyles from '../../Styles/FontStyles';

const ReceiptView = ({ navigation, route }) => {

  const { item }= route.params;
  const StoreLogo = StoreLogos[item.Store.toLowerCase()] || StoreLogos["default"];

  // Funksjon for å slette kvittering
  const deleteReceipt = async () => {
    try {
      const receiptRef = doc(db, "receipts", item.id); // Erstatt "receipts" med din faktiske kolleksjonsnavn
      await deleteDoc(receiptRef);
      navigation.goBack(); // Navigerer tilbake til forrige skjerm (antatt kvitteringsliste)
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

                {/* Varer */}
                {/* <View style={styles.alleVarerContainer}>
                    <View style={styles.varerContainer}>
                        <Text style={styles.body2}>Vare</Text>
                        <Text style={styles.body2}>{item.pris}</Text>
                </View> 
                

                {/* Barcode */}
                <Image 
                    source={require("../../assets/barcode.png")}
                    style={{ width: '100%', height: 62 }}
                />

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