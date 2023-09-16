import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

import OnboardingAssets from './OnboardingAssets'
import { SafeAreaView } from 'react-native'
import Slider from '../../components/Slider'
import OnboardingStyles from '../../../Styles/OnboardingStyles'
import Colors from '../../../Styles/Colors'
import SetupName from './SetupName'

const Onboarding = ({ navigation }) => {

    const { navigate } = useNavigation();

  return (
    <SafeAreaView style={{flex:1, backgroundColor: Colors.white,}}>
        <View style={OnboardingStyles.centerContainer}>
            <View style={OnboardingStyles.headerContainer}>
                <Image 
                    source={require('../../../assets/kvittLogo.png')}
                    style={{height: 32, width: 32, marginRight: 12}}
                />
                <Text style={OnboardingStyles.header}>Kvitt</Text>
            </View>

            <View style={OnboardingStyles.mainContainer}>
                <Slider />
            </View>

            <View style={OnboardingStyles.buttonsContainer}>
                <TouchableOpacity 
                    style={OnboardingStyles.primaryBtn}
                    onPress={() => navigation.navigate('LoginScreen')}
                >
                    <Text style={OnboardingStyles.linkText}>Logg inn</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate('SetupName')}
                >
                    <Text style={OnboardingStyles.linkText2}>Registrer deg</Text>
                </TouchableOpacity>
            </View>
        </View>
    </SafeAreaView>
  )
}

export default Onboarding

const styles = StyleSheet.create({})