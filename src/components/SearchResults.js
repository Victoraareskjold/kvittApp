import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import ContainerStyles from '../../Styles/ContainerStyles';
import ReceiptStyles from '../../Styles/ReceiptStyles';
import Colors from '../../Styles/Colors';

// Hjelpefunksjon for å formatere telefonnummer
const formatPhoneNumber = (phoneNumber) => {
    const strippedNumber = phoneNumber.substring(3); // Fjerner +47 fra starten
    return `${strippedNumber.substring(0, 3)} ${strippedNumber.substring(3, 5)} ${strippedNumber.substring(5)}`;
};

const SearchResults = ({ results, sendFriendRequest }) => {
    return (
        <FlatList
            data={results}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <TouchableOpacity
                    style={{ paddingVertical: 24, borderColor: Colors.lightGrey, borderBottomWidth: 1 }}
                    onPress={() => sendFriendRequest(item.id)}
                >
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Image 
                            source={require('../../assets/user.png')}
                            style={ContainerStyles.smallerUserPhoto}    
                        />
                        <View style={{flexDirection: 'column'}}>
                            <Text style={ReceiptStyles.storeText}>{item.name}</Text>
                            <Text style={ReceiptStyles.categoryText}>{formatPhoneNumber(item.phoneNumber)}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            )}
        />
    );
};

export default SearchResults;
