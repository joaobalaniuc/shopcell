import { StyleSheet } from 'react-native';
import { color } from '../../assets/AppStyles';


const styles = StyleSheet.create({
    container: {
        padding: 10,
        paddingBottom: 1,
        flex: 1,
        width: "100%",
        height: '100%',
        alignItems: 'center',
    },

    vPrice: {
        flex: 1.2,
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingRight: 7,
    },

    viewButtonFinalizar: {
        alignItems: 'flex-end',
        justifyContent: 'center',
        width: '100%',
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: color.lightGray
    },

    sViewSpinner: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },


    search: {
        elevation: 1,
        width: '100%',
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
        width: '100%',
        height: '100%'

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
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingTop: 10,
    },

    buttonAdd: {
        width: '40%',
        height: 40,
        borderRadius: 5,
        backgroundColor: color.primary,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',

    },

    textButton: {
        fontWeight: 'bold',
        color: color.light,
    },

    modalize: {
        borderRadius: 10,
        padding: 5,
    },

    itemModalize: {
        borderRadius: 5,
        padding: 5,
        height: '100%',
        backgroundColor: "#fafafa"
    },

    viewTitleModalize: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        padding: 5,
    },

    sCard: {
        backgroundColor: '#fafafa',
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
        marginLeft: 20,
        flexDirection: 'row',

    },

    vDescription: {
        flex: 2,
        height: "100%",
        justifyContent: 'center',
    },

    sTextContainer: {
        fontWeight: 'bold',
        color: '#fff',
        fontSize: 20
    },

    sTextInfoList: {
        color: color.secondary,
        fontSize: 13,
    },

    sViewCard: {
        flex: 1,
        flexDirection: 'row',
        height: 90,
        alignItems: "center",
    },

    sText: {
        fontSize: 16,
        fontWeight: '600'
    },

    touchNewProduct: {
        flexDirection: 'row',
        backgroundColor: "#fff",
        borderWidth: 2,
        borderRadius: 10,
        borderColor: color.primary,
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        width: '100%',
        borderRadius: 5,
    },


});

export default styles;