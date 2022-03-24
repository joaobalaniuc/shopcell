import { StyleSheet } from 'react-native';
import { color } from '../../assets/AppStyles';


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    sViewHeader: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },

    sViewButton: {
        width: '97%',
        alignItems: 'flex-end',
    },

    sTextTitle: {
        marginTop: 10,
        fontSize: 20,
    },

    fab: {
        position: 'absolute',
        margin: 20,
        right: 0,
        bottom: 0,
        backgroundColor: color.primary,
    },

    sTextButtonNewProduct: {
        fontWeight: 'bold',
        color: color.primary,
    }, 

    sTouchNewProduct: {
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: '55%',
        height: 46,
        flexDirection: 'row',
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
        height: 46,
        elevation: 1,
        backgroundColor: "#fff",
        marginTop: 50,
    },

    appbar: {
        justifyContent: 'center',
        backgroundColor: color.primary,
        elevation: 3,
        paddingRight: 2,
        paddingLeft: 2,
    },
});

export default styles;