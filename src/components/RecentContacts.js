import React from 'react';
import { View, Text, FlatList, Image } from 'react-native';

import ContainerStyles from '../../Styles/ContainerStyles';
import FontStyles from '../../Styles/FontStyles';
import ReceiptStyles from '../../Styles/ReceiptStyles';
import Colors from '../../Styles/Colors';

const RecentContacts = ({ recentContacts }) => {
  return (
    <View style={[ContainerStyles.contactsContainer, {marginTop: 0, marginBottom: 24}]}>
      <Text style={[FontStyles.subHeader, { marginBottom: 24 }]}>Nylige personer</Text>
      <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal
          data={recentContacts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
              <View style={{ marginRight: 24 }}>
                <Image 
                    source={require('../../assets/user.png')}
                    style={ContainerStyles.smallUserPhoto}
                />
                <Text 
                    style={[ContainerStyles.userName, ReceiptStyles.storeText]}
                    numberOfLines={1}
                    ellipsizeMode='tail'
                >
                  {item.firstName}
                </Text>
              </View>
          )}
      />
    </View>
  );
}

export default RecentContacts;
