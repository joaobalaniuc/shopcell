import { StyleSheet } from 'react-native';
import { color } from '../../assets/AppStyles';

const styles = StyleSheet.create({
    cardFlex: {
        flex: 1.2,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 5,
        paddingTop: 30,
    },
    elementGraphic: {
        backgroundColor: 'white',
        width: '100%',
        height: '100%',
        borderRadius: 10,
        elevation: 2,
        shadowColor: '#000',
        padding: 15
    },
    card: {
        padding: 15,
        backgroundColor: 'white',
        width: '46%',
        shadowColor: 'white',
        elevation: 2,
        borderRadius: 10,
        height: '100%',
    },
    cardTitle: {
        fontWeight: 'bold',
        fontSize: 15,
        alignSelf: 'center',
        color: "#0090de",
    },
    cardIcon: {
        width: '100%',
        height: '80%',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default styles;
