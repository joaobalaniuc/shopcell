import { StyleSheet, Dimensions } from 'react-native';
import { color } from '../../assets/AppStyles';

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    viewValues: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: color.quartiary,
    },

    viewHeader: {
        padding: 10,
    },

    sViewLista: {
        flex: 6
    },

    sTextTitle: {
        marginTop: 10,
        fontSize: 20,
    },

    viewTitleDate: {
        width: windowWidth * 0.45,
    },

    sCard: {
        margin: 0.5,
        elevation: 0
    },

    dropdwonFlag: {
        backgroundColor: color.quartiary,
        borderRadius: 20,
        elevation: 0.5,
        padding: 5,
        height: 35,
        justifyContent: 'center',
        width: windowWidth * 0.7,
    },

    chip: {
        backgroundColor: color.quartiary,
        marginHorizontal: 5,
    },

    viewChip: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },

    sViewCard: {
        flex: 1,
        flexDirection: 'row',
        height: 90,
        alignItems: "center",
    },

    sListRight: {
        flex: 1,
        height: "100%",
        justifyContent: 'center'

    },

    sText: {
        fontSize: 18,
        color: color.primary,
        fontWeight: 'bold'
    },

    sTextInfoList: {
        color: "gray",
        fontSize: 12,
    },

    modalize: {
        paddingHorizontal: 10,
    },

    viewDesc: {
        padding: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },

    viewDescData: {
        paddingVertical: 25,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },

    textTitleDisc: {
        fontWeight: 'bold',
        fontSize: 14,
    },

    body: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },

    touchDate: {
        justifyContent: 'center',
        height: 46,
        paddingLeft: 10,
        borderRadius: 10,
        backgroundColor: color.lightGray,
        width: windowWidth * 0.45,
    },

    textInfo: {
        color: color.tertiary,
        fontSize: 12,
    },

    touchFilterDate: {
        backgroundColor: color.primary,
        width: windowWidth * 0.6,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },

    searchbar: {
        width: windowWidth * 0.95,
        height: 46,
        elevation: 1,
        backgroundColor: "#fff",
    },

    viewSearch: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        paddingVertical: 20,
    },

    viewFoot: {
        padding: 20,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
    },


})

export default styles;