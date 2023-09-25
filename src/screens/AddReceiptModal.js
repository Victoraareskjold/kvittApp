import { StyleSheet, Text, View, TouchableOpacity, Pressable, Image, TextInput, Platform, Button, KeyboardAvoidingView, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useState } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker'
import CategoriesFilter from '../components/CategoriesFilter'

import Colors from "../../Styles/Colors";
import FontStyles from "../../Styles/FontStyles";
import ButtonStyles from "../../Styles/ButtonStyles";
import ContainerStyles from "../../Styles/ContainerStyles";
import ReceiptStyles from "../../Styles/ReceiptStyles";

import firebase from 'firebase/compat/app';

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
            <SafeAreaView style={{ marginTop: 32 }}/>
            <View>
                    <Pressable 
                        style={ContainerStyles.topRight}
                        onPress={() => { props.onClose() }}>
                        <Text style={FontStyles.linkBtn}>Avbryt</Text>
                    </Pressable>

                {/* Hero image */}
                <View style={{ alignItems: 'center' }}>
                    <Image 
                        source={require('../../assets/qrcode.png')}
                        style={{ width: 120, height: 120 }}
                    />
                </View>

                {/* Hero text */}
                <View style={ContainerStyles.columnContainer}>
                    <Text style={FontStyles.header}>Legg til kvittering</Text>
                    <Text style={FontStyles.body1}>Her kan du legge til kvittering manuelt</Text>
                </View>

                {/* Input fields */}
                <View style={ContainerStyles.placeholderContainer}>

                    <TextInput
                        placeholderTextColor='grey'
                        value={store}
                        maxLength={30}
                        onChangeText={setStore}
                        placeholder='Butikk'
                        style={ButtonStyles.defaultPlaceholder}
                    />

                    <View>
                        {showPicker && (
                            <DateTimePicker
                                textColor='grey'
                                mode='date'
                                display='spinner'
                                value={date}
                                onChange={onChange}
                                style={ContainerStyles.datePicker}
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
                                    placeholderTextColor='grey'
                                    value={dateOfReceipt}
                                    placeholder='Dato'
                                    style={ButtonStyles.defaultPlaceholder}
                                    editable={false}
                                    onPressIn={toggleDatePicker}
                                />
                            </Pressable>
                        )}
                    </View>

                    <TextInput
                        placeholderTextColor='grey'
                        inputMode='numeric'
                        maxLength={10}
                        value={price}
                        onChangeText={setPrice}
                        placeholder='Pris'
                        style={ButtonStyles.defaultPlaceholder}
                    />

                    <CategoriesFilter
                        onSelectCategory={setSelectedCategory}
                        excludeAll={true} // Ekskluder "Alle" kategorien
                    />

                    <TouchableOpacity
                        style={ButtonStyles.primaryBtn}
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
                        <Text style={FontStyles.bigBtn}>Legg til kvittering</Text>
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