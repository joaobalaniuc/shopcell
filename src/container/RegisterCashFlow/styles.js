import { StyleSheet } from 'react-native';
import { color } from '../../assets/AppStyles';

const styles = StyleSheet.create({


    container: {
        backgroundColor: '#fff',
        flex: 1,
        width: "100%",
        height: '100%',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingTop: 20
    },

    viewOperations: {
        backgroundColor: '#fafafa',
        borderRadius: 5,
        marginTop: 8,
        paddingHorizontal: 5,

    },

    touchCourses: {
        padding: 10,
        borderRadius: 10,
        margin: 5,
        backgroundColor: color.primary,
        // borderColor: color.primary,
        // borderWidth: 2,
        width: '45%',
        alignItems: 'center',
        justifyContent: 'center',
    },

    textButton: {
        fontWeight: 'bold',
        color: color.light,
    },

    appbar: {
        justifyContent: 'center',
        backgroundColor: "#0090de",
        elevation: 3,
        paddingRight: 2,
        paddingLeft: 2,
    },

    sCard: {
        elevation: 0,
    },

    viewTaxList: {
        padding: 10,
        width: '100%',
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderLeftWidth: 2,
        borderLeftColor: color.tertiary,
        marginBottom: 10,
        paddingLeft: 20,
    },

    infoBox: {
        borderRadius: 5,
        padding: 10,
        marginTop: 5,
        borderWidth: 1,
        borderColor: color.tertiary,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'

    },

    sViewCard: {
        flex: 1,
        width: '100%',
    },

    modalize: {
        width: '100%',
        flex: 1,
        marginBottom: 20,
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
        padding: 1,
        marginTop: 10,
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
    },

    touchNewProduct: {
        width: '20%',
        backgroundColor: color.light,
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingRight: 3,
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


    viewItensTax: {
        flex: 3,
        marginTop: 10,
    },

    viewItensTax1: {
        flex: 0.5,
        alignItems: 'flex-end',
        paddingRight: 10,
        paddingTop: 10,
        justifyContent: 'flex-end',
    },

    touchOkProduct: {
        width: '20%',
        backgroundColor: color.success,
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
        bottom: 0,
        width: '60%',
        backgroundColor: color.success,
    },

    viewFoot: {
        backgroundColor: color.primary,
        width: '100%',
        height: 70,
        padding: 10,
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        flexDirection: 'row'
    },

    touchableFoot: {
        backgroundColor: color.light,
        flexDirection: 'row',
        width: '100%',
        height: 40,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'space-evenly',

    },

    viewFooterLeft: {
        flex: 2,
        flexDirection: 'row',
        alignItems: 'center',
        height: '100%',
    },

    viewFooterRight: {
        flex: 1.5,
        justifyContent: 'center',
        height: '100%',
        alignItems: 'flex-end',
    },

    viewFooterStart: {
        flex: 0.5,
        alignItems: 'center',
        justifyContent: 'center',
    }


});
export default styles;