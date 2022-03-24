import { StyleSheet } from 'react-native';
import { color } from '../../assets/AppStyles';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        alignItems: 'center',
    },

    viewInfo: {
        flex: 1,
        backgroundColor: color.primary,
        width: '100%',
        borderBottomStartRadius: 50,
        borderBottomEndRadius: 50,
        padding: 20,
    },
    viewList: {
        flex: 1,
        padding: 10,
        width: '100%',
    },

    textTitle: {
        color: color.light,
        fontSize: 15,
        fontWeight: 'bold',
    },

    textMoney: {
        fontSize: 23,
        fontWeight: 'bold',
        color: color.light,
    },
    
    textMoneyMonth: {
        fontSize: 15,
        marginTop: 5,
        color: color.light,
    },
    

    textActions: {
        fontSize: 15,
        color: color.tertiary,
        fontWeight: 'bold',
        marginVertical: 10,
    },

    itemCard: {
        width: 100,
        height: 100,
        borderRadius: 15,
        padding: 5,
        marginHorizontal: 5,
        marginBottom: 1,
    },

    viewCard: {
        alignItems: 'center',
        justifyContent: 'space-around',
        height: '100%',
        width: '100%',
        padding: 5
    },

    textCard: {
        color: color.tertiary,
        fontSize: 11,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    itemListStore: {
        width: '100%',
        height: 100,
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: color.lightGray,
        elevation: 0,
    },

    viewItemCard: {
        height: '100%',
        width: '100%',
        padding: 10,
        borderRadius: 15,
        flexDirection: 'row',
        backgroundColor: color.light,

    },

    viewCardLeft: {
        flex: 1.5,
        alignItems: 'center',
        justifyContent: 'center'
    },

    viewCardRight: {
        flex: 7,
        justifyContent: 'center'
    },

    textSubtitle: {
        color: color.tertiary,
        fontSize: 12,
    },

    viewFinance: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },

    viewItemFinance: {
        flex: 2,
        alignItems: 'flex-start',
        height: 35,
        justifyContent: 'center',
        
    },

});

export default styles;