import { StyleSheet } from 'react-native';
import { color } from '../../assets/AppStyles';

const styles = StyleSheet.create({

    container: {
        flex: 1,
        padding: 5,
        backgroundColor: '#fafafa'
    },

    bodyContainer: {
        flex: 1,
        backgroundColor: '#fafafa',
        padding: 5,
    },

    buttonImei: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    
    buttonImeiUp: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 20,
    },

    textButton: {
        color: color.light,
        fontWeight: 'bold',
    },

    textRemove: {
        fontWeight: 'bold',
        color: 'red',
        marginTop: 10,
    },

    textTitleQuant: {
        fontSize: 20,
        color: color.tertiary,
        fontWeight: 'bold',
    },

    fab: {
        position: 'absolute',
        margin: 20,
        right: 0,
        bottom: 0,
        backgroundColor: color.success,
    },

    sPicker: {
        height: 45,
        marginTop: 5,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'gray',
        justifyContent: 'center',
    },

    touchDate: {
        justifyContent: 'center',
        height: 46,
        paddingLeft: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'gray'
    },

    checkBox: {
        alignItems: 'center',
        flexDirection: 'row',
    },

    textInput: {
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'gray',
        height: 46,
    },

    viewProdutos: {
        backgroundColor: '#fff',
        borderRadius: 5,
    },

    textTitle: {
        color: color.primary,
        fontSize: 20,
        fontWeight: 'bold',
    },

    subAction: {
        alignItems: 'flex-end',
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginTop: 20,
        marginBottom: 20,
        minHeight: 45,
        borderWidth: 1,
        borderColor: color.tertiary,
        padding: 10,
        borderRadius: 5,
    },

    viewButtonAdd: {
        marginTop: 15,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: 5,
        padding: 5,
    },

    buttonAdd: {
        width: '20%',
        height: 40,
        borderRadius: 5,
        justifyContent: 'flex-end',
        alignItems: 'center',
        flexDirection: 'row',
    },

    inputSearch: {
        height: 46,
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: '#fff',
        elevation: 0.5,
        paddingLeft: 10,
    },

    viewButtonImei: {
        justifyContent: 'flex-end',
        marginTop: 5,
        flexDirection: 'row',

    },
    
    viewButtonSave: {
        justifyContent: 'center',
        marginTop: 5,
        flexDirection: 'row',
        marginTop: 40,
    },

    cardFlat: {
        backgroundColor: '#fafafa',
        width: '100%',
        height: 70,
        borderRadius: 0,
        flexDirection: 'row',
    },

    viewItemFlat: {
        height: '100%',
        width: '50%',
        justifyContent: 'center',
        paddingLeft: 10,
        paddingRight: 10,
    },

    viewFlat: {
        elevation: 4,
    },

    textInputDialog: {
        height: 40,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'gray',
        marginTop: 3,
    },

    textInputQuant: {
        height: 50,
        width: '50%',
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        marginTop: 3,
        textAlign: 'center',
        fontSize: 20
    },

    viewDialog: {
        flex: 1,
        padding: 10,
        paddingTop: 20,
    },

    textTitleDialog: {
        fontWeight: 'bold',
        marginTop: 10,
        textAlign: 'center',
        fontSize: 20,
    },

    gridDialog: {
        flexDirection: 'row',
        marginTop: 5,
    },

    viewSection: {
        width: '100%',
        alignItems: 'center',
        paddingBottom: 20,
    },

    itemGridDialog: {
        flex: 1,
        justifyContent: 'space-around',
        paddingHorizontal: 5
    },

    viewDialogImei: {
        marginTop: 20,
    },

    touchConfirm: {
        backgroundColor: color.success,
        width: '23%',
        height: 40,
        borderRadius: 5,
        marginLeft: 3,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 3,
    },

    itemImei: {
        height: 25,
        width: '100%',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: color.tertiary,
        marginTop: 5,
        paddingLeft: 10,
        paddingRight: 3,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    },

    touchCloseImei: {
        height: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },

    touchDialog: {
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 20,
        padding: 15,
        borderRadius: 5,
    },

    viewActions: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingRight: 15,
        marginBottom: 5,
    },

    appbar: {
        justifyContent: 'center',
        backgroundColor: "#0090de",
        elevation: 3,
        paddingRight: 2,
        paddingLeft: 2,
    },

    viewTrash: {
        width: '50%',
        height: '100%',
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingRight: 10,
    },

    touchFinalizar: {
        margin: 20,
        borderRadius: 5,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color.success,
    },




    body: {
        marginTop: 10,
    },


})

export default styles;