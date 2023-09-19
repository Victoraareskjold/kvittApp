import { StyleSheet, Text, View } from "react-native";
import Colors from "./Colors";

export default StyleSheet.create({
    header: {
        fontSize: 28,
        letterSpacing: 0.5,
        fontWeight: '600',
        color: Colors.default,
    },
    subHeader: {
        fontSize: 20,
        letterSpacing: 0.5,
        fontWeight: '500',
        color: Colors.default,
    },
    fatBody: {
        fontSize: 14,
        color: Colors.default,
        fontWeight: '800',
    },
    body: {
        color: Colors.default,
        fontSize: 14,
    },
    bodyFat: {
        color: Colors.default,
        fontSize: 14,
        fontWeight: '600',
    },
    body2: {
        fontSize: 14,
        color: Colors.default,
        opacity: 0.5,
    },
    body2Fat: {
        fontSize: 14,
        color: Colors.default,
        opacity: 0.5,
        fontWeight: '600',
        letterSpacing: .5,
    },

    /* Button fonts */
    linkBtn: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.primary,
        letterSpacing: 0.5,
    },
    bigBtn: {
        fontSize: 16,
        color: Colors.white,
        fontWeight: '600',
        letterSpacing: 0.5,
    },
    smallBtn: {
        fontSize: 14,
        color: Colors.white,
        fontWeight: '500',
        letterSpacing: 0.5,
    },
})

