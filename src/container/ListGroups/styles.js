import { StyleSheet } from 'react-native';
import { color } from '../../assets/AppStyles';


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
        flex: 6
    },

    
    sCard: {
        margin: 0.5,
        backgroundColor: '#fafafa',
    },

    sViewCard: {
        flex: 1,
        flexDirection: 'row',
        height: 90,
        alignItems: "center",
        backgroundColor: "#fff"
    },

    sListRight: {
        flex: 2,
        height: "100%",
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingHorizontal: 10,
        paddingLeft: 15,
    },

    sListLeft: {
        flex: 4,
        height: "100%",
        justifyContent: 'center',
        paddingLeft: 15,
    },

    sText: {
        fontSize: 16,
        fontWeight: 'bold'
    },

    sTextInfoList: {
        color: "gray",
        fontSize: 13,
        fontWeight: 'bold'
    },

    sViewHeader: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    
    sTextTitle: {
        marginTop: 10,
        fontSize: 20,
    }, 

    searchbar: {
        width: '97%', 
        height: 46,
        elevation: 1,
        backgroundColor: "#fff",
        marginTop: 50,
    },

    sViewButton: {
        width: '97%',
        alignItems: 'flex-end',
    },

    sTouchNewProduct: {
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: '55%',
        height: 46,
        flexDirection: 'row',
    },

    sTextButtonNewProduct: {
        fontWeight: 'bold',
        color: color.primary,
    },
});

export default styles;