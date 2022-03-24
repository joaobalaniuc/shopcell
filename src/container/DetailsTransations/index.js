import {
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    TextInput,
    FlatList,
    ActivityIndicator
} from 'react-native';
import { resumeTransation } from '../../services/api';
import React, { useState, useEffect, useRef } from 'react';
import { Card, Appbar } from 'react-native-paper';
import { color } from '../../assets/AppStyles';
import { Icon } from 'react-native-elements';
import gFn from '../../libs/functions';
import styles from './styles';

export default function RegisterSale(props) {

    //==============================================================
    // Declaration const and States
    //==============================================================

    //Const receive data navigation ListClients
    const { selectItems, item } = props.route.params;


    const [discountedValue, setDiscountedValue] = useState(0);
    const [dataTransation, setDataTransation] = useState([]);
    const [total, setTotal] = useState(0);


    //==============================================================
    // LifeCycle
    //==============================================================

    useEffect(() => {
        listTransations();
    }, [props.route.params]);



    //==============================================================
    // OtherMethods
    //==============================================================

    // Function list date transation
    function listTransations() {
        const { item } = props.route.params;
        setDataTransation([]);
        resumeTransation({
            _id: item._id
        })
            .then((resp) => {
                setDataTransation(resp);
            })
            .catch((error) => {
                console.log(error);
            })
    }
 

    //==============================================================
    //Render
    //==============================================================

    return (

        <SafeAreaView style={{ flex: 1 }}>

            <Appbar.Header style={styles.appbar}>
                <Appbar.BackAction onPress={() => { props.navigation.goBack() }} />
                <Appbar.Content title="Ordem" subtitle="" />
            </Appbar.Header>

            <View style={styles.container}>
                <View style={styles.cardDetails}>
                    <FlatList
                        ListHeaderComponent={
                            <View style={styles.headerContainer}>
                                <Text style={styles.textTitles}>
                                    Detalhes
                                </Text>
                            </View>
                        }
                        showsVerticalScrollIndicator={false}
                        keyExtractor={target => target.title}
                        data={dataTransation.target}
                        renderItem={({ item }) =>
                            <Card
                                style={styles.sCard}
                            >
                                <View style={styles.sViewCard}>
                                    <View style={styles.sListRightIcon}>
                                        <Icon
                                            size={25}
                                            color={color.primary}
                                            name='basket-outline'
                                            type='ionicon'
                                        />
                                    </View>
                                    <View style={styles.sListRight}>
                                        <View style={styles.vDescription}>
                                            <Text style={styles.sText}>
                                                {item.quantity} x {' '}
                                                {
                                                    (item.title === undefined) ?
                                                        ""
                                                        : (item.title.length <= 11) ?
                                                            item.title
                                                            :
                                                            item.title.substring(0, 40) + "..."
                                                }
                                            </Text>
                                            <Text style={styles.sTextInfoList}>
                                                Teste
                                        </Text>
                                        </View>
                                        <View style={styles.vPrice}>
                                            <Text style={styles.sText}>
                                                {gFn.convertMoneyString(item.total)}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </Card>
                        }
                        ListFooterComponent={
                            <View style={styles.footerContainer}>
                                <View style={[styles.viewDetailsClient, { flexDirection: 'row', marginBottom: 20 }]}>
                                    <View>
                                            <Text style={styles.textTitles}>
                                                {item.type == 'entry' && 'Entrada'}
                                                {item.type == 'sale' && 'Venda'}
                                                {item.type == 'exit' && 'Saída'}
                                                {item.type == 'bleed' && 'Sangria'}
                                                {item.type == 'change' && 'Fundo de troco'}
                                                {item.type == 'supply' && 'Suprimento'}
                                                {item.type == 'transfer' && 'Transferência'}
                                            </Text>
                                        <Text style={styles.textSub}>
                                            {(item.status == "") && "Confirmado"}
                                            {(item.status == "canceled") && "Operação cancelada"}
                                        </Text>
                                    </View>

                                    <View style={styles.viewIconCredit}>
                                        <Icon
                                            size={25}
                                            color={(item.status == "") ? color.success : color.quartiary}
                                            name='pricetag-outline'
                                            type='ionicon'
                                        />
                                    </View>
                                </View>


                                <Text style={styles.textTitles}>
                                    Cliente
                                </Text>
                                <View style={styles.viewDetailsClient}>
                                    <Text style={styles.textTitles}>
                                        Lucas Soares dos Santos
                                    </Text>
                                    <Text style={styles.textSub}>
                                        Contato: 9 9821-9176
                                    </Text>
                                    <Text style={styles.textSub}>
                                        Documento: 131.134.976-63
                                    </Text>
                                </View>

                                <View style={[styles.viewDetailsClient, { flexDirection: 'row' }]}>
                                    <View>
                                        <Text style={styles.textTitles}>
                                            Cartão de crédito
                                        </Text>
                                        <Text style={styles.textSub}>
                                            Parcelado em 12x
                                        </Text>
                                    </View>

                                    <View style={styles.viewIconCredit}>
                                        <Icon
                                            size={25}
                                            color={color.primary}
                                            name='card-outline'
                                            type='ionicon'
                                        />
                                    </View>
                                </View>


                                <View style={[styles.viewDetailsClient, { flexDirection: 'row', borderColor: color.light }]}>
                                    <View>
                                        <Text style={styles.textTitles}>
                                            Total
                                        </Text>
                                        {
                                            item.discount != 0 &&
                                            <View>
                                                <Text style={styles.textTitles}>
                                                    Desconto
                                                </Text>
                                                <Text style={styles.textTitles}>
                                                    Valor Final
                                                </Text>
                                            </View>
                                        }
                                    </View>

                                    <View style={styles.viewIconCredit}>

                                        <Text style={(item.discount != 0) && { textDecorationLine: 'line-through', color: color.tertiary }}>
                                            {gFn.convertMoneyString(item.value)}
                                        </Text>
                                        {
                                            (item.discount != 0) &&
                                            <View>
                                                <Text>
                                                    {gFn.convertMoneyString(item.discount)}
                                                </Text>
                                                <Text>
                                                    {gFn.convertMoneyString(item.value - item.discount)}
                                                </Text>
                                            </View>
                                        }
                                    </View>
                                </View>
                            </View>
                        }
                    />
                    <View style={styles.viewButtonSave}>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};
