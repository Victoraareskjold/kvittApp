import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import OnboardingStyles from '../../../Styles/OnboardingStyles'

const OnboardingItem = ({item}) => {
  return (
    <View style={OnboardingStyles.sectionContainer}>

        <View style={OnboardingStyles.contentContainer}>
            <Image 
                source={item.image} 
                resizeMode='contain' 
                style={OnboardingStyles.heroImage}
            />

            <Text style={OnboardingStyles.subHeader}>{item.title}</Text>
            <Text style={OnboardingStyles.body}>{item.description}</Text>
        </View>

    </View>
  )
}

export default OnboardingItem

const styles = StyleSheet.create({})