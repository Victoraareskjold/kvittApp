import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';

const SearchResults = ({ results, sendFriendRequest }) => {
  return (
    <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
            <TouchableOpacity
                style={{ borderBottomWidth: 1, borderColor: "gray", paddingVertical: 4 }}
                onPress={() => sendFriendRequest(item.id)}
            >
            <View>
                <Text>{item.name}</Text>
                {/* Legg til en knapp for å sende venneforespørsel her */}
            </View>
            </TouchableOpacity>
        )}
        />
  );
};

export default SearchResults;
