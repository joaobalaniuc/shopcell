import { StyleSheet } from 'react-native';
import { color } from '../../assets/AppStyles';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
    },

    viewButtonAdd: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },

    textSubTitle: {
        marginBottom: 5,
        color: 'gray',
        fontWeight: 'bold'
    },

    viewNewCard: {
        padding: 10,
    },

    inputDesc: {
        borderWidth: 1,
        borderColor: color.primary,
        borderRadius: 5,
        height: 46,
        paddingLeft: 10,
    },

    textTax: {
        borderWidth: 1,
        borderColor: color.primary,
        borderRadius: 5,
        height: 40,
        paddingLeft: 10,
    },

    fab: {
        position: 'absolute',
        margin: 20,
        right: 0,
        bottom: 0,
        backgroundColor: color.success,
    },

    touchDelete: {
        alignItems: 'flex-end',
        paddingRight: 25,
        justifyContent: 'center',
        width: '70%',
        height: '100%',

    },

    cardCustomer: {
        marginTop: 5,
        backgroundColor: '#fafafa',
        borderRadius: 5,
        padding: 20,
        margin: 2,
        width: '100%',
    },

    cardList: {
        width: '100%',
        height: '100%',
        marginTop: 5,
        backgroundColor: '#fafafa',
        borderRadius: 5,
        margin: 2,
        paddingTop: 5,
    },

    sCard: {
        height: 70,
        width: '100%',
        borderRadius: 5,
        elevation: 0,
        backgroundColor: '#fafafa',
    },


    headerListCard: {
        marginVertical: 5,
        backgroundColor: '#fafafa',
        borderRadius: 5,
        padding: 10,
        margin: 2,
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    textTitle: {
        color: color.primary,
        fontSize: 20,
        fontWeight: 'bold'
    },

    sTextCustomer: {
        color: color.secondary,
    },

    viewButtons: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingTop: 10,
    },

    buttonAdd: {
        width: '60%',
        height: 40,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',

    },

    textButton: {
        fontWeight: 'bold',
        color: color.primary,
        marginLeft: 10,
    },

    modalize: {
        height: 600,
        borderRadius: 10,
        padding: 5,
    },

    itemModalize: {
        borderRadius: 5,
        padding: 5,
        height: '100%'
    },

    viewTitleModalize: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
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
        marginLeft: 20,
        flexDirection: 'row',

    },

    vDescription: {
        flex: 4,
        height: "100%",
        justifyContent: 'center',
    },

    sTextContainer: {
        fontWeight: 'bold',
        color: '#fff',
        fontSize: 20
    },

    sTextInfoList: {
        color: "gray",
        fontSize: 12,
    },

    vPrice: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },

    sViewCard: {
        flex: 1,
        flexDirection: 'row',
        height: 90,
        alignItems: "center",
        backgroundColor: "#FAFAFA"
    },

    sText: {
        fontSize: 16,
        fontWeight: 'bold'
    },

    touchNewProduct: {
        flexDirection: 'row',
        borderWidth: 2,
        borderColor: color.primary,
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        width: '100%',
        borderRadius: 10,
    },

    viewTax: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },

    viewDescTax: {
        flex: 2,
        justifyContent: 'center',
    },

    textInputTax: {
        flex: 1
    },
});

export default styles;