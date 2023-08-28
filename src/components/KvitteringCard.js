import { FlatList, StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { kvitteringList, colors } from "../Constant";

const KvitteringCard = () => {
    return (
        <View style={styles.kvitteringContainer}>
            <FlatList 
                data={kvitteringList} 
                renderItem={({ item }) => (
                    
                        /* Kvittering boks */
                        <View 
                        style={{
                            backgroundColor: colors.COLOR_LIGHT,
                            borderRadius: 15,
                            marginVertical: 12,
                            alignItems: 'center',
                            paddingHorizontal: 12,
                            paddingVertical: 12,

                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 0 },
                            shadowOpacity: 0, 
                            shadowRadius: 0, 
                        }}
                    >
                        {/* Kvittering innhold */}
                        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            
                            {/* Ikon, kategori og dato */}
                            <View style={{ flexDirection: 'row', alignItems: 'center', height: 36 }}>
                                <Image 
                                    source={require("../../assets/icon.png")}
                                    style={{ width: 24, height: 24, marginRight: 12 }}
                                />
                                <View>
                                    <Text style={{ fontSize: 16 }}>{item.name}</Text>
                                    <Text>{item.dato}</Text>
                                </View>
                            </View>

                            {/* Pris */}
                            <View>
                                <Text>{item.pris}</Text>
                            </View>
                        </View>
                        </View>
                )}
            />
        </View>
    );
};

export default KvitteringCard;

const styles = StyleSheet.create({
    kvitteringContainer: {
        padding: 12,
        backgroundColor: '#272727',
        borderRadius: 25,
        marginTop: 12,
        marginBottom: 32,
    }
});
