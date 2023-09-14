import Colors from "./Colors";
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

export default {
    headerContainer: {
        paddingHorizontal: 24,
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonsContainer: {
        paddingHorizontal: 24,
        alignItems: 'center',
    },
    mainContainer: {
        justifyContent: 'space-between',
    },
    sectionContainer: {
        width: screenWidth,
        paddingHorizontal: 24,
    },            
    centerContainer: {
        justifyContent: 'space-between',
        flex: 1,
        paddingVertical: 32,
    },
    heroImage: {
        width: screenWidth - 48,
        height: 250,
        marginBottom: 24,
    },
    subHeader: {
        fontSize: 24,
        fontWeight: 'bold',
        letterSpacing: 1,
        textAlign: 'center',
        color: Colors.default,
        width: screenWidth - 48
    },
    header: {
        fontSize: 32,
        fontWeight: 'bold',
        letterSpacing: 1,
        color: Colors.default,
    },
    body: {
        fontSize: 16,
        fontWeight: 'regular',
        letterSpacing: 1,
        textAlign: 'center',
        color: Colors.default,
        opacity: 0.76,
        width: screenWidth - 48,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 50,
        marginHorizontal: 4,
    },
    dotContainer: {
        marginTop: 24,
        flexDirection: 'row',
        justifyContent: 'center',
    },

    primaryBtn: {
        backgroundColor: Colors.primary,
        borderRadius: 50,
        paddingVertical: 18,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 12,
    },

    linkText: {
        color: Colors.white,
        fontSize: 14,
        fontWeight: 700,
    },
    linkText2: {
        color: Colors.default,
        fontSize: 14,
        fontWeight: 700,
    },
};