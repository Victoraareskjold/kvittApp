import { StyleSheet, Text, View, Image, placeholder, ScrollView } from "react-native";
import React from "react";
import { categories, colors } from "../Constant";

const CategoriesFilter = () => {
    return (
        <View style={styles.container}>
           <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {categories.map(( category, index ) => {
                    return (
                    <View 
                    style={{ 
                        backgroundColor: index === 0 ? colors.COLOR_PRIMARY: colors.COLOR_LIGHT, 
                        marginRight: 8, 
                        borderRadius: 50, 
                        paddingVertical: 6, 
                        paddingHorizontal: 12,
                        marginVertical: 20,
                         }}>
                        <Text style={{ color: index === 0 && colors.COLOR_LIGHT_ALT, fontSize: 14 }}>{category.category}</Text>
                    </View>
                    );
                })}
           </ScrollView>
        </View>
    );
};

export default CategoriesFilter;

const styles = StyleSheet.create ({
    
});