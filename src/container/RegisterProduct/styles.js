import { StyleSheet } from 'react-native';
import { color } from '../../assets/AppStyles';

const styles = StyleSheet.create({
    container: {
        padding: 15,
        flex: 1,
        width: "100%",
        alignItems: 'center',
    },

    viewSwitch: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: color.lightGray,
        padding: 3
    },

    dropdown: {
        borderRadius: 5,
        borderColor: '#A1A29D',
        borderWidth: 1,
        padding: 5,
        height: 45,
        width: '100%',
        justifyContent: 'center',
    },

    header: {
        flexDirection: 'row',
        width: '100%',
        height: 60,
        justifyContent: 'center',
    },

    touchable: {
        width: '100%',
        height: 46,
        borderRadius: 5,
        backgroundColor: '#017FC1',
        justifyContent: 'center',
        alignItems: 'center',

    },

    textTouch: {
        fontWeight: 'bold',
        color: '#fff',
    },

    itemHeader: {
        flex: 1,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    itemHeader1: {
        flex: 5,
        height: '100%',
        paddingLeft: 10,
        justifyContent: 'center',
    },

    layout: {
        marginTop: 10,
        flex: 1,
        width: '100%',

    },

    textBold: {
        fontWeight: 'bold',
        fontSize: 18,
    },

    titleInput: {
        color: 'gray',
        fontWeight: 'bold',

    },

    textInput: {
        width: '100%',
        height: 46,
        borderColor: '#A1A29D',
        borderRadius: 5,
        borderWidth: 1,
        marginTop: 5,
        paddingLeft: 10,
    },

    element: {
        marginTop: 20,
    },

    element2: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    element1: {
        paddingTop: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    areaButton: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
    },

    price: {
        width: '48%'
    },

    information: {
        width: '48%'
    },
})

export default styles;