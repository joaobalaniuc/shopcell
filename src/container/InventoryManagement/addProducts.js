import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    ActivityIndicator,
    ScrollView,
    Alert,
} from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import { useFocusEffect } from '@react-navigation/native';
import { listStocks } from '../../services/api';
import { color } from '../../assets/AppStyles';
import { Icon } from 'react-native-elements';
import { Appbar } from 'react-native-paper';
import gFn from '../../libs/functions';
import styles from './styles';
import fn from './functions';



export default function InventoryManagement(props) {


    //==============================================================
    // Declaration const and States
    //==============================================================

    const { infoUser } = props.route.params;

    const [addVisibleImei, setAddVisibleImei] = useState(false);
    const [itemSelected, setItemSelected] = useState([]);
    const [action, setAction] = useState(0);
    const [listImeis, setListImeis] = useState([]);
    const [quantity, setQuantity] = useState('0');
    const [index, setIndex] = useState('');
    const [imei, setImei] = useState('');
    const [hide, setHide] = useState(false);
    const [costPrice, setCostPrice] = useState('');
    const [averagePrice, setAveragePrice] = useState('');
    const [salePrice, setSalePrice] = useState('');
    const [wholeSalePrice, setWholeSalePrice] = useState('');
    const [loading, setLoading] = useState(false);

    //==============================================================
    // LifeCycle
    //==============================================================

    useEffect(() => {
        const { condition } = props.route.params;


        if (condition == 0) {
            setItemSelected(props.route.params.item);
        } else if (condition == 1) {
            setAction(condition);
            setItemSelected(props.route.params.item.product);
            setIndex(props.route.params.item.index);
            setQuantity(props.route.params.item.quantity);
            setCostPrice(props.route.params.item.costPrice);
            setAveragePrice(props.route.params.item.averagePrice);
            setSalePrice(props.route.params.item.salePrice);
            setWholeSalePrice(props.route.params.item.wholeSalePrice);
            setListImeis(props.route.params.item.listImeis);

        }
    }, [props.route.params]);


    useFocusEffect(
        React.useCallback(() => {
            // Do something when the screen is focused
            return () => {
                // Do something when the screen is unfocused
                // Useful for cleanup functions
                setItemSelected([]);
                setAction(0);
                setQuantity(0);
                setCostPrice('');
                setAveragePrice('');
                setSalePrice('');
                setWholeSalePrice('');
                setListImeis([]);
                setAddVisibleImei(false);
            };
        }, [])
    );


    //==============================================================
    // OtherMethods
    //==============================================================


    // Function add and remove IMEIS produtcs
    function operationImeis(index, operation) {


        if (listImeis.length >= parseInt(quantity)) {
            gFn.toastConfirm("Adicionado a quantidade a partir do IMEI!");
            const newQuantity = parseInt(quantity) + 1;
            setQuantity(newQuantity.toString());
        }

        const currentMeis = listImeis;
        if (imei != "" && operation == 1) {
            currentMeis.push(imei);
            setImei("");
        } else if (operation == 0) {
            currentMeis.splice(index, 1);
        }
        setListImeis(currentMeis);
        setHide(!hide);



    }

    // Function save products
    async function saveProduct() {

        gFn.consoleLog(props.route.name, quantity);

        if (quantity != '' || quantity != 0) {

            await listStocks({
                client_id: infoUser.store,
                find: {
                    product_id: itemSelected._id
                },
                filter: {
                    _id: 1,
                },
                limit: parseInt(quantity)
            })
                .then((resp) => {
                    console.log(resp);

                    fn.addProducts({
                        product: itemSelected,
                        quantity: quantity,
                        costPrice: costPrice,
                        averagePrice: averagePrice,
                        salePrice: salePrice,
                        wholeSalePrice: wholeSalePrice,
                        listImeis: listImeis,
                        listIds: resp,
                    });
                    gFn.toastConfirm("Produto adicionado!");
                    props.navigation.goBack(null);
                    setLoading(false);


                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            gFn.toastConfirm("A quantidade não pode ser vazia!")
        }
    }

    // Function delete product
    async function deleteItem() {

        Alert.alert(
            "Remover Item",
            "Deseja remover o item?",
            [
                {
                    text: "Não", onPress: async () => {

                    }
                },
                {
                    text: "Sim", onPress: async () => {
                        setLoading(!loading);

                        await fn.deleteProducts(index);

                        setTimeout(() => {
                            props.navigation.goBack(null)
                            setLoading(false);
                        }, 1000);
                    }
                },
            ],
            { cancelable: false }
        );
    }

    //==============================================================
    // Render
    //==============================================================

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <Appbar.Header style={styles.appbar}>
                <Appbar.BackAction onPress={() => {
                    props.navigation.goBack(null),
                        setLoading(false)
                }} />
                <Appbar.Content title="Adicionar Produtos" subtitle="" />
                {/* <Appbar.Action icon="check" onPress={() => { saveProduct() }} /> */}
            </Appbar.Header>

            <View style={styles.viewDialog}>
                <Text style={styles.textTitleDialog}>
                    {itemSelected.title}
                </Text>
                <View style={styles.gridDialog}>
                    <View style={styles.viewSection}>
                        <Text style={styles.textTitleQuant}>
                            Quantidade
                        </Text>
                        <TextInput
                            value={quantity}
                            keyboardType="number-pad"
                            style={styles.textInputQuant}
                            onChangeText={(text) => { setQuantity(text) }}
                            placeholder=""
                        />
                        {
                            (action != 0) &&
                            <View>
                                <TouchableOpacity onPress={() => { deleteItem() }}>
                                    {
                                        loading ?
                                            <ActivityIndicator
                                                style={{ padding: 10 }}
                                                size="small"
                                                color="red"
                                            />
                                            :
                                            <Text style={styles.textRemove}>
                                                Remover Item
                                            </Text>
                                    }
                                </TouchableOpacity>
                            </View>
                        }
                    </View>
                </View>

                <View style={styles.gridDialog}>
                    <View style={styles.itemGridDialog}>
                        <Text>
                            Preço de Custo
                        </Text>
                    </View>
                    {/* <View style={styles.itemGridDialog}>
                        <Text>
                            Preço Médio
                        </Text>
                    </View> */}
                </View>

                <View style={styles.gridDialog}>
                    <View style={styles.itemGridDialog}>

                        <TextInputMask
                            options={{
                                precision: 2,
                                separator: ',',
                                delimiter: '.',
                                unit: 'R$',
                                suffixUnit: ''
                            }}
                            onChangeText={(text) => setCostPrice(text)}
                            value={costPrice}
                            type={'money'}
                            blurOnSubmit={false}
                            keyboardType='numeric'
                            style={styles.textInputDialog}
                            placeholder="Ex: R$1200,00"
                        />


                    </View>
                    {/* <View style={[styles.itemGridDialog, { alignItems: 'flex-end' }]}>
                        <TextInputMask
                            options={{
                                precision: 2,
                                separator: ',',
                                delimiter: '.',
                                unit: 'R$',
                                suffixUnit: ''
                            }}
                            onChangeText={(text) => setAveragePrice(text)}
                            value={averagePrice}
                            type={'money'}
                            blurOnSubmit={false}
                            keyboardType='numeric'
                            style={styles.textInputDialog}
                            placeholder="Ex: R$1230,00"
                        />
                    </View> */}
                </View>

                <View style={styles.viewDialogImei} >
                    <View style={styles.gridDialog}>
                        <View style={styles.itemGridDialog}>
                            <Text>
                                Preço Venda
                            </Text>
                        </View>
                        <View style={styles.itemGridDialog}>
                            <Text>
                                Preço Atacado
                            </Text>
                        </View>
                    </View>

                    <View style={styles.gridDialog}>
                        <View style={styles.itemGridDialog}>
                            <TextInputMask
                                options={{
                                    precision: 2,
                                    separator: ',',
                                    delimiter: '.',
                                    unit: 'R$',
                                    suffixUnit: ''
                                }}
                                onChangeText={(text) => setSalePrice(text)}
                                value={salePrice}
                                type={'money'}
                                blurOnSubmit={false}
                                keyboardType='numeric'
                                style={styles.textInputDialog}
                                placeholder="Ex: R$1300,00"
                            />
                        </View>
                        <View style={styles.itemGridDialog}>
                            <TextInputMask
                                options={{
                                    precision: 2,
                                    separator: ',',
                                    delimiter: '.',
                                    unit: 'R$',
                                    suffixUnit: ''
                                }}
                                onChangeText={(text) => setWholeSalePrice(text)}
                                value={wholeSalePrice}
                                type={'money'}
                                keyboardType='numeric'
                                style={styles.textInputDialog}
                                placeholder="Ex: R$1280,00"
                            />
                        </View>
                    </View>
                </View>

                <View style={styles.subAction}>
                    {
                        !addVisibleImei ?

                            <TouchableOpacity style={styles.buttonImei} onPress={() => { setAddVisibleImei(!addVisibleImei) }}>
                                <Text style={[styles.textTitle, { fontSize: 13 }]}>
                                    Adicionar IMEI's
                                </Text>
                                <Icon
                                    size={20}
                                    color={color.tertiary}
                                    name='chevron-down-outline'
                                    type='ionicon'
                                />
                            </TouchableOpacity>
                            :
                            <View style={styles.viewDialogImei}>
                                <TouchableOpacity style={styles.buttonImeiUp} onPress={() => { setAddVisibleImei(!addVisibleImei) }}>
                                    <Text style={[styles.textTitle, { fontSize: 13 }]}>
                                        Adicionar IMEI's
                                    </Text>
                                    <Icon
                                        size={20}
                                        color={color.tertiary}
                                        name='chevron-up-outline'
                                        type='ionicon'
                                    />
                                </TouchableOpacity>
                                <View style={styles.gridDialog}>
                                    <TextInput
                                        value={imei}
                                        keyboardType="number-pad"
                                        style={[styles.textInputDialog, { width: '100%' }]}
                                        onChangeText={(text) => { setImei(text) }}
                                        placeholder=""
                                    />
                                </View>
                                <View style={styles.viewButtonImei}>
                                    <TouchableOpacity onPress={() => { operationImeis(null, 1) }} style={styles.touchConfirm}>
                                        <Text style={styles.textButton}>
                                            Adicionar
                                    </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                    }
                </View>

                {
                    (listImeis != '') &&
                    <View>
                        <Text>
                            Lista de IMEI's
                    </Text>
                    </View>
                }
                <View>
                    {
                        listImeis.map((item, index) => {
                            return (
                                <View key={index} style={styles.itemImei}>
                                    <Text>
                                        {item}
                                    </Text>
                                    <TouchableOpacity onPress={() => { operationImeis(index, 0) }} style={styles.touchCloseImei}>
                                        <Icon
                                            size={20}
                                            color={color.tertiary}
                                            name='close-circle-outline'
                                            type='ionicon'
                                        />
                                    </TouchableOpacity>
                                </View>
                            )
                        })
                    }
                </View>
                {
                    quantity != '' &&
                    <View style={styles.viewButtonSave}>
                        <TouchableOpacity onPress={() => { saveProduct() }} style={[styles.touchConfirm, { width: '80%' }]}>
                            <Text style={styles.textButton}>
                                Salvar
                        </Text>
                        </TouchableOpacity>
                    </View>
                }
            </View>



        </ScrollView>
    );
};
