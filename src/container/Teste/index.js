import React from 'react';
import { Text, View } from 'react-native';
import AppStyles from '../../assets/AppStyles';
import Btn from '../../components/Buttons';
// import Styles from './styles';

export default function Teste() {
    function alt() {
        alert("Funcionou !!!");
    }

    return (
        <>
            <View style={{ flex: 1, backgroundColor: '#ccc' }}>


                <Btn btn='success' text='Botão 01' onPress={() => alt()} />
                <Btn btn='rounded-primary' text='Botão 02' onPress={() => alt()} />
                <Btn btn='outline-round-danger' text='Botão 03' onPress={() => alt()} />
                <Btn btn='outline-rounded-dark' text='Botão 04' onPress={() => alt()} />
                <Btn btn='round-success-block' text='Botão 05' onPress={() => alt()} />

                <Btn btn='round-warning' style={{ width: '40%' }} text='Botão 06' onPress={() => alt()} />


            </View>
        </>
    );
}