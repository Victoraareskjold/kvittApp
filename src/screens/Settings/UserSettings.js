import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from "react-native-safe-area-context";

import Colors from "../../../Styles/Colors";
import FontStyles from "../../../Styles/FontStyles";
import ButtonStyles from "../../../Styles/ButtonStyles";
import ContainerStyles from "../../../Styles/ContainerStyles";
import ReceiptStyles from "../../../Styles/ReceiptStyles";

const UserSettings = () => {
  return (
    <View style={ContainerStyles.backgroundContainer}>
      <SafeAreaView />

        {/* Header container */}
        <View style={[ContainerStyles.centerContainer, { marginBottom: 32 }]}>
            <Image 
                source={require('../../../assets/user.png')}
                style={ContainerStyles.userPhoto}
            />
        </View>

        {/* Text fields */}
        <View style={ContainerStyles.paddingContainer}>

            {/* Firstname */}
            <Text style={FontStyles.body2Fat}>Fornavn</Text>
                <TextInput 
                    style={[ButtonStyles.defaultPlaceholder, { marginTop: 4 }]}
                    placeholder='+47 123 45 678'

                    value={''}
                    onChangeText={''}
                ></TextInput>

            {/* Lastname */}
            <Text style={FontStyles.body2Fat}>Etternavn</Text>
                <TextInput 
                    style={[ButtonStyles.defaultPlaceholder, { marginTop: 4 }]}
                    placeholder='+47 123 45 678'

                    value={''}
                    onChangeText={''}
                ></TextInput>

            {/* Email */}
            <Text style={FontStyles.body2Fat}>Email</Text>
                <TextInput 
                    style={[ButtonStyles.defaultPlaceholder, { marginTop: 4 }]}
                    placeholder='+47 123 45 678'

                    value={''}
                    onChangeText={''}
                ></TextInput>

            {/* Phone */}
            <Text style={FontStyles.body2Fat}>Telefon</Text>
                <TextInput 
                    style={[ButtonStyles.defaultPlaceholder, { marginTop: 4, marginBottom: 32 }]}
                    placeholder='+47 123 45 678'

                    value={''}
                    onChangeText={''}
                ></TextInput>

            <TouchableOpacity 
                style={[ButtonStyles.primaryBtn, {flexDirection: 'row', justifyContent: 'flex-start', paddingHorizontal: 12}]}
            >
                <Image 
                    source={require('../../../assets/trash.png')}
                    style={{ height: 20, width: 20, marginRight: 12}}
                />
                <Text style={FontStyles.smallBtn}>Slett profilen din</Text>
            </TouchableOpacity>

        </View>
      
    </View>
  )
}

export default UserSettings

const styles = StyleSheet.create({})