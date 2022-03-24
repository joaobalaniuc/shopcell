import { StyleSheet } from 'react-native';
import { color } from '../../assets/AppStyles';

const styles = StyleSheet.create({
    
    container: {
        paddingBottom: 0,
        padding: 5,
        flex: 1,
        width: "100%",
        height: '100%',
        alignItems: 'center',
    },

    cardDetails: {
        borderRadius: 5,
        margin: 10,
        marginBottom: 0,
        width: '100%',
        flex: 1,
    },


    headerContainer: {
        paddingBottom: 1,
        flex: 1,
        width: "100%",
        height: '100%',
        alignItems: 'center',
    },

    appbar: {
        justifyContent: 'center',
        backgroundColor: "#0090de",
        elevation: 3,
        paddingRight: 2,
        paddingLeft: 2,
    },


    viewValueDisco: {
        alignItems: 'flex-end',
    },

    discountText: {
        color: 'red',
    },

    textTotalInative: {
        color: color.tertiary,
        textDecorationLine: 'line-through',
        fontSize: 18,
    },

    textTotalActive: {
        color: "#000",
        fontSize: 20,
    },

    touchableDisc: {
        backgroundColor: color.primary,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 46,
    },

    viewDiscountSpace: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        width: '100%',
    },

    textInputDisc: {
        borderBottomColor: color.tertiary,
        borderBottomWidth: 1,
        width: '40%',
        paddingBottom: 3,
    },

    containerStyle: {
        backgroundColor: 'white',
        width: '60%',
        height: '60%',

    },

    viewDesc: {
        backgroundColor: '#fafafa',
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        borderRadius: 5,
    },

    viewDiscount: {
        alignItems: 'flex-end',
        width: '100%',

    },

    viewTotalDiscount: {
        height: '100%',
        alignItems: 'flex-end',
    },

    textDiscount: {
        color: color.primary,
        fontWeight: 'bold',
    },

    textTitleDisc: {
        fontSize: 20,
        color: color.tertiary,
        fontWeight: 'bold',
    },

    textValueTotal: {
        fontSize: 15,
        color: color.primary,
        fontWeight: 'bold'
    },

    viewTotalValue: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        padding: 3,
    },

    textSelectCard: {
        fontSize: 12,
    },

    selectCreditCard: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        width: '100%',
        height: 50,
        padding: 10,
        alignItems: 'center',
        borderRadius: 5,
        elevation: 0.5,
    },

    buttonCredit: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        height: 50,
        alignItems: 'center',
        borderRadius: 5,
    },

    viewButtonCard: {
        alignItems: 'flex-start',
        padding: 10,
    },

    viewIcon: {
        padding: 10,
        width: '50%',
        alignItems: 'flex-end',
        justifyContent: 'center',
    },

    cardSale: {
        padding: 5,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: '50%'
    },

    viewRangeDate: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
    },

    cardSelect: {
        paddingTop: 5,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: '100%',
    },

    textPag: {
        fontWeight: 'bold',
        color: 'gray',
        textAlign: 'left',
    },

    textCredit: {
        fontWeight: 'bold',
        color: color.primary,
        textAlign: 'left',
        fontSize: 12
    },

    dropdown: {
        borderRadius: 5,
        borderColor: '#000',
        borderWidth: 1,
        padding: 5,
        height: 45,
        width: '48%',
        justifyContent: 'center',
    },

    dropdwonFlag: {
        color: 'blue',
        marginTop: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
        elevation: 0.5,
        padding: 5,
        height: 45,
        width: '100%',
        justifyContent: 'center',
    },

    fab: {
        position: 'absolute',
        margin: 20,
        right: 0,
        bottom: 0,
        backgroundColor: color.success,
    },

    cardCustomer: {
        backgroundColor: '#fafafa',
        borderRadius: 5,
        padding: 15,
        margin: 4,
        width: '100%',
    },


    textTitle: {
        color: color.primary,
        fontSize: 25,
        fontWeight: 'bold'
    },

    sTextCustomer: {
        color: color.secondary,
    },

    viewButtons: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 10
    },

    buttonAdd: {
        width: '47%',
        height: 46,
        borderRadius: 5,
        backgroundColor: color.primary,
        justifyContent: 'center',
        alignItems: 'center',

    },

    textButton: {
        fontWeight: 'bold',
        color: color.light,
    },

    modalize: {
        height: 600,
        borderRadius: 10,
        padding: 5,
    },

    itemModalize: {
        borderRadius: 5,
        padding: 5,
        height: '100%',
        backgroundColor: '#fafafa'
    },

    viewTitleModalize: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fafafa',
        padding: 5,
    },

    sCard: {
        elevation: 0,
        backgroundColor: '#fafafa'
    },

    sViewCard: {
        flex: 1,
        flexDirection: 'row',
        height: 90,
        alignItems: "center",
        elevation: 0,
    },



    sListLeft: {
        height: "100%",
        width: 70,
        flexDirection: 'column',
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 10,

    },

    sListRight: {
        flex: 1,
        width: '100%',
        height: "100%",
        justifyContent: 'center',
        paddingLeft: 20,
        flexDirection: 'row',

    },

    vDescription: {
        flex: 9,
        height: "100%",
        justifyContent: 'center',
    },

    sTextContainer: {
        fontWeight: 'bold',
        color: '#fff',
        fontSize: 20
    },

    sTextTouch: {
        fontWeight: 'bold',
        color: '#fff',
        fontSize: 15
    },

    sTextInfoList: {
        color: "gray",
        fontSize: 12,
    },

    touchDate: {
        justifyContent: 'center',
        height: 46,
        paddingLeft: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'gray'

    },

    vPrice: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    sText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#000'
    },

    touchNewProduct: {
        borderWidth: 1,
        borderColor: color.primary,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        flexDirection: 'row',
        height: 40
    },
    
});

export default styles;