import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    logo: {
        resizeMode: 'center'
    },

    view: {
        marginTop: 50,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },

    touchEsq: {
        marginTop: 20,
        width: '80%',
        height: 46,
        justifyContent: 'center',
        alignItems: 'center',
    },

    textWeight: {
        fontWeight: 'bold',
        fontSize: 15
    },

    touchable: {
        marginTop: 20,
        width: '80%',
        height: 46,
        borderRadius: 6,
        backgroundColor: '#0090de',
        justifyContent: 'center',
        alignItems: 'center',
    },

    touchableoff: {
        marginTop: 20,
        width: '80%',
        height: 46,
        borderRadius: 6,
        backgroundColor: '#AAA',
        justifyContent: 'center',
        alignItems: 'center',
    },

    textButton: {
        color: "#fff",
        fontWeight: 'bold',
    },

    textInput: {
        marginTop: 20,
        paddingLeft: 10,
        width: '80%',
        height: 46,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: "#999",
    },
});

export default styles;