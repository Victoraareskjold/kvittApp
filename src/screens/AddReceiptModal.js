import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Pressable, Image, TextInput, Touchable, Button, SafeAreaViewBase } from 'react-native'
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
                <View style={styles.headerContainer}>

                {/* Close modal */}
                <Pressable onPress={() => {props.onClose()}}>
                    <Image 
                        source={require("../../assets/backVector.png")}
                        style={{ width: 32, height: 32 }}
                    />
                </Pressable>

                {/* Add receipt header */}
                <Text style={styles.subHeader}>
                    Legg til kvittering
                </Text>
                </View>

                {/* Add receipt container */}
                <View style={styles.addReceiptContainer}>

                    {/* Store name */}
                    <TextInput
                        value={store}
                        onChangeText={setStore}

                        placeholder='Butikk' 
                        style={styles.receiptPlaceholder}
                    />

                    {/* category name */}
                    <TextInput
                        value={receipt}
                        onChangeText={setReceipt}

                        placeholder='Kategori' 
                        style={styles.receiptPlaceholder}
                    />

                    {/* Add receipt btn */}
                    <TouchableOpacity 
                        style={styles.addReceiptBtn}
                        title='Legg til' 
                        onPress={() => {
                            props.addReceipt({ store, receipt });
                            setReceipt('');
                            setStore('');

                            props.onClose();
                        }}
                    >
                        <Text style={{ color: '#fff', fontWeight: '600', fontSize: 16, textAlign: 'center' }}>Legg til kvittering</Text>
                    </TouchableOpacity>

                </View>

            </View>
      </View>
    );
}

const styles = StyleSheet.create({

    /* Containers */
    headerContainer: {
        alignItems: 'center',
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
        borderRadius: 50,
        height: 54,
        justifyContent: 'center',
    },

    /* Text input */
    receiptPlaceholder: {
        backgroundColor: '#F4F9FF',
        paddingVertical: 16,
        paddingHorizontal: 16,
        marginBottom: 12,
        borderRadius: 15,
    },
})