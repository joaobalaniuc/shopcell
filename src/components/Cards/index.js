import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import styles from './styles';

export default function Card(props) {
    return (
        <View style={styles.cardFlex}>
            <View style={[styles.card, { width: '100%' }]}>
                <Text
                    style={[
                        styles.cardTitle,
                        { alignSelf: 'flex-start' }
                    ]}
                >
                    {props.title}
                </Text>
            </View>
        </View>
    );
}

export function BtnCard(props) {
    return (
        <TouchableOpacity
            style={styles.card}
            onPress={props.onPress}>
            <View style={styles.cardIcon}>
                <Icon
                    size={props.iconSize || 50}
                    color={props.iconColor || '#b7bfcc'}
                    name={props.icon || 'cube-outline'}
                    type={props.type || 'ionicon'}
                />
            </View>
            <Text style={styles.cardTitle}>
                {props.title}
            </Text>
        </TouchableOpacity>
    );
}
