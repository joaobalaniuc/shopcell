import {
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    TextInput,
    FlatList,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState, useEffect, useRef } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Card, Appbar } from 'react-native-paper';
import { countStock, listStocks } from '../../services/api';
import styles from './styles';
import Moment from 'moment';
import gFn from '../../libs/functions';

export default function RegisterSale(props) {

    //==============================================================
    // Declaration const and States
    //==============================================================

    const [showDate, setShowDate] = useState(false);
    const [date, setDate] = useState(new Date());
    const [productRecords, setProductRecords] = useState([{}]);


    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowDate(!showDate);
        setDate(currentDate);
    };

    //Const receive data navigation ListClients
    const { product, infoUser } = props.route.params;

    gFn.consoleLog(props.route.name, productRecords)




    const [formPayment, setFormPayment] = useState("money");
    const [flag, setFlag] = useState('Selecione o Cartão');
    const [fee, setFee] = useState('');
    const [quantity, setQuantity] = useState(0);


    const modalizeItem = useRef(null);


    //==============================================================
    // LifeCycle
    //==============================================================

    useEffect(() => {
        selectCountStock();
        selectProductRecords();
    }, [props.route.params]);

    useFocusEffect(
        React.useCallback(() => {

        }, [])
    );

    //==============================================================
    // OtherMethods
    //==============================================================

    // function select count stock product
    async function selectCountStock() {
        await countStock({
            find: {
                product_id: product._id,
                client_id: infoUser.store,
            }
        })
            .then((resp) => {
                if(resp.error != "Stock not exists"){
                    setQuantity(resp);
                };
            })
            .catch((error) => {
                console.log(error)
            });
    };

    // function select product records
    async function selectProductRecords() {
        await listStocks({
            find: { 
                product_id: product._id,
                client_id: infoUser.store,
            }
        })
            .then((resp) => {
                setProductRecords(resp);
            })
            .catch((error) => {
                console.log(error)
            });
    };

    //==============================================================
    //Render
    //==============================================================

    return (

        <SafeAreaView style={{ flex: 1 }}>

            <Appbar.Header style={styles.appbar}>
                <Appbar.BackAction onPress={() => { props.navigation.goBack() }} />
                <Appbar.Content title="Detalhes do Produto" subtitle="" />
                {/* <Appbar.Action icon="check" onPress={() => { finishSale() }} /> */}
            </Appbar.Header>

            <View style={styles.container}>
                <View style={styles.cardDetails}>
                    <FlatList
                        ListHeaderComponent={
                            <View style={styles.headerContainer}>
                                <View style={styles.cardCustomer}>
                                    <Text style={styles.textTitle}>
                                        {product.title}
                                    </Text>
                                    <Text style={styles.sTextCustomer}>
                                        {product.type}
                                    </Text>
                                </View>

                                <View style={styles.cardCustomer}>
                                    <View style={styles.viewTotalValue}>
                                        <Text style={styles.textValueTotal}>
                                            Estoque
                                        </Text>

                                        <View style={styles.viewTotalDiscount}>
                                            <Text style={styles.textValueTotal}>
                                                {quantity}
                                            </Text>
                                        </View>
                                    </View>
                                </View>

                                <View style={[styles.cardCustomer, { alignItems: 'center' }]}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={styles.cardSale}>
                                            <Text style={styles.textPag}>
                                                Data Inicial
                                            </Text>
                                        </View>
                                        <View style={styles.cardSale}>
                                            <Text style={styles.textPag}>
                                                Data Final
                                        </Text>
                                        </View>
                                    </View>
                                    <View style={styles.viewRangeDate}>
                                        <View style={styles.dropdown}>
                                            <TouchableOpacity>
                                                <TouchableOpacity onPress={() => { setShowDate(!showDate) }}>
                                                    <Text>
                                                        {Moment(date).format("DD/MM/YYYY")}
                                                    </Text>
                                                </TouchableOpacity>

                                            </TouchableOpacity>
                                            {
                                                showDate &&
                                                <DateTimePicker
                                                    testID="dateTimePicker"
                                                    value={date}
                                                    mode='date'
                                                    is24Hour={true}
                                                    display="default"
                                                    onChange={onChange}
                                                />
                                            }
                                        </View>

                                        <View style={styles.dropdown}>

                                            <TouchableOpacity>
                                                <TouchableOpacity onPress={() => { setShowDate(!showDate) }}>
                                                    <Text>
                                                        {Moment(date).format("DD/MM/YYYY")}
                                                    </Text>
                                                </TouchableOpacity>

                                            </TouchableOpacity>
                                            {
                                                showDate &&
                                                <DateTimePicker
                                                    testID="dateTimePicker"
                                                    value={date}
                                                    mode='date'
                                                    is24Hour={true}
                                                    display="default"
                                                    onChange={onChange}
                                                />
                                            }
                                        </View>


                                    </View>
                                </View>
                            </View>
                        }
                        showsVerticalScrollIndicator={false}
                        keyExtractor={productRecords => productRecords._id}
                        data={productRecords}
                        renderItem={({ item, index }) =>
                            <Card
                                style={styles.sCard}
                            >
                                <View style={styles.sViewCard}>
                                    <View style={styles.sListRight}>
                                        <View style={styles.vDescription}>
                                            <Text style={styles.sText}>
                                                {Moment(item.createdAt).format("DD/MM/YYYY")}
                                            </Text>
                                            <Text style={styles.sTextInfoList}>
                                                {item.imei}
                                            </Text>
                                        </View>
                                        <View style={styles.vPrice}>
                                            <Text style={styles.sText}>
                                                {item.type}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </Card>
                        } 
                        />
                </View>
            </View>
        </SafeAreaView>




    );
};
