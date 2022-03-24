import { StyleSheet } from 'react-native';
import { AppStyles, color } from '../../assets/AppStyles';

const styles = StyleSheet.create({
    btn: {
        alignSelf: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        borderWidth: 4,
        borderColor: 'transparent',
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    rounded: {
        borderRadius: 10
    },
    round: {
        borderRadius: 300
    },
    outline: {
        backgroundColor: 'transparent'
    },
    btnPrimary: {
        backgroundColor: color.primary,
        borderColor: color.primary,
    },
    btnSecondary: {
        backgroundColor: color.secondary,
        borderColor: color.secondary,
    },
    btnSuccess: {
        backgroundColor: color.success,
        borderColor: color.success,
    },
    btnInfo: {
        backgroundColor: color.info,
        borderColor: color.info,
    },
    btnWarning: {
        backgroundColor: color.warning,
        borderColor: color.warning,
    },
    btnDanger: {
        backgroundColor: color.danger,
        borderColor: color.danger,
    },
    btnLight: {
        backgroundColor: color.light,
        borderColor: color.light,
    },
    btnDark: {
        backgroundColor: color.dark,
        borderColor: color.dark,
    }
});

export default styles;