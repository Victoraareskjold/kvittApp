import { StyleSheet, Text, View, TouchableOpacity, Pressable, Image, TextInput, Platform, Button, KeyboardAvoidingView, ScrollView, Modal, Touchable, ActivityIndicator } from 'react-native'
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
    const [isPictureTaken, setIsPictureTaken] = useState(false);
    const [isImageModalVisible, setImageModalVisible] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

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
                setIsPictureTaken(true); // Sett isPictureTaken til true når bildet er tatt.
                closeCameraModal(); 
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

     const handleAddReceipt = async () => {
        if (!store || !selectedCategory || !price || !dateOfReceipt ) {
            setErrorMessage("Fyll ut alle feltene for å legge til kvittering.");
        } else {
            try {
                setIsLoading(true);
                const imageUrl = await uploadImage(imageUri); 
                props.addReceipt({ store, selectedCategory, price, dateOfReceipt, imageUrl });
                setStore('');
                setPrice('');
                setDateOfReceipt('');
                setSelectedCategory('');
                setImageUri('');
                setIsPictureTaken(false); // Sett isPictureTaken til false når kvittering er lagt til.
                setErrorMessage("");
                props.onClose();
            } catch (error) {
                console.error('Error uploading image and adding receipt: ', error);
            } finally {
                setIsLoading(false); // End loading
            }
        }
    };

    const openImageModal = () => {
        setImageModalVisible(true);
    };
    
    const closeImageModal = () => {
        setImageModalVisible(false);
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

                    {/* Vis bilde tatt med kamera hvis det finnes */}
                    {imageUri && (
                    <TouchableOpacity 
                        style={{marginBottom: 24, alignSelf: 'center', borderBottomWidth: 1, borderColor: Colors.primary}}
                        onPress={openImageModal}
                    >
                        <Text style={{ color: Colors.primary }}>Se bildet</Text>
                    </TouchableOpacity>
                    )}

                    <Modal
                        animationType="slide"
                        transparent={false} // Sett til false for å vise modalen i fullskjerm
                        visible={isImageModalVisible}
                        onRequestClose={closeImageModal}
                    >
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black' }}>
                            <Image source={{ uri: imageUri }} style={{ width: '100%', height: '100%', resizeMode: 'contain' }} />
                            <TouchableOpacity 
                                onPress={() => { 
                                    closeImageModal(); // Lukk bilde modalen
                                    openCameraModal(); // Åpne kamera modalen
                                }} 
                                style={{ position: 'absolute', top: 48, left: 20 }}>
                                <Text style={{ color: 'white', fontSize: 20 }}>Ta nytt bilde</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={closeImageModal} style={{ position: 'absolute', top: 48, right: 20 }}>
                                <Text style={{ color: 'white', fontSize: 20 }}>Lukk</Text>
                            </TouchableOpacity>
                        </View>
                    </Modal>
                                    
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={isCameraModalVisible}
                        onRequestClose={closeCameraModal}
                    >
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{ width: '100%', height: '100%', backgroundColor: 'black', alignItems: 'center' }}>
                                    <TouchableOpacity
                                        onPress={closeCameraModal}
                                        style={{ marginTop: 48, marginBottom: 8, justifyContent: 'center', alignItems: 'flex-end', width: '90%'}}
                                    >
                                        <Text style={{ color: 'white', fontSize: 20 }}>Lukk</Text>
                                    </TouchableOpacity>
                                <Camera 
                                    style={{ width: '100%', height: '80%' }} 
                                    ref={(ref) => setCamera(ref)} 
                                    onCameraReady={() => setIsCameraReady(true)}
                                />
                                <View>
                                    <TouchableOpacity  
                                        onPress={takePicture} 
                                        style={{ backgroundColor: 'white', height: 48, width: 48, borderRadius: 100, marginTop: 12}}
                                    />
                                    
                                </View>
                            </View>
                        </View>
                    </Modal>

                    <TouchableOpacity 
                        style={ButtonStyles.primaryBtn}
                        onPress={isPictureTaken ? handleAddReceipt : openCameraModal}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <ActivityIndicator size="small" color="#FFFFFF" />
                        ) : (
                            <Text style={FontStyles.bigBtn}>{isPictureTaken ? 'Legg til kvittering' : 'Åpne Kamera'}</Text>
                        )}
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