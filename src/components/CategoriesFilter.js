import { StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";
import { categories, colors } from "../Categories";

const CategoriesFilter = () => {
    return (
        <View style={styles.container}>
           <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {categories.map((category, index) => {
                    return (
                        <View 
                            key={index} // Add a unique key prop
                            style={{ 
                                backgroundColor: index === 0 ? colors.COLOR_PRIMARY : colors.COLOR_GREY, 
                                marginRight: 8, 
                                borderRadius: 50, 
                                paddingVertical: 6, 
                                paddingHorizontal: 12,
                                marginTop: 20,
                                marginBottom: 48,
                            }}
                        >
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