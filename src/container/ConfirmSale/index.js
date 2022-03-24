import {
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    TextInput,
    FlatList,
    ActivityIndicator
} from 'react-native';
import { addTransation, listPMethods, updateStock, listStocks } from '../../services/api';
import React, { useState, useEffect, useRef } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { TextInputMask } from 'react-native-masked-text';
import { Picker } from '@react-native-picker/picker';
import { Card, Appbar } from 'react-native-paper';
import { Modalize } from 'react-native-modalize';
import { color } from '../../assets/AppStyles';
import { Icon } from 'react-native-elements';
import gFn from '../../libs/functions';
import styles from './styles';

export default function RegisterSale(props) {

    //==============================================================
    // Declaration const and States
    //==============================================================

    //Const receive data navigation ListClients
    const {
        idStore,
        matrix_id,
        user_id,
        client,
        selectItems,
        total,
        listItems,
        valueDiscounts,
        percentualDiscounts,
        discountedValues } = props.route.params.sale;

    const _id = user_id;

    const [formPayment, setFormPayment] = useState("money");
    const [listMethodsPayments, setListMethodsPayment] = useState([]);
    const [idMethodPayment, setIdMethodPayment] = useState('');
    const [subTotal, setSubTotal] = useState(total);
    const [discountedValue, setDiscountedValue] = useState(0);
    const [fees, setFees] = useState([]);
    const [fee, setFee] = useState('');
    const [creditCards, setCreditCards] = useState([]);
    const [credit, setCredit] = useState([]);
    const [flag, setFlag] = useState('Selecione');
    const [percentualDiscount, setPercentualDiscount] = useState(0);
    const [valueDiscount, setValueDiscount] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [loading, setLoading] = useState(false);


    const modalizeItem = useRef(null);
    const modalizeDiscount = useRef(null);




    //==============================================================
    // LifeCycle
    //==============================================================

    useEffect(() => {
        listCreditCard();
        setValueDiscount(valueDiscounts);
        setPercentualDiscount(percentualDiscounts);
        setDiscountedValue(discountedValues);
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            listCreditCard();
        }, [])
    );

    //==============================================================
    // OtherMethods
    //==============================================================

    // Function list creditCard
    function listCreditCard() {
        listPMethods({
            matrix_id: matrix_id,
        })
            .then((resp) => {

                var listCreditCard = [];
                var listCredit = [];
                var methods = [];
                var methodsTax = [];
                resp.map((item) => {

                    // list of credit card fees
                    if (item.type == "credit") {
                        listCredit.push(item);
                    }
                    // list of credit card fees
                    if (item.type == "credit card") {
                        listCreditCard.push(item);
                    }
                    // list payment methods
                    if (methods.indexOf(item.type) == -1) {
                        methods.push(item.type);
                        if (item.type == "credit card") { item.title = "Cartão de Crédito" }
                        methodsTax.push({ _id: item._id, type: item.type, title: item.title });

                    }
                });
                setListMethodsPayment(methodsTax);
                setCreditCards(listCreditCard);
                setCredit(listCredit);
            })
            .catch((error) => {
                console.log(error)
            });
    };


    //Function finish sale
    async function finishSale() {
        setLoading(true);
        var i = 0;
        var j = 0;
        // For para rodas todos os items selecionados
        for (i; i < selectItems.length; i++) {
            // For para salvar os dados no mongo
            for (j; j < selectItems[i].quantity; j++) {
                updateStock(
                    {
                        _id: selectItems[i].stocks[0].stock_ids[j],
                        // imei: selectItems[i].imeis[j] != "" ? selectItems[i].imeis[j] : null,
                        stockData: {
                            client_id: client,
                        }
                    }
                ).then((resp) => { console.log(resp) })
                    .catch((error) => { console.log(error) });
            }
        };

        addTransation({
            matrix_id: matrix_id,
            user_id: _id,
            type: 'sale',
            target: listItems,
            paymentMethod: {
                payment_id: idMethodPayment,
                fee_id: fee != '' ? fee : null,
            },
            from: idStore,
            to: client._id,
            status: '',
            discount: total - subTotal,
            value: total,
        })
            .then((resp) => { props.navigation.navigate("ConfirmFinishedSale") })
            .catch((error) => { console.log("Error: ", error) });
        setLoading(false);
    };



    // Function navigation add new credit card
    function navigationNewCreditCard() {
        props.navigation.navigate("RegisterCreditCard", { condition: 0, matrix_id: matrix });
    }

    // Function for map items dropdown flags
    let serviceItems = fees.map((s, i) => {
        return <Picker.Item key={i} value={s._id} label={s.description} />
    });


    // Function for select flag credit card
    function selectFlag(item) {

        setFees(item.fees);
        setFlag(item.title);
        setFee(item.fees[0]._id);
        setIdMethodPayment(item._id);
        modalizeItem.current?.close();

    }

    // Function select discount
    function selectDiscount(text, cond) {

        if (cond === 0) {

            setPercentualDiscount(0);
            if (text <= total) {
                setValueDiscount(text);
                const valueDiscount = total - text;
                setSubTotal(valueDiscount);
            } else {
                gFn.toastConfirm("Valor do desconto deve ser menor que valor total")
            }

        } else if (cond === 1) {

            setValueDiscount(0);
            setPercentualDiscount(text);
            setDiscount(total * (text / 100));
            const valueDiscount = total - (total * (text / 100));
            setSubTotal(valueDiscount);
        };
    };

    // Function apply discount
    function applyDiscount() {

        if (valueDiscount == 0 && percentualDiscount == 0) {
            setDiscountedValue(0);
        } else {
            setDiscountedValue(subTotal);
        }
        modalizeDiscount.current?.close();

    }



    //==============================================================
    //Render
    //==============================================================

    return (

        <SafeAreaView style={{ flex: 1 }}>



            <Appbar.Header style={styles.appbar}>
                <Appbar.BackAction onPress={() => { props.navigation.goBack() }} />
                <Appbar.Content title="Confirmar Venda" subtitle="" />
                {/* {
                    !loading ?
                        <Appbar.Action icon="check" onPress={() => { finishSale() }} />
                        :
                        <ActivityIndicator
                            size="small"
                            color={color.light}
                            style={{ paddingRight: 10 }}
                        />
                } */}
            </Appbar.Header>

            <View style={styles.container}>
                <View style={styles.cardDetails}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        keyExtractor={selectItems => selectItems._id.product_id}
                        data={selectItems}
                        ListHeaderComponent={
                            <View style={{ paddingVertical: 6, }}>
                                <Text style={styles.textTitle}>
                                    Items Selecionados
                                </Text>
                            </View>
                        }
                        renderItem={({ item }) =>
                            <Card
                                style={styles.sCardItems}
                            >
                                <View style={styles.sViewCard}>
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
                                        </View>
                                        <View style={styles.vPrice}>
                                            <Text style={styles.sText}>
                                                {gFn.convertMoneyString(item.priceTotal)}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </Card>
                        }
                        ListFooterComponent={
                            <View style={styles.headerContainer}>
                                <View style={styles.cardCustomer}>

                                    <Text style={styles.textTitle}>
                                        Cliente
                                    </Text>

                                    <View style={styles.viewSection}>

                                        <Text style={styles.textTitle}>
                                            {client.name}
                                        </Text>

                                        <Text style={styles.sTextCustomer}>
                                            {client.email}
                                        </Text>
                                    </View>


                                    <Text style={styles.textTitle}>
                                        Selecione a forma de pagamento
                                    </Text>

                                    <View style={{ paddingVertical: 10 }}>
                                        <View style={styles.dropdown}>
                                            <Picker
                                                selectedValue={formPayment}
                                                onValueChange={
                                                    (itemValue) => {
                                                        setFormPayment(itemValue),
                                                            setIdMethodPayment(itemValue._id)
                                                        setFee('')
                                                    }
                                                }>
                                                {
                                                    listMethodsPayments.map((item) => {
                                                        return (
                                                            <Picker.Item label={item.title} value={item} />
                                                        )
                                                    })
                                                }
                                            </Picker>
                                        </View>

                                        {
                                            (formPayment.type == 'credit card' || formPayment.type == "credit") &&
                                            <View style={[styles.cardSelect, { marginBottom: 30 }]}>
                                                <View style={styles.cardSelect}>
                                                    <TouchableOpacity
                                                        onPress={() => { modalizeItem.current?.open() }}
                                                        style={styles.selectCreditCard}
                                                    >

                                                        <View style={[styles.buttonCredit]}>
                                                            <View style={styles.viewButtonCard}>
                                                                <Icon
                                                                    size={25}
                                                                    color={color.primary}
                                                                    name='card-outline'
                                                                    type='ionicon'
                                                                />
                                                            </View>
                                                            <View style={styles.viewButtonCard}>
                                                                <Text style={styles.textCredit}>
                                                                    Forma de pagamento
                                                            </Text>
                                                                <Text style={styles.textSelectCard}>
                                                                    {flag}
                                                                </Text>
                                                            </View>
                                                        </View>
                                                        <View style={styles.viewIcon}>
                                                            <View>
                                                                <Icon
                                                                    size={25}
                                                                    color={color.primary}
                                                                    name='chevron-forward-outline'
                                                                    type='ionicon'
                                                                />
                                                            </View>
                                                        </View>
                                                    </TouchableOpacity>
                                                    {
                                                        (flag != 'Selecione') &&
                                                        <View style={styles.dropdwonFlag}>
                                                            <Picker
                                                                selectedValue={fee}
                                                                onValueChange={
                                                                    (itemValue) => setFee(itemValue)
                                                                }>
                                                                {serviceItems}
                                                            </Picker>
                                                        </View>
                                                    }
                                                </View>
                                            </View>
                                        }

                                        <Text style={[styles.textTitle, { marginTop: 20 }]}>
                                            Total
                                        </Text>

                                        <View style={[styles.viewSection, { alignItems: 'flex-end' }]}>

                                            <Text style={(discountedValue === 0) ? styles.textTotalActive : styles.textTotalInative}>
                                                {gFn.convertMoneyString(total)}
                                            </Text>
                                            {
                                                (discountedValue != 0) &&
                                                <View style={styles.viewValueDisco}>
                                                    {
                                                        (discountedValue - total != 0 && percentualDiscount == 0) &&
                                                        <Text style={styles.discountText}>
                                                            {gFn.convertMoneyString(discountedValue - total)}
                                                        </Text>
                                                    }
                                                    {
                                                        (percentualDiscount != 0) &&
                                                        <View style={styles.viewValueDisco}>
                                                            <Text style={styles.discountText}>
                                                                {percentualDiscount}%
                                                            </Text>
                                                            <Text style={styles.discountText}>
                                                                - {gFn.convertMoneyString(discount)}
                                                            </Text>
                                                        </View>
                                                    }
                                                    <Text>
                                                        {gFn.convertMoneyString(discountedValue)}
                                                    </Text>
                                                </View>
                                            }


                                            <TouchableOpacity onPress={() => { modalizeDiscount.current?.open() }}>
                                                {
                                                    (discount === 0) ?
                                                        <Text style={styles.textDiscount}>
                                                            Inserir Desconto
                                                        </Text>
                                                        :
                                                        <Text style={styles.textDiscount}>
                                                            Alterar Desconto
                                                        </Text>

                                                }
                                            </TouchableOpacity>
                                        </View>
                                    </View>

                                    <View style={{ alignItems: 'flex-end' }}>
                                        <TouchableOpacity
                                            onPress={() => finishSale()}
                                            style={[styles.buttonAdd, { backgroundColor: color.success }]}
                                        >
                                            {
                                                loading ?
                                                    <ActivityIndicator
                                                        size="small"
                                                        color="#fff"
                                                    />
                                                    :
                                                    <>
                                                        <Icon
                                                            size={20}
                                                            color={'white'}
                                                            name='checkmark-outline'
                                                            type='ionicon'
                                                        />
                                                        <Text style={styles.textButton}>
                                                            Finalizar
                                                </Text>
                                                    </>
                                            }
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        }
                    />
                </View>
            </View>

            <Modalize
                ref={modalizeItem}
                snapPoint={600}
                modalHeight={600}
            >
                <View style={styles.modalize}>
                    <View style={styles.itemModalize}>
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            ListHeaderComponent={
                                <View style={styles.viewTitleModalize}>
                                    <Text style={styles.textTitle}>
                                        Selecione a Forma de Pagamento
                                    </Text>
                                </View>
                            }
                            keyExtractor={creditCards => creditCards._id}
                            data={formPayment.type == "credit card" ? creditCards : credit}
                            renderItem={({ item, index }) =>
                                <Card
                                    style={styles.sCardPayment}
                                    onPress={() => { selectFlag(item, index) }}
                                >
                                    <View style={styles.sViewCardPayment}>
                                        <View style={styles.sListRight}>
                                            <View style={[styles.vDescription, { flex: 1 }]}>
                                                <Icon
                                                    size={25}
                                                    color={color.primary}
                                                    name='card-outline'
                                                    type='ionicon'
                                                />
                                            </View>
                                            <View style={[styles.vDescription, { paddingLeft: 10 }]}>
                                                <Text style={styles.sText}>
                                                    {item.title}
                                                </Text>
                                                {
                                                    item.type === "credit card" ?
                                                        <Text style={styles.sTextInfoList}>
                                                            Cartão de Crédito
                                                        </Text>
                                                        :
                                                        <Text style={styles.sTextInfoList}>
                                                            {item.type}
                                                        </Text>
                                                }
                                            </View>
                                        </View>

                                    </View>
                                </Card>
                            } />
                    </View>
                </View>
            </Modalize>


            <Modalize
                ref={modalizeDiscount}
                snapPoint={600}
                modalHeight={600}
            >
                <View style={styles.modalize}>
                    <View style={styles.itemModalize}>

                        <View style={styles.viewDesc}>
                            <Text style={styles.textTitleDisc}>
                                Desconto em valor
                            </Text>


                            <TextInputMask
                                options={{
                                    precision: 2,
                                    separator: ',',
                                    delimiter: '.',
                                    unit: 'R$',
                                    suffixUnit: ''
                                }}
                                type={'money'}
                                value={valueDiscount}
                                onChangeText={(text) => selectDiscount(gFn.convertStringMoney(text), 0)}
                                keyboardType='decimal-pad'
                                style={styles.textInputDisc}
                                placeholder="Ex: R$10,00"
                            />


                        </View>

                        <View style={styles.viewDesc}>
                            <Text style={styles.textTitleDisc}>
                                Desconto em Percentual
                            </Text>
                            <TextInput
                                value={percentualDiscount}
                                keyboardType="decimal-pad"
                                placeholder="%"
                                style={styles.textInputDisc}
                                onChangeText={(text) => { selectDiscount(text, 1) }}
                            />
                        </View>

                        <View style={styles.viewDesc}>
                            <View style={styles.viewDiscount}>

                                <View style={styles.viewDiscountSpace}>
                                    <Text style={styles.textValueTotal}>
                                        Valor
                                    </Text>

                                    <Text style={
                                        (valueDiscount != 0 || percentualDiscount != 0) ?
                                            styles.textTotalInative
                                            :
                                            styles.textTotalActive
                                    }>
                                        {gFn.convertMoneyString(total)}
                                    </Text>
                                </View>

                                {
                                    (valueDiscount != 0 || percentualDiscount != 0) &&

                                    <View style={styles.viewDiscountSpace}>
                                        <Text style={styles.textValueTotal}>
                                            Valor com desconto
                                        </Text>
                                        <Text style={styles.textTotalActive}>
                                            {gFn.convertMoneyString(subTotal)}
                                        </Text>
                                    </View>
                                }

                                <View style={styles.viewDiscountSpace}>
                                    <TouchableOpacity
                                        onPress={() => { applyDiscount() }}
                                        style={styles.touchableDisc}
                                    >
                                        {
                                            !loading ?
                                                <Text style={styles.sTextTouch}>
                                                    Aplicar
                                                </Text>
                                                :
                                                <ActivityIndicator
                                                    size="small"
                                                    color="#fff"
                                                />
                                        }
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </Modalize>
        </SafeAreaView >
    );
};
