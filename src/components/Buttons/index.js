import React from 'react';
import { Children } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styles from './styles';
import { color } from '../../assets/AppStyles';

// Function to customize colors
function formatColors(type) {
    var btn = {};
    const options = type.split('-');

    // Customize options
    options.map((option) => {
        // Define properties
        if (option == 'outline') {
            btn.outline = styles.outline;
            return;
        }
        if (option == 'block') {
            btn.block = {width: '100%'};
            return;
        }
        if (option == 'rounded') {
            btn.type = styles.rounded;
            return;
        }
        if (option == 'round') {
            btn.type = styles.round;
            return;
        }

        // Define color
        switch (option) {
            case 'primary':
                btn.color = styles.btnPrimary;
                btn.textColor = btn.outline ? color.primary : 'white';
                break;
            case 'secondary':
                btn.color = styles.btnSecondary;
                btn.textColor = btn.outline ? color.secondary : 'white';
                break;
            case 'success':
                btn.color = styles.btnSuccess;
                btn.textColor = btn.outline ? color.success : 'white';
                break;
            case 'info':
                btn.color = styles.btnInfo;
                btn.textColor = btn.outline ? color.info : 'white';
                break;
            case 'warning':
                btn.color = styles.btnWarning;
                btn.textColor = btn.outline ? color.warning : 'white';
                break;
            case 'danger':
                btn.color = styles.btnDanger;
                btn.textColor = btn.outline ? color.danger : 'white';
                break;
            case 'light':
                btn.color = styles.btnLight;
                btn.textColor = btn.outline ? color.light : color.dark;
                break;
            case 'dark':
                btn.color = styles.btnDark;
                btn.textColor = btn.outline ? color.dark : 'white';
                break;
            default:
                btn.color = styles.btnPrimary;
                btn.textColor = btn.outline ? color.primary : 'white';
                break;
        }
    })

    return btn;
}

export default function Btn(props) {
    // Custom button colors
    const button = formatColors(props.btn);

    return (
        <TouchableOpacity
            style={[
                styles.btn,
                button.color,
                button.type,
                button.outline,
                button.block,
                props.style
            ]}
            onPress={props.onPress}
        >
            {props.children}
            <Text style={[
                { color: props.textColor || button.textColor },
                { fontSize: props.fontSize || 18 },
                { fontWeight: props.fontWeight || 'normal' },
                { textAlign: 'center' }
            ]}>
                {props.text}
            </Text>
        </TouchableOpacity>
    );
}
