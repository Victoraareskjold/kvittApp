import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import ContainerStyles from '../../Styles/ContainerStyles';

import ReceiptStyles from '../../Styles/ReceiptStyles';

const SearchResults = ({ results, sendFriendRequest }) => {
    return (
        <FlatList
            style={ContainerStyles.paddingContainer}
            data={results}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <TouchableOpacity
                    style={{ paddingVertical: 12 }}
                    onPress={() => sendFriendRequest(item.id)}
                >
                    <View>
                        <Text style={ReceiptStyles.storeText}>{item.name}</Text>
                        <Text style={ReceiptStyles.categoryText}>{item.phoneNumber}</Text>
                    </View>
                </TouchableOpacity>
            )}
        />
    );
};

export default SearchResults;
