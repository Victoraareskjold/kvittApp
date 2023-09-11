import { StyleSheet, Text, View, TouchableOpacity, Pressable, Image, TextInput, Platform, Button, KeyboardAvoidingView, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native';
import React, { useState } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker'
import CategoriesFilter from '../components/CategoriesFilter'

export default function AddReceiptModal(props) {

    const [receipt, setReceipt] = useState('');
    const [store, setStore] = useState('');
    const [price, setPrice] = useState('');
    const [dateOfReceipt, setDateOfReceipt] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

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

    const formatDate = (date) => {
        const d = new Date(date);
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0'); 
        const year = d.getFullYear();
     
        return `${day}.${month}.${year}`;
     };
     
    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1, backgroundColor: '#fff', justifyContent: 'center' }}
        >
            <ScrollView showsVerticalScrollIndicator={false} >
            <SafeAreaView />
            <View>
                    <Pressable 
                        style={styles.headerContainer}
                        onPress={() => { props.onClose() }}>
                        <Image
                            source={require("../../assets/closeIcon.png")}
                            style={{ width: 20, height: 20 }}
                        />
                    </Pressable>

                {/* Hero image */}
                <View style={{ alignItems: 'center' }}>
                    <Image 
                        source={require('../../assets/qrcode.png')}
                        style={{ width: 120, height: 120 }}
                    />
                </View>

                {/* Hero text */}
                <View style={styles.heroTextContainer}>
                    <Text style={styles.header}>Legg til kvittering</Text>
                    <Text style={{ color: "#272727", opacity: 0.76, fontSize: 16, fontWeight: "500"}}>Her kan du legge til kvittering manuelt</Text>
                </View>

                {/* Input fields */}
                <View style={styles.addReceiptContainer}>

                    <TextInput
                        value={store}
                        maxLength={30}
                        onChangeText={setStore}
                        placeholder='Butikk'
                        style={styles.receiptPlaceholder}
                    />

                    <TextInput
                        inputMode='numeric'
                        maxLength={10}
                        value={price}
                        onChangeText={setPrice}
                        placeholder='Pris'
                        style={styles.receiptPlaceholder}
                    />

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

                        {showPicker && Platform.OS === 'ios' && (
                            <View
                                style={{ flexDirection: 'row', justifyContent: 'space-around' }}
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
                                    placeholder='Dato'
                                    style={styles.DatePlaceholder}
                                    editable={false}
                                    onPressIn={toggleDatePicker}
                                />
                            </Pressable>
                        )}
                    </View>

                    <CategoriesFilter
                        onSelectCategory={setSelectedCategory}
                        excludeAll={true} // Ekskluder "Alle" kategorien
                    />

                    <TouchableOpacity
                        style={styles.addReceiptBtn}
                        title='Legg til'
                        onPress={() => {
                            if (!store || !selectedCategory || !price || !dateOfReceipt) {
                                setErrorMessage("Fyll ut alle feltene for å legge til kvittering.");
                            } else {
                                props.addReceipt({ store, selectedCategory, price, dateOfReceipt });
                                setStore('');
                                setPrice('');
                                setDateOfReceipt('');
                                setSelectedCategory('');
                                setErrorMessage("");
                                props.onClose();
                            }
                        }}
                    >
                        <Text style={{ color: '#fff', fontWeight: '600', fontSize: 16, textAlign: 'center' }}>
                            Legg til kvittering
                        </Text>
                    </TouchableOpacity>

                    {/* Vis feilmelding hvis et felt mangler */}
                    <View style={{ width: '100%', alignItems: 'center', marginTop: 8}}>
                        <Text style={{ color: 'red' }}>{errorMessage}</Text>
                    </View>
                </View>

            </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        width: '100%',
        justifyContent: 'flex-end',
        flexDirection: 'row',
        paddingHorizontal: 24,
        marginBottom: 24,
        marginTop: 24,
    },
    addReceiptContainer: {
        paddingHorizontal: 24,
    },
    heroTextContainer: {
        paddingHorizontal: 24,
        marginBottom: 24,
        marginTop: 12,
    },
    header: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 6,
        marginTop: 24,
        color: "#272727",
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
    addReceiptBtn: {
        backgroundColor: '#2984FF',
        paddingVertical: 12,
        paddingHorizontal: 16,
        marginTop: 48,
        borderRadius: 10,
        height: 54,
        justifyContent: 'center',
    },
    receiptPlaceholder: {
        backgroundColor: '#FBFBFB',
        paddingVertical: 16,
        paddingHorizontal: 16,
        marginBottom: 12,
        borderRadius: 15,
    },
    DatePlaceholder: {
        backgroundColor: '#FBFBFB',
        paddingVertical: 16,
        paddingHorizontal: 16,
        marginBottom: 0,
        borderRadius: 15,
    },
    datePicker: {
        height: 160,
        marginTop: -10,
    },
});
