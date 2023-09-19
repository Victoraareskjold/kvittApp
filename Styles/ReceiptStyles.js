import Colors from "./Colors";

export default {

    /* Containers */
    receiptCard: {
        backgroundColor: Colors.white,
        borderRadius: 15,
        marginBottom: 0,
        alignItems: "center",
        paddingHorizontal: 24,
        paddingVertical: 20,
    },
    priceContainer: {
        backgroundColor: Colors.lightPrimary,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 3,
        flexDirection: 'row',
    },
    receiptAlignment: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    cardAlignment: {
        flexDirection: "row",
        alignItems: "center",
        height: 36,
    },

    /* Icons */
    iconStyle: {
        width: 40, 
        height: 40, 
        marginRight: 12, 
        resizeMode: 'contain',
    },

    /* Fonts */
    storeText: {
        color: Colors.default,
        fontSize: 18, 
        textTransform: 'capitalize',
        fontWeight: '400',
    },
    dateText: {
        color: Colors.default,
        opacity: 0.6,
        fontWeight: '400',
    },
    categoryText: {
        color: Colors.default,
        opacity: 0.6,
        fontWeight: '400',
    },
    priceText: {
        color: Colors.primary, 
        fontSize: 16,
        fontWeight: '600',
    },
    dateHeader: {
        backgroundColor: Colors.grey,
        fontSize: 16,
        fontWeight: '500',
        color: Colors.defaultLight,
        paddingHorizontal: 24,
        paddingVertical: 4,
        opacity: 1,
    },
};