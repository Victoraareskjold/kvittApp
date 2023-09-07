import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from "react-native";

const CategoriesFilter = ({ onSelectCategory }) => {
    const categories = ['Alle', 'Mat', 'Elektronikk', 'Klær', 'Helse', 'Trening', 'Underholdning', 'Reise'];
    const [activeCategory, setActiveCategory] = useState('');

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
        color: "#272727", // Standard tekstfarge
    },
    activeText: {
        color: "#FFF", // Tekstfarge for aktiv kategori
    },
});
