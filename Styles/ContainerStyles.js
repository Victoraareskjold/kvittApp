import Colors from "./Colors";

export default {
    backgroundContainer: {
        backgroundColor: Colors.white,
        flex: 1,
    },
    headerContainer: {
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        paddingHorizontal: 24,
        marginBottom: 32,
    },
    topRight: {
        paddingHorizontal: 24,
        marginBottom: 24,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'flex-end'
    },
    subHeaderContainer: {
        paddingHorizontal: 24,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
    },
    contactsContainer: {
        paddingHorizontal: 24,
    },
    searchContainer: {
        flexDirection: 'row',
        marginTop: 0,
        backgroundColor: '#FBFBFB',
        paddingVertical: 12,
        flexDirection: 'row',
        borderRadius: 50,
        paddingHorizontal: 12,
        alignItems: 'center',
    },
    filterContainer: {
        paddingLeft: 24,
    },
    columnContainer: {
        paddingHorizontal: 24,
        marginBottom: 32,
        marginTop: 32
    },
    placeholderContainer: {
        paddingHorizontal: 24,
    },
    errorMessageContainer: {
        alignItems: 'center',
        marginBottom: 24,
    },
    paddingContainer: {
        paddingHorizontal: 24,
    },
    settingsBtnContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    centerContainer: {
        paddingHorizontal: 24,
        alignItems: 'center',
    },
    userPhoto: {
        height: 96,
        width: 96,
    },
    smallUserPhoto: {
        height: 64,
        width: 64,
    },
    smallerUserPhoto: {
        height: 48,
        width: 48,
        marginRight: 12,
    },

    /* DateTimePicker */
    DatePlaceholder: {
        backgroundColor: '#FBFBFB',
        paddingVertical: 16,
        paddingHorizontal: 16,
        marginBottom: 0,
        borderRadius: 15,
    },
    datePicker: {
        height: 160,
        marginTop: -10,
    },

    userName: {
        textAlign: 'center',
        width: 64,
        overflow: 'hidden',
        marginTop: 6,
    },
};