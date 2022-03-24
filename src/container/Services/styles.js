import { StyleSheet } from 'react-native';
import { color } from '../../assets/AppStyles';

const styles = StyleSheet.create({

    container: {
        flex: 1,
        width: "100%",
        alignItems: 'center',
    },

    graphic: {
        flex: 1.2,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 5,
        paddingTop: 5,
    },
 
    elementGraphic: {
        backgroundColor: color.light,
        width: '100%',
        height: '100%',
        borderRadius: 10,
        elevation: 3,
        shadowColor: '#000',
        padding: 15

    },

    textGraphic: {
        fontWeight: 'bold',
        fontSize: 20,
        color: color.primary,
    },


    dashboard: {
        flex: 2,
        padding: 20,

    },

    elementDashboard: {
        padding: 15,
        backgroundColor: color.light,
        width: '46%',
        shadowColor: '#000',
        elevation: 3,
        borderRadius: 10,
        height: '100%'

    },

    bodyDashboard: {
        width: '100%',
        height: '31%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 25,
    },

    iconDashbord: {
        width: '100%',
        height: '80%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    header: {
        width: '100%',
        height: 55,
        paddingLeft: 10,
        alignItems: 'baseline',
        justifyContent: 'center',
    },

    body: {
        backgroundColor: '#f9f9f9',
        width: '100%',
        flex: 1,
    },
})

export default styles;