import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from "react-native";

import Colors from "../../Styles/Colors";
import FontStyles from "../../Styles/FontStyles";
import ButtonStyles from "../../Styles/ButtonStyles";
import ContainerStyles from "../../Styles/ContainerStyles";

const CategoriesFilter = ({ onSelectCategory, excludeAll = true }) => { 
    const categories = ['Mat', 'Klær', 'Trening', 'Elektronikk', 'Undeholdning', 'Helse', 'Reise'];

    if (!excludeAll) {
        categories.unshift('Alle');
    }

    const [activeCategory, setActiveCategory] = useState(excludeAll ? '' : 'Alle');;

    const handleCategoryPress = (category) => {
        setActiveCategory(category);
        onSelectCategory(category);
    };

    return (
        <View style={styles.container}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {categories.map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[
                            ButtonStyles.filterBtn,
                            item === activeCategory && styles.activeCategory,
                        ]}
                        onPress={() => handleCategoryPress(item)}
                    >
                        <Text
                            style={[
                                FontStyles.body,
                                item === activeCategory && styles.activeText, // Legg til styling for aktiv tekst
                            ]}
                        >
                            {item}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

export default CategoriesFilter;

const styles = StyleSheet.create({
    container: {
        marginTop: 12,
        flexDirection: "row",
        alignItems: "center",
    },
    activeCategory: {
        backgroundColor: Colors.primary,
        color: Colors.white,
    },
    activeText: {
        color: Colors.white, 
    },
});
