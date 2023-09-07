import { StyleSheet, Text, View, TouchableOpacity, Pressable, Image, TextInput, Platform, Button } from 'react-native'
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

    const formatDate = (rawDate) => {
        let date = new Date(rawDate);
        let year = date.getFullYear();
        let month = date.toLocaleString('default', { month: 'long' });
        let day = date.getDate();

        return `${day} ${month} ${year}`;
    };

    return (
        <View style={{ backgroundColor: '#FFF', flex: 1 }}>
            <SafeAreaView />
            <View>

                <View style={styles.headerContainer}>

                    <Pressable onPress={() => { props.onClose() }}>
                        <Image
                            source={require("../../assets/backVector.png")}
                            style={{ width: 32, height: 32 }}
                        />
                    </Pressable>

                    <Text style={styles.subHeader}>
                        Legg til kvittering
                    </Text>
                </View>

                <View style={styles.addReceiptContainer}>

                    <TextInput
                        value={store}
                        onChangeText={setStore}
                        placeholder='Butikk'
                        style={styles.receiptPlaceholder}
                    />

                    <TextInput
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
        </View>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 24,
        marginBottom: 48,
    },
    addReceiptContainer: {
        paddingHorizontal: 24,
    },
    subHeader: {
        fontSize: 24,
    },
    addReceiptBtn: {
        backgroundColor: '#2984FF',
        paddingVertical: 12,
        paddingHorizontal: 16,
        marginTop: 12,
        borderRadius: 50,
        height: 54,
        justifyContent: 'center',
    },
    receiptPlaceholder: {
        backgroundColor: '#F4F9FF',
        paddingVertical: 16,
        paddingHorizontal: 16,
        marginBottom: 12,
        borderRadius: 15,
    },
    DatePlaceholder: {
        backgroundColor: '#F4F9FF',
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
