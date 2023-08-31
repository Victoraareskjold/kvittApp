import { StyleSheet, Text, View, Pressable, Image, ScrollView } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import React from 'react'

const KvitteringDetails = ({ navigation, route }) => {

  const { item }= route.params;
  
  console.log(item);
  return (
    <View style={{backgroundColor: '#FFF', flex: 1}}>
    <SafeAreaView style={{ backgroundColor: '#FFF'}}/>

      <ScrollView 
      showsVerticalScrollIndicator={false}
      >

        <View style={styles.container}>

            {/* Header container */}
            <View style={styles.headerContainer}>
                <Pressable onPress={() => navigation.goBack()}>
                    <Image 
                        source={require("../../assets/backVector.png")}
                        style={{ width: 32, height: 32 }}
                    />
                </Pressable>
                
                <Text style={styles.header}>{item.name}</Text>

                <Pressable>
                    <Image 
                        source={require("../../assets/dots.png")}
                        style={{ width: 32, height: 32 }}
                    />
                </Pressable>
            </View>

            {/* Kvittering innhold */}
            <View style={styles.kvitteringContainer}>

                {/* Butikk logo */}
                <Image 
                    source={item.image}
                    style={{ width: '100%', height: 100, resizeMode: 'contain', marginBottom: 32 }}
                />

                {/* Overskrift & dato */}
                <View style={{ marginBottom: 32 }}>
                    <Text style={styles.subHeader}>{item.name}</Text>
                    <Text style={styles.body2}>{item.dato}</Text>
                </View>

                {/* Divider */}
                <Image 
                    source={require("../../assets/divider.png")}
                    style={{ width: '100%', height: 0, marginBottom: 32 }}
                />

                {/* Varer */}
                <View style={styles.alleVarerContainer}>
                    <View style={styles.varerContainer}>
                        <Text style={styles.body2}>Vare</Text>
                        <Text style={styles.body2}>{item.pris}</Text>
                    </View>
                    <View style={styles.varerContainer}>
                        <Text style={styles.body2}>Vare</Text>
                        <Text style={styles.body2}>{item.pris}</Text>
                    </View>
                    <View style={styles.varerContainer}>
                        <Text style={styles.body2}>Vare</Text>
                        <Text style={styles.body2}>{item.pris}</Text>
                    </View>
                    <View style={styles.varerContainer}>
                        <Text style={styles.body2}>Vare</Text>
                        <Text style={styles.body2}>{item.pris}</Text>
                    </View>
                    <View style={styles.varerContainer}>
                        <Text style={styles.body2}>Vare</Text>
                        <Text style={styles.body2}>{item.pris}</Text>
                    </View>
                    
                </View>

                {/* Total pris */}
                <View style={styles.totPrisContainer}>
                    <View style={styles.varerContainer}>
                        <Text style={styles.body1}>Vare</Text>
                        <Text style={styles.body1}>{item.pris}</Text>
                    </View>
                </View>

                {/* Barcode */}
                <Image 
                    source={require("../../assets/barcode.png")}
                    style={{ width: '100%', height: 62 }}
                />

            </View>

        </View>

      </ScrollView>

    </View>
  )
}

export default KvitteringDetails

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        marginHorizontal: 24,
    },
    bgContainer: {
        backgroundColor: '#FFF',
    },
    headerContainer: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    kvitteringContainer: {
        marginTop: 32,
        backgroundColor: '#FFF',
        paddingHorizontal: 24,
        paddingVertical: 24,

        
        shadowColor: '#959da5',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.25, 
        shadowRadius: 8, 
        elevation: 2,
    },
    filterContainer: {
        marginLeft: 24,
    },
    varerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    alleVarerContainer: {
        marginBottom: 32,
    },
    totPrisContainer: {
        marginBottom: 32,
    },

    header: {
        fontSize: 28,
        fontWeight: 'bold',
    },
    subHeader: {
        fontSize: 24,
    },
    body1: {
        fontSize: 16,
        fontWeight: '600',
    },
    body2: {
        fontSize: 14,
    },
});