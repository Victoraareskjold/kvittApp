import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Pressable, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react'

const AddReceipt = ({ navigation }) => {
    return (
        <View style={{backgroundColor: '#FFF', flex: 1}}>
            <SafeAreaView />
            <ScrollView showsVerticalScrollIndicator={false}>

                {/* Header container */}
                <View style={styles.headerContainer}>
                <Pressable onPress={() => navigation.goBack()}>
                    <Image 
                        source={require("../../assets/backVector.png")}
                        style={{ width: 32, height: 32 }}
                    />
                </Pressable>
                <Text style={styles.header}>Hjem</Text>
                </View>

                {/* Recent receipts */}
                <View style={styles.kvitteringContainer}>

                    <View style={styles.subHeaderContainer}>
                        <Text style={styles.subHeader}>Nylige kvitteringer</Text>

                        {/* Se alle btn */}
                        <TouchableOpacity 
                        onPress={() => navigation.navigate('AlleKvitteringerScreen')}
                        >
                            <Text style={styles.linkBtn}>Se alle</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </ScrollView>
      </View>
    );
}

export default AddReceipt;

const styles = StyleSheet.create({

    /* Containers */
    headerContainer: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: 24,
        marginBottom: 48,
    },
    kvitteringContainer: {
        paddingHorizontal: 24,
    },
    subHeaderContainer: {
        flex: 1, 
        flexDirection: 'row', 
        alignItems: 'baseline', 
        justifyContent: 'space-between',
    },

    /* Text */
    header: {
        fontSize: 28,
        fontWeight: 'bold',
    },
    subHeader: {
        fontSize: 24,
    },
    linkBtn: {
        fontSize: 16,
        fontWeight: '600',
        color: '#2984FF',
    },
})