import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import React from 'react'
import { SafeAreaView } from "react-native-safe-area-context";

import Colors from "../../../Styles/Colors";
import FontStyles from "../../../Styles/FontStyles";
import ButtonStyles from "../../../Styles/ButtonStyles";
import ContainerStyles from "../../../Styles/ContainerStyles";
import ReceiptStyles from "../../../Styles/ReceiptStyles";

const CardsSettings = () => {
  return (
    <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : '100'}
        style={[ContainerStyles.backgroundContainer, { paddingTop: 32 }]}
    >
        {/* Text fields */}
        <View style={ContainerStyles.paddingContainer}>

            <View style={{marginBottom: 0}}>

                {/* Accounts */}
                <TouchableOpacity 
                    style={[ButtonStyles.secondaryBtn, {flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 12, marginBottom: 32}]}
                >
                    <Text style={FontStyles.body}>Bankkort</Text>
                    <Image 
                        source={require('../../../assets/rightChevron.png')}
                        style={{ height: 12, resizeMode: 'contain'}}
                    />
                </TouchableOpacity>

            </View>

                <TouchableOpacity 
                    style={[ButtonStyles.primaryBtn, {flexDirection: 'row', justifyContent: 'flex-start', paddingHorizontal: 12}]}
                >
                    {/* <Image 
                        source={require('../../../assets/add.png')}
                        style={{ height: 20, width: 20, marginRight: 12}}
                    /> */}
                    <Text style={FontStyles.smallBtn}>Legg til bankkort</Text>
                </TouchableOpacity>

        </View>
    </KeyboardAvoidingView>
  )
}

export default CardsSettings

const styles = StyleSheet.create({})