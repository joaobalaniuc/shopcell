import {
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    FlatList,
    TextInput,
    Alert,
} from 'react-native';
import { addCashier, transations, addTransation, updateCashier, updateTransation } from '../../services/api';
import { TextInputMask } from 'react-native-masked-text';
import { Card, FAB, Appbar, ActivityIndicator } from 'react-native-paper';
import React, { useState, useEffect } from 'react';
import { color } from '../../assets/AppStyles';
import { Icon } from 'react-native-elements';
import gFn from '../../libs/functions';
import styles from './styles';
import fn from './functions';
import Moment from 'moment';
import { Touchable } from 'react-native';


export default function RegisterSale(props) {

    //==============================================================
    //Declaration const and States
    //==============================================================

    const { infoUser } = props.route.params;



    const [_id, setId] = useState('');
    const [description, setDescription] = useState('');
    const [parcel, setParcel] = useState('');
    const [tax, setTax] = useState([]);
    const [iconDelete, setIconDelete] = useState(false);
    const [hideItem, setHideItem] = useState(false);
    const [addTaxVisible, setAddTaxVisible] = useState(false);
    const [resources, setResources] = useState(false);
    const [addSupplies, setAddSupplies] = useState(false);
    const [addBleed, setAddBleed] = useState(false);
    const [loading, setLoading] = useState(false);
    const [date, setDate] = useState('');
    const [hour, setHour] = useState('');
    const [situation, setSituation] = useState('');
    const [total, setTotal] = useState(0);



    //==============================================================
    //LifeCycle
    //==============================================================

    useEffect(() => {
        verifyItems();
    }, [props.route.params]);

    //==============================================================
    //OtherMethods
    //==============================================================

    // Function for list transactions
    async function listTransations(date) {

        const start = Moment(date).startOf('day');
        const end = Moment(start).endOf('day').toDate();

        await transations({
            matrix_id: infoUser.matrix_id,
            find: {
                from: infoUser.store,
            },
            filterDate: {
                startDate: start,
                endDate: end,
            }
        })
            .then((resp) => {

                // Function add values products
                var add = 0;
                var totalValue = 0;
                resp.map((item, index) => {
                    item.target.map((elem) => {
                        if (item.status != "canceled") {
                            add += elem.value;
                        };
                    })
                    resp[index].total = add;
                    totalValue += add;
                    add = 0;
                });
                setTotal(totalValue - resp[0].discount);
                setTax(resp);
            })
            .catch((error) => {
                console.log(error)
            });
    }

    // Try receive const screen list cash flow for edit
    function verifyItems() {

        try {

            const { detailsItem } = props.route.params;

            if (detailsItem != null) {
                setDescription(detailsItem.comment);
                setTax('');
                setId(detailsItem._id);
                setHour(Moment(detailsItem.open_date).format("HH:MM"));
                setDate(Moment(detailsItem.open_date).format("DD/MM/YYYY"));
                setSituation(detailsItem.status);
                listTransations(detailsItem.open_date);
            } else {
                setTotal(0);
                setDescription('');
                setTax([]);
                setSituation('');
                setHour(Moment(new Date()).format("HH:MM"));
                setDate(Moment(new Date()).format("DD/MM/YYYY"));
            }

        } catch (error) {
            console.log(error);
        };
    };

    // Function save Credit Card and fees
    async function saveCreditCard(num) {

        setResources(!resources);

        const receiveTax = tax != '' ? tax : [];
        var description = '';
        var operation = 1;
        if (num === 0) {
            setAddTaxVisible(!addTaxVisible);
            description = "change";
        } else if (num === 1) {
            setAddSupplies(!addSupplies);
            description = "supply";
        } else {
            setAddBleed(!addBleed);
            description = "bleed";
            operation = -1;
        };


        if (!parcel == '') {
            receiveTax.push({
                type: description,
                total: operation * parseFloat(parcel.replace('R$', '')),
                createdAt: new Date()

            });

            // Adicionar change/supply/bleed in mongodb
            await addTransation({
                matrix_id: infoUser.matrix_id,
                user_id: infoUser._id,
                type: description,
                target: [{
                    quantity: 1,
                    value: operation * parseFloat(parcel.replace('R$', '')),
                }],
                from: infoUser.store,
                to: "5fda549405c6ef6d6778a1ff",
                status: '',
            })
                .then((resp) => {
                    console.log(resp)
                })
                .catch((error) => {
                    console.log("Error: ", error);
                });

            setTax(receiveTax);
            setParcel('');

        } else {
            if (num === 0) {
                setAddTaxVisible(!addTaxVisible);
            } else if (num === 1) {
                setAddSupplies(!addSupplies);
            } else {
                setAddBleed(!addBleed);
            };
        };
        listTransations();
    };


    // Function delete item list Rate
    function deleteItem(item, index) {
        const listTax = tax;

        Alert.alert(
            "Remover Item",
            "Deseja remover o item?",
            [
                {
                    text: "Não",
                },
                {
                    text: "Sim", onPress: async () => {

                        await updateTransation({
                            _id: listTax[index]._id,
                            transationData: {
                                status: "canceled"
                            },
                        })
                            .then(async (resp) => {
                                await verifyItems();
                                tax[index].status = "canceled"
                                setHideItem(!hideItem);
                            }).catch((error) => {
                                console.log(error);
                            })
                    }
                },
            ],
            { cancelable: false }
        );
        setIconDelete(!iconDelete);
    };

    // Function insert cash flow
    async function insertCashFlow() {

        setLoading(true);

        const resp = await addCashier({
            matrix_id: infoUser.matrix_id,
            user_id: infoUser._id,
            branch_id: infoUser.store,
            type: '',
            target: tax,
            status: situation == '' ? 'open' : situation,
            comment: description,
            value: '',
            open_date: new Date(),
            close_date: '',
        });
        if (resp) {
            setLoading(false);
            props.navigation.goBack();
        }

    }

    // Function for update status cashFlow for close
    async function updateCashflow() {

        console.log("============= Update Cashier =============",);

        setLoading(true);

        await updateCashier({
            _id: _id,
            cashierData: {
                status: situation == "open" ? "close" : "open",
                comment: description,
                close_date: new Date(),
            }
        })
            .then((resp) => {
                props.navigation.goBack();

                setLoading(false);

            })
            .catch((error) => {
                console.log(error)
            });
    };

    //Navigation details sale
    function navigationDetailsSale(item) {
        props.navigation.navigate("DetailsTransations", { item });
    }


    //==============================================================
    // Render
    //==============================================================

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: color.light }}>

            <Appbar.Header style={styles.appbar}>
                <Appbar.BackAction onPress={() => { props.navigation.goBack() }} />
                <Appbar.Content title="Iniciar fluxo" subtitle="" />
                {
                    (tax.length != 0) &&
                    <Appbar.Action />
                }
            </Appbar.Header>

            <View style={styles.container}>
                <View style={styles.sViewCard}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        ListHeaderComponent={
                            <View style={styles.modalize}>
                                <View style={styles.itemModalize}>
                                    <View style={styles.viewTitleModalize}>
                                        {/* <Text style={styles.sTextCustomer}>
                                            Abertura de caixa
                                        </Text> */}
                                    </View>
                                    <View style={styles.infoBox}>
                                        <Text style={styles.textSubTitle}>
                                            Data
                                        </Text>
                                        <Text style={styles.sTextCustomer}>
                                            {date}
                                        </Text>
                                    </View>
                                    <View style={styles.infoBox}>
                                        <Text style={styles.textSubTitle}>
                                            Hora
                                        </Text>
                                        <Text style={styles.sTextCustomer}>
                                            {hour}
                                        </Text>
                                    </View>
                                    <View style={styles.viewNewCard}>
                                        <View>
                                            <Text style={styles.textSubTitle}>
                                                Observação
                                            </Text>
                                        </View>
                                        <View>
                                            <TextInput
                                                style={styles.inputDesc}
                                                placeholder="Insira uma observação"
                                                value={description}
                                                maxLength={50}
                                                onChangeText={(text) => setDescription(text)}
                                            />
                                        </View>
                                    </View>

                                    <View style={styles.viewOperations}>
                                        {
                                            (date == Moment(new Date()).format("DD/MM/YYYY") && situation == "open") &&

                                            <View style={styles.viewNewTax}>
                                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                    <TouchableOpacity style={styles.touchCourses} onPress={() => {
                                                        setAddBleed(false),
                                                            setAddSupplies(!addSupplies)
                                                    }}>
                                                        <Text style={styles.textButton}>
                                                            Suprimento
                                                        </Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity style={styles.touchCourses} onPress={() => {
                                                        setAddSupplies(false),
                                                            setAddBleed(!addBleed)
                                                    }}>
                                                        <Text style={styles.textButton}>
                                                            Sangria
                                                        </Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        }
                                        {
                                            resources &&
                                            <View style={styles.viewTax}>





                                                {/* {
                                                    !addBleed && !addSupplies &&
                                                    <View style={styles.viewOperations}>
                                                        {
                                                            // (tax == '') &&
                                                            <View style={styles.viewNewTax}>
                                                                <View>
                                                                    <Text style={styles.textSubTitle}>
                                                                        Fundo de Troco
                                                                    </Text>
                                                                </View>
                                                                <TouchableOpacity
                                                                    style={styles.touchNewProduct}
                                                                    onPress={() => { setAddTaxVisible(!addTaxVisible) }}
                                                                >
                                                                    <Icon
                                                                        size={25}
                                                                        color={color.primary}
                                                                        name='add-outline'
                                                                        type='ionicon'
                                                                    />
                                                                </TouchableOpacity>
                                                            </View>
                                                        }
                                                        {
                                                            addTaxVisible &&
                                                            <View style={styles.viewTax}>
                                                                <View>
                                                                    <View style={styles.viewItensTax}>
                                                                        <Text style={styles.sText}>
                                                                            Valor do troco
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
                                                                            placeholder="R$"
                                                                            keyboardType='numeric'
                                                                            style={styles.textTax}
                                                                            value={parcel}
                                                                            onChangeText={(text) => setParcel(text)}
                                                                        />
                                                                    </View>

                                                                    <View style={styles.viewItensTax1}>
                                                                        <TouchableOpacity
                                                                            style={styles.touchOkProduct}
                                                                            onPress={() => { saveCreditCard(0) }}
                                                                        >
                                                                            <Text style={[styles.textSubTitle, { color: color.light }]}>
                                                                                Ok
                                                                            </Text>
                                                                        </TouchableOpacity>
                                                                    </View>
                                                                </View>
                                                            </View>
                                                        }
                                                    </View>
                                                } */}

                                                {
                                                    !addTaxVisible && !addBleed &&
                                                    <View style={styles.viewOperations}>
                                                        {/* {
                                                            // (tax == '') &&
                                                            <View style={styles.viewNewTax}>
                                                                <View>
                                                                    <Text style={styles.textSubTitle}>
                                                                        Suprimento
                                                       </Text>
                                                                </View>
                                                                <TouchableOpacity
                                                                    style={styles.touchNewProduct}
                                                                    onPress={() => { setAddSupplies(!addSupplies) }}
                                                                >
                                                                    <Icon
                                                                        size={25}
                                                                        color={color.primary}
                                                                        name='add-outline'
                                                                        type='ionicon'
                                                                    />
                                                                </TouchableOpacity>
                                                            </View>
                                                        } */}

                                                        {
                                                            addSupplies &&
                                                            <View style={styles.viewTax}>
                                                                <View style={styles.textInputTax}>

                                                                    <View style={styles.viewItensTax}>
                                                                        <Text style={styles.sText}>
                                                                            Valor do Suprimento
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
                                                                            placeholder="R$"
                                                                            keyboardType='numeric'
                                                                            style={styles.textTax}
                                                                            value={parcel}
                                                                            onChangeText={(text) => setParcel(text)}
                                                                        />
                                                                    </View>

                                                                    <View style={styles.viewItensTax1}>
                                                                        <TouchableOpacity
                                                                            style={styles.touchOkProduct}
                                                                            onPress={() => { saveCreditCard(1) }}
                                                                        >
                                                                            <Text style={[styles.textSubTitle, { color: color.light }]}>
                                                                                OK
                                                                            </Text>
                                                                        </TouchableOpacity>
                                                                    </View>
                                                                </View>
                                                            </View>
                                                        }
                                                    </View>
                                                }

                                                {
                                                    !addTaxVisible && !addSupplies &&
                                                    <View style={styles.viewOperations}>
                                                        {/* {
                                                            // (tax == '') &&
                                                            <View style={styles.viewNewTax}>
                                                                <View>
                                                                    <Text style={styles.textSubTitle}>
                                                                        Sangria
                                                        </Text>
                                                                </View>
                                                                <TouchableOpacity
                                                                    style={styles.touchNewProduct}
                                                                    onPress={() => { setAddBleed(!addBleed) }}
                                                                >
                                                                    <Icon
                                                                        size={25}
                                                                        color={color.primary}
                                                                        name='add-outline'
                                                                        type='ionicon'
                                                                    />
                                                                </TouchableOpacity>
                                                            </View>
                                                        } */}
                                                        {
                                                            addBleed &&
                                                            <View style={styles.viewTax}>
                                                                <View style={styles.textInputTax}>

                                                                    <View style={styles.viewItensTax}>
                                                                        <Text style={styles.sText}>
                                                                            Valor da Sangria
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
                                                                            placeholder="R$"
                                                                            keyboardType='numeric'
                                                                            style={styles.textTax}
                                                                            value={parcel}
                                                                            onChangeText={(text) => setParcel(text)}
                                                                        />
                                                                    </View>

                                                                    <View style={styles.viewItensTax1}>
                                                                        <TouchableOpacity
                                                                            style={styles.touchOkProduct}
                                                                            onPress={() => { saveCreditCard(2) }}
                                                                        >
                                                                            <Text style={[styles.textSubTitle, { color: color.light }]}>
                                                                                OK
                                                                            </Text>
                                                                        </TouchableOpacity>
                                                                    </View>
                                                                </View>
                                                            </View>
                                                        }
                                                    </View>
                                                }

                                            </View>
                                        }
                                    </View>

                                </View>
                            </View>
                        }
                        data={tax}
                        keyExtractor={tax => tax._id}
                        renderItem={({ item, index }) =>

                            <Card
                                style={styles.sCard}
                                onLongPress={() => { setIconDelete(!iconDelete) }}
                                onPress={() => { navigationDetailsSale(item) }}
                            >
                                {console.log("=======================\n-----------------------------------\n=============: ", JSON.stringify(item, null, 4))}
                                <View style={styles.viewTaxList}>
                                    <View style={styles.viewDescTax}>
                                        <Text style={[styles.textDescriptionList, item.status == "canceled" && { color: color.tertiary }]}>
                                            {/* {item.description} */}
                                            {item.type == 'entry' && 'Entrada'}
                                            {item.type == 'sale' && 'Venda'}
                                            {item.type == 'exit' && 'Saída'}
                                            {item.type == 'bleed' && 'Sangria'}
                                            {item.type == 'change' && 'Fundo de troco'}
                                            {item.type == 'supply' && 'Suprimento'}
                                            {item.type == 'transfer' && 'Transferência'}
                                        </Text>
                                        <Text style={[styles.textTitle, item.status == "canceled" && { color: color.tertiary }]}>
                                            {
                                                item.status == "canceled" ?
                                                    'Operação cancelada'
                                                    :
                                                    Moment(item.createdAt).format("HH:MM")

                                            }
                                        </Text>
                                    </View>

                                    {
                                        (iconDelete && item.status != "canceled") ?
                                            <TouchableOpacity
                                                onPress={() => { deleteItem(item, index) }}
                                                style={styles.touchDelete}
                                            >
                                                <Icon
                                                    size={20}
                                                    color='red'
                                                    name='trash-outline'
                                                    type='ionicon'
                                                />
                                            </TouchableOpacity>
                                            :
                                            <View style={styles.viewDescTax}>
                                                <Text style={[(item.total < 0) ? { color: 'red' } : { color: 'black' }, item.status == "canceled" && { color: color.tertiary }]}>
                                                    {
                                                        (item.discount != undefined) ?
                                                            gFn.convertMoneyString(item.total - item.discount)
                                                            :
                                                            gFn.convertMoneyString(item.total)
                                                    }
                                                </Text>
                                                <Text style={[styles.textTitle, { marginTop: 0 }]}>
                                                    {/* {item.paymentMethod != undefined ? item.paymentMethod.payment_id : ''} */}
                                                    Cartão de  Credito
                                                </Text>
                                            </View>
                                    }

                                </View>
                            </Card>
                        }
                    />
                </View>
                {/* {
                    (situation == '' || situation == "close") ?
                        <FAB
                            onPress={() => { situation == "close" ? updateCashflow() : insertCashFlow() }}
                            style={styles.fab}
                            label="Abrir caixa"
                            loading={loading}
                            disabled={loading}
                            icon="lock"
                        />
                        :
                        <FAB
                            onPress={() => { updateCashflow() }}
                            style={styles.fab}
                            label="Fechar caixa"
                            loading={loading}
                            disabled={loading}
                            icon="lock-open-variant"
                        />
                } */}
            </View>
            {
                !resources &&
                <View style={styles.viewFoot}>
                    <View style={styles.viewFooterStart}>
                        <Icon
                            size={25}
                            color={color.light}
                            name='cart'
                            type='ionicon'
                        />
                    </View>
                    <View style={styles.viewFooterLeft}>
                        <Text style={{ color: color.light, fontWeight: 'bold', fontSize: 16 }}>
                            {tax.length} itens   |   {gFn.convertMoneyString(total)}
                        </Text>
                    </View>
                    <View style={styles.viewFooterRight}>
                        {
                            (situation == '' || situation == "close") ?
                                <TouchableOpacity
                                    disabled={loading}
                                    onPress={() => { situation == "close" ? updateCashflow() : insertCashFlow() }}
                                    style={styles.touchableFoot}
                                >
                                    {
                                        loading ?
                                            <ActivityIndicator
                                                size="small"
                                                color={color.primary}
                                            />
                                            :
                                            <Icon
                                                size={20}
                                                color={color.primary}
                                                name='lock-closed-outline'
                                                type='ionicon'
                                            />

                                    }
                                    <Text style={{ color: color.primary, fontWeight: 'bold' }}>
                                        Abrir Caixa
                                </Text>
                                </TouchableOpacity>
                                :
                                <TouchableOpacity
                                    disabled={loading}
                                    onPress={() => { updateCashflow() }}
                                    style={styles.touchableFoot}
                                >
                                    {
                                        loading ?
                                            <ActivityIndicator
                                                size="small"
                                                color={color.primary}
                                            />
                                            :
                                            <Icon
                                                size={20}
                                                color={color.primary}
                                                name='lock-open-outline'
                                                type='ionicon'
                                            />

                                    }
                                    <Text style={{ color: color.primary, fontWeight: 'bold' }}>
                                        Fechar Caixa
                                </Text>
                                </TouchableOpacity>
                        }
                    </View>
                </View>
            }
        </SafeAreaView>
    );
};
