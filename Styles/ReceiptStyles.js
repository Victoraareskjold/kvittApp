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
    },
    dateText: {
        color: Colors.default,
        opacity: 0.6,
    },
    categoryText: {
        color: Colors.default,
        opacity: 0.6,
    },
    priceText: {
        color: Colors.primary, 
        fontWeight: '600',
    },
    dateHeader: {
        backgroundColor: Colors.grey,
        fontSize: 14,
        fontWeight: '500',
        color: Colors.default,
        paddingHorizontal: 24,
        paddingVertical: 2,
    },
};