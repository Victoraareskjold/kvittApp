import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from "react-native";

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
                            styles.filterContainer,
                            item === activeCategory && styles.activeCategory,
                        ]}
                        onPress={() => handleCategoryPress(item)}
                    >
                        <Text
                            style={[
                                styles.filterText,
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
    filterContainer: {
        backgroundColor: "#FBFBFB",
        marginRight: 8,
        borderRadius: 50,
        paddingVertical: 6,
        paddingHorizontal: 12,
        marginTop: 0,
        marginBottom: 24,
    },
    activeCategory: {
        backgroundColor: "#2984FF",
    },
    filterText: {
        color: "#272727", 
        fontSize: 16,
    },
    activeText: {
        color: "#FFF", 
    },
});
