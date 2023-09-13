import { StyleSheet } from "react-native";

import Colors from "./Colors";

const ButtonStyles = StyleSheet.create({
    primaryBtn: {
        backgroundColor: Colors.primary,
        borderRadius: 50,
        paddingVertical: 18,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 12,
    },
    addReceiptBtn: {
        backgroundColor: "#2984FF",
        borderRadius: 50,
        paddingVertical: 6,
        paddingHorizontal: 12,
        alignItems: "center",
    },
    filterBtn: {
        backgroundColor: "#FBFBFB",
        marginRight: 8,
        borderRadius: 50,
        paddingVertical: 6,
        paddingHorizontal: 12,
        marginTop: 0,
        marginBottom: 24,
    },

    /* Placeholders */
    defaultPlaceholder: {
        backgroundColor: Colors.grey,
        paddingVertical: 16,
        paddingHorizontal: 16,
        marginBottom: 12,
        borderRadius: 50,
    },
});

export default ButtonStyles;