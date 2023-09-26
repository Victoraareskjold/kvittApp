import { StyleSheet, Text, View, TouchableOpacity, Pressable, Image, TextInput, Platform, Button, KeyboardAvoidingView, ScrollView, Modal, Touchable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useState, useEffect, useRef } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker'
import CategoriesFilter from '../components/CategoriesFilter'
import { Camera } from 'expo-camera'

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

    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [camera, setCamera] = useState(null);
    const [imageUri, setImageUri] = useState(null);
    const [isCameraReady, setIsCameraReady] = useState(false);

    const [isModalVisible, setModalVisible] = useState(false);
    const [isCameraModalVisible, setCameraModalVisible] = useState(false);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasCameraPermission(status === 'granted');
        })();
    }, []);

    const openCameraModal = () => {
        setCameraModalVisible(true);
    };
    
    const closeCameraModal = () => {
        setCameraModalVisible(false);
    };
    
    const takePicture = async () => {
        if (camera && isCameraReady) {
            try {
                const photo = await camera.takePictureAsync();
                setImageUri(photo.uri);
                closeCameraModal(); // Lukk kameramodalen etter bilde er tatt
            } catch (error) {
                console.error("Error taking picture", error);
            }
        }
    };      

    const uploadImage = async (uri) => {
        try {
          // Generer en unik filnavn
          const imageName = `${Date.now()}.jpg`;
      
          // Opprett en referanse til hvor bildet skal lagres
          const imageRef = firebase.storage().ref().child(`images/${imageName}`);
      
          // Konverter lokal fil URI til Blob
          const response = await fetch(uri);
          const blob = await response.blob();
      
          // Last opp Blob til Firebase Storage og få URL til den opplastede filen
          const snapshot = await imageRef.put(blob);
          const url = await snapshot.ref.getDownloadURL();
      
          return url;
        } catch (error) {
          console.error('Error uploading image: ', error);
        }
      };      

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

                    <Button title="Åpne Kamera" onPress={openCameraModal} />

                    {/* Vis bilde tatt med kamera hvis det finnes */}
                    {imageUri && (
                        <Image source={{ uri: imageUri }} style={{ width: 32, height: 32, marginTop: 10 }} />
                    )}
                                    
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={isCameraModalVisible}
                        onRequestClose={closeCameraModal}
                    >
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{ width: '100%', height: '100%', backgroundColor: 'black', alignItems: 'center' }}>
                                <Camera 
                                    style={{ width: '100%', height: '90%' }} 
                                    ref={(ref) => setCamera(ref)} 
                                    onCameraReady={() => setIsCameraReady(true)}
                                />
                                <TouchableOpacity  
                                    onPress={takePicture} 
                                    style={{ backgroundColor: 'white', height: 48, width: 48, borderRadius: 100, marginTop: 12}}
                                />
                            </View>
                        </View>
                    </Modal>

                    <TouchableOpacity
                        style={ButtonStyles.primaryBtn}
                        title='Legg til'
                        onPress={async () => {
                            if (!store || !selectedCategory || !price || !dateOfReceipt || !imageUri) {
                              setErrorMessage("Fyll ut alle feltene for å legge til kvittering.");
                            } else {
                              try {
                                const imageUrl = await uploadImage(imageUri); // Får URL fra Firebase Storage.
                                props.addReceipt({ store, selectedCategory, price, dateOfReceipt, imageUrl });
                                console.log('Sending imageUrl:', imageUrl);
                                setStore('');
                                setPrice('');
                                setDateOfReceipt('');
                                setSelectedCategory('');
                                setImageUri('');
                                setErrorMessage("");
                                props.onClose();
                              } catch (error) {
                                console.error('Error uploading image and adding receipt: ', error);
                              }
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