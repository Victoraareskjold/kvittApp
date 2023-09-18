import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from "react-native-safe-area-context";

import Colors from "../../../Styles/Colors";
import FontStyles from "../../../Styles/FontStyles";
import ButtonStyles from "../../../Styles/ButtonStyles";
import ContainerStyles from "../../../Styles/ContainerStyles";
import ReceiptStyles from "../../../Styles/ReceiptStyles";

const CardsSettings = () => {
  return (
    <View style={ContainerStyles.backgroundContainer}>
      <SafeAreaView />

        {/* Text fields */}
        <View style={ContainerStyles.paddingContainer}>

            <View style={{marginBottom: 32}}>

                {/* Accounts */}
                <Text style={FontStyles.body2Fat}>Kontoer</Text>
                <TouchableOpacity 
                    style={[ButtonStyles.secondaryBtn, {flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 12}]}
                >
                    <Text style={FontStyles.body}>Brukskonto</Text>
                    <Image 
                        source={require('../../../assets/rightChevron.png')}
                        style={{ height: 12, resizeMode: 'contain'}}
                    />
                </TouchableOpacity>

                <TouchableOpacity 
                    style={[ButtonStyles.primaryBtn, {flexDirection: 'row', justifyContent: 'flex-start', paddingHorizontal: 12}]}
                >
                    <Image 
                        source={require('../../../assets/add.png')}
                        style={{ height: 20, width: 20, marginRight: 12}}
                    />
                    <Text style={FontStyles.smallBtn}>Legg til konto</Text>
                </TouchableOpacity>

            </View>

            <View style={{marginBottom: 32}}>

                {/* Accounts */}
                <Text style={FontStyles.body2Fat}>Kort</Text>
                <TouchableOpacity 
                    style={[ButtonStyles.secondaryBtn, {flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 12}]}
                >
                    <Text style={FontStyles.body}>Brukskonto</Text>
                    <Image 
                        source={require('../../../assets/rightChevron.png')}
                        style={{ height: 12, resizeMode: 'contain'}}
                    />
                </TouchableOpacity>

                <TouchableOpacity 
                    style={[ButtonStyles.primaryBtn, {flexDirection: 'row', justifyContent: 'flex-start', paddingHorizontal: 12}]}
                >
                    <Image 
                        source={require('../../../assets/add.png')}
                        style={{ height: 20, width: 20, marginRight: 12}}
                    />
                    <Text style={FontStyles.smallBtn}>Legg til kort</Text>
                </TouchableOpacity>

            </View>

        </View>
      
    </View>
  )
}

export default CardsSettings

const styles = StyleSheet.create({})