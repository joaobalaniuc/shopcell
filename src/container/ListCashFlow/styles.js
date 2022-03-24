import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    fab: {
        position: 'absolute',
        margin: 20,
        right: 0,
        bottom: 0,
        backgroundColor: "#4285F4",
    },

    sViewLista: {
        flex: 6,
    },

    sCard: {
        flexDirection: 'row',
        backgroundColor: '#fff',
    },

    sViewCard: {
        flex: 1,
        flexDirection: 'row',
        height: 90,
        alignItems: "center",
        backgroundColor: "#fff"
    },

    sListLeft: {
        flex: 1,
        height: 90,
        alignItems: "flex-end",
        justifyContent: 'center',
        backgroundColor: "#fff",
    },

    sListRight: {
        flex: 8,
        height: "100%",
        justifyContent: 'center',
        paddingLeft: 15

    },

    sText: {
        fontSize: 16,
        fontWeight: 'bold',
    },

    sTextInfoList: {
        color: "gray",
        fontSize: 12,
        fontStyle: 'italic'
    },

    searchbar: {
        width: '97%',
        height: '80%',
        elevation: 1,
        backgroundColor: "#fff",
    },

    appbar: {
        justifyContent: 'center',
        backgroundColor: "#0090de",
        elevation: 3,
        paddingRight: 2,
        paddingLeft: 2,
    },
});

export default styles;