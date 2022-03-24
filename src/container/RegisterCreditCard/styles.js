import { StyleSheet } from 'react-native';
import { color } from '../../assets/AppStyles';

const styles = StyleSheet.create({


    container: {
        backgroundColor: '#fff',
        flex: 1,
        width: "100%",
        height: '100%',
        alignItems: 'center',
        padding: 10,
    },

    appbar: {
        justifyContent: 'center',
        backgroundColor: "#0090de",
        elevation: 3,
        paddingRight: 2,
        paddingLeft: 2,
    },

    sViewCard: {
        flex: 1,
        width: '100%',
    },

    modalize: {
        width: '100%',
        flex: 1,
    },

    itemModalize: {
        borderRadius: 5,
        height: '100%'
    },

    viewTitleModalize: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5
    },

    sTextCustomer: {
        color: color.secondary,
    },

    viewNewCard: {
        padding: 5
    },

    textSubTitle: {
        marginBottom: 5,
        color: 'gray',
        fontWeight: 'bold'
    },

    inputDesc: {
        borderWidth: 1,
        borderColor: color.primary,
        borderRadius: 5,
        height: 40,
        paddingLeft: 10,
    },


    viewNewTax: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 5,
        marginTop: 10,
        marginBottom: 10,
    },

    touchNewProduct: {
        width: '20%',
        backgroundColor: color.light,
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        borderRadius: 5,
    },

    viewTax: {
        padding: 10,
        paddingTop: 0,
    },

    viewDescTax: {
        justifyContent: 'center',
    },

    sText: {
        fontSize: 12,
        color: 'gray',
    },

    textTax: {
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        height: 40,
        paddingLeft: 3,
        width: '95%',
        paddingBottom: 0
    },

    textInputTax: {
        flexDirection: 'row',
    },

    viewItensTax: {
        flex: 3,
        marginTop: 10,
    },

    viewItensTax1: {
        flex: 0.5,
        alignItems: 'flex-end',
        paddingRight: 10,
        justifyContent: 'flex-end',
    },

    touchOkProduct: {
        width: '100%',
        backgroundColor: color.light,
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        borderRadius: 5,
    },

    textDescriptionList: {
        marginBottom: 5,
        color: color.primary,

        fontSize: 16
    },

    viewTaxList: {
        padding: 10,
        backgroundColor: '#fff',
        width: '100%',
        height: 60,
        elevation: 0,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    textTitle: {
        color: 'gray',
        fontSize: 12,
        marginTop: -8,
    },

    touchDelete: {
        alignItems: 'flex-end',
        justifyContent: 'center',

    },

    fab: {
        position: 'absolute',
        margin: 20,
        right: 0,
        bottom: 0,
        backgroundColor: color.success,
    },
    
});
export default styles;