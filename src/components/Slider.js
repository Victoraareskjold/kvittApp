import { FlatList, StyleSheet, Text, View } from 'react-native'
import { useState, useRef } from 'react'
import React from 'react'
import OnboardingAssets from '../screens/onboarding/OnboardingAssets'
import OnboardingItem from '../screens/onboarding/OnboardingItem'
import Pagination from './Pagination'

const Slider = () => {

    const [currentIndex, setCurrentIndex] = useState(0);

    const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

    const onViewRef = useRef(({ viewableItems }) => {
        setCurrentIndex(viewableItems[0].index);
    });

  return (
    <View>
        <FlatList 
            style={{ width: '100%' }}
            data={OnboardingAssets}
            renderItem={({item}) => <OnboardingItem item={item}/>}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            snapToAlignment='center'
            onViewableItemsChanged={onViewRef.current}
            viewabilityConfig={viewConfigRef.current}
        />

        <Pagination data={OnboardingAssets} activeIndex={currentIndex} />
    </View>
  )
}

export default Slider

const styles = StyleSheet.create({})