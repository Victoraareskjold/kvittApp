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
    secondaryBtn: {
        backgroundColor: Colors.grey,
        borderRadius: 50,
        paddingVertical: 18,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 12,
    },
    addReceiptBtn: {
        backgroundColor: Colors.primary,
        borderRadius: 50,
        paddingVertical: 8,
        paddingHorizontal: 14,
        alignItems: "center",
    },
    filterBtn: {
        backgroundColor: Colors.grey,
        marginRight: 8,
        borderRadius: 50,
        paddingVertical: 8,
        paddingHorizontal: 16,
        marginTop: 0,
        marginBottom: 24,
    },
    deleteButton: {
        alignSelf: 'center',
        flexDirection: 'row',
/*         paddingHorizontal: 12, */
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 32,
        backgroundColor: 'red',
        width: '60%',
        paddingVertical: 12,
        borderRadius: 50,
    },

    /* Placeholders */
    defaultPlaceholder: {
        backgroundColor: Colors.darkGrey,
        paddingVertical: 16,
        paddingHorizontal: 16,
        marginBottom: 12,
        borderRadius: 50,
    },

    /* Icons */
    settingsIcon: {
        height: 24, 
        width: 24, 
        resizeMode: 'contain', 
        marginRight: 12,
      },

      /* Shared indicator */
      sharedIndicator: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 12,
        backgroundColor: 'rgba(36, 255, 0, .2)',
        paddingHorizontal: 4,
        paddingVertical: 0,
        borderRadius: 3,
      },
});

export default ButtonStyles;