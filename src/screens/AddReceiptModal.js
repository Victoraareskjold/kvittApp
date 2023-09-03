import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Pressable, Image, TextInput, Touchable, Button } from 'react-native'
import { SafeAreaView } from 'react-native';
import React, { useState } from 'react'
import { Modal } from 'react-native';

export default function AddReceiptModal(props) {

    let [receipt, setReceipt] = useState('');
    let [store, setStore] = useState('');

    return (
        <View style={{backgroundColor: '#FFF', flex: 1}}>
            <SafeAreaView />
            <View>

                {/* Header container */}
                {/* <View style={styles.headerContainer}>
                <Pressable onPress={() => navigation.goBack()}>
                    <Image 
                        source={require("../../assets/backVector.png")}
                        style={{ width: 32, height: 32 }}
                    />
                </Pressable>
                <Text style={styles.header}>Hjem</Text>
                </View> */}

                {/* Add receipt container */}
                <View style={styles.addReceiptContainer}>

                    {/* Store name */}
                    <TextInput
                        value={receipt}
                        onChangeText={setReceipt}

                        placeholder='Butikk' 
                        style={styles.receiptPlaceholder}
                    />

                    {/* Store name */}
                    {/* <TextInput
                        value={store}
                        onChangeText={setStore}

                        placeholder='Butikk' 
                        style={styles.receiptPlaceholder}
                    /> */}

                    {/* Add receipt */}
                    <Button title='OK' onPress={() => {
                            props.addReceipt(receipt);
                            setReceipt('');

                            /* props.addStore(store);
                            setStore(''); */

                            props.onClose();
                        }}
                    >
                        <Text style={{ color: '#FFF', textAlign: 'center', fontWeight: '700', fontSize: 16 }}>Legg til</Text>
                    </Button>

                    {/* Close modal */}
                    <View>
                        <Button 
                            title='Cancel' 
                            onPress={props.onClose}
                        />
                        
                    </View>

                </View>

            </View>
      </View>
    );
}

const styles = StyleSheet.create({

    /* Containers */
    headerContainer: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: 24,
        marginBottom: 48,
    },
    kvitteringContainer: {
        paddingHorizontal: 24,
    },
    subHeaderContainer: {
        flex: 1, 
        flexDirection: 'row', 
        alignItems: 'baseline', 
        justifyContent: 'space-between',
    },
    addReceiptContainer: {
        paddingHorizontal: 24,
    },

    /* Text */
    header: {
        fontSize: 28,
        fontWeight: 'bold',
    },
    subHeader: {
        fontSize: 24,
    },
    linkBtn: {
        fontSize: 16,
        fontWeight: '600',
        color: '#2984FF',
    },

    /* Btn */
    addReceiptBtn: {
        backgroundColor: '#2984FF',
        paddingVertical: 12,
        paddingHorizontal: 16,
        marginTop: 12,
        borderRadius: 15,
    },

    /* Text input */
    receiptPlaceholder: {
        backgroundColor: '#F4F9FF',
        paddingVertical: 8,
        paddingHorizontal: 16,
        marginBottom: 12,
        borderRadius: 15,
    },
})