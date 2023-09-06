import { StyleSheet, Text, View, TouchableOpacity, Pressable, Image, TextInput, Platform, TouchableWithoutFeedback, Button } from 'react-native'
import { SafeAreaView } from 'react-native';
import React, { useState } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker'

export default function AddReceiptModal(props) {

    const [receipt, setReceipt] = useState('');
    const [store, setStore] = useState('');
    const [price, setPrice] = useState('');
    const [dateOfReceipt, setDateOfReceipt] = useState('');

    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
    const toggleDatePicker = () => {
        setShowPicker(!showPicker);
    };
    const onChange = ({ type }, selectedDate) => {
        if (type == 'set') {
            const currentDate = selectedDate;
            setDate(currentDate);

            if (Platform.OS === 'android') {
                toggleDatePicker();
                setDateOfReceipt(formatDate(currentDate));
                setShowDateInput(true);
            }
        } else {
            toggleDatePicker();
        }
    };

    const confirmIOSDate = () => {
        const formattedDate = formatDate(date);
        setDateOfReceipt(formattedDate);
        toggleDatePicker();
    };

    const hideDatePicker = () => {
        setShowPicker(false);
    };

    const formatDate = (rawDate) => {
        let date = new Date(rawDate);
        let year = date.getFullYear();
        let month = date.toLocaleString('default', { month: 'long' }); // Måneden som bokstaver
        let day = date.getDate();
    
        return `${day} ${month} ${year}`; // Formatert streng
    };

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

                    {/* category name */}
                    <TextInput
                        value={price}
                        onChangeText={setPrice}

                        placeholder='Pris' 
                        style={styles.receiptPlaceholder}
                    />

                    {/* Datepicker */}
                    <View>
                        {showPicker && (
                            <DateTimePicker 
                                mode='date'
                                display='spinner'
                                value={date}
                                onChange={onChange}
                                style={styles.datePicker}
                            />
                        )}

                            {/* IOS only */}
                            {showPicker && Platform.OS === 'ios' && (
                                <View
                                style={{ flexDirection: 'row', justifyContent: 'space-around'}}
                                >
                                    <Button title='Ok' onPress={confirmIOSDate}></Button>
                                </View>
                            )}

                        {!showPicker && (
                            <Pressable
                                onPress={toggleDatePicker}
                            >
                            <TextInput 
                                value={dateOfReceipt}
                                onChangeText={setDateOfReceipt}

                                placeholder='Dato' 
                                style={styles.receiptPlaceholder}

                                editable={false}
                                onPressIn={toggleDatePicker}
                            />
                        </Pressable>
                        )}
                    </View>

                    {/* Add receipt btn */}
                    <TouchableOpacity 
                        style={styles.addReceiptBtn}
                        title='Legg til' 
                        onPress={() => {
                            props.addReceipt({ store, receipt, price, date });
                            setStore('');
                            setReceipt('');
                            setPrice('');

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

    /* Date Picker */
    datePicker: {
        height: 160,
        marginTop: -10,
    },
})