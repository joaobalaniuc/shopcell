import { View, Text, TouchableOpacity, SafeAreaView, TextInput, ScrollView, ActivityIndicator } from 'react-native';
import { addProduct, findProduct, listFamilies, listGroups, updateProduct, listGrids } from '../../services/api';
import React, { useRef, useState, useEffect } from 'react';
import { TextInputMask } from 'react-native-masked-text';
import { Picker } from '@react-native-picker/picker';
import { NavigationActions } from 'react-navigation';
import { color } from '../../assets/AppStyles';
import gFn from '../../libs/functions';
import styles from './styles';

import { Switch } from 'react-native-paper';

export default function RegisterProduct(props) {


    //==============================================================
    // Declaration const and States
    //==============================================================

    const backAction = NavigationActions.back({
        key: "ListProducts",
    });


    const { infoUser, condition } = props.route.params;
    const [item, setItem] = useState(props.route.params.item);


    //State for spin loading button
    const [isLoginLoading, setIsLoginLoading] = useState(false);

    // Consts properties predefined products
    const [productFamily, setProductFamily] = useState([]);
    const [productGroup, setProductGroup] = useState([]);
    const [productGrid, setProductGrid] = useState([]);
    const [itemProduct, setItemProduct] = useState([]);

    //Declaration for reference in next focus textInput
    const custos = useRef();
    const marca = useRef();
    const precoMedio = useRef();
    const precoVenda = useRef();
    const codigoBarras = useRef();
    const precoAtacado = useRef();

    //Declaration states for const
    const matrix = infoUser.matrix_id;
    const [description, setDescription] = useState(null);
    const [barCode, setBarCode] = useState(null);
    const [brand, setBrand] = useState(null);
    const [family, setFamily] = useState(null);
    const [group, setGroup] = useState(null);
    const [grid, setGrid] = useState(null);
    const [costPrice, setCostPrice] = useState(0);
    const [averagePrice, setAveragePrice] = useState(0);
    const [salePrice, setSalePrice] = useState(0);
    const [wholeSalePrice, setWholeSalePrice] = useState(0);
    const [minimumStock, setMinimumStock] = useState(null);
    const [switchMinimumStock, setSwitchMinimumStock] = useState(false);
    const [switchMonitoring, setSwitchMonitoring] = useState(false);
    const [measuredUnit, setMeasuredUnit] = useState(null);
    const [currentStock, setCurrentStock] = useState(null);




    //==============================================================
    // LifeCycle
    //==============================================================

    useEffect(() => {
        listPropProducts();
        validationOperation();
    }, [props.route.params]);


    //==============================================================
    // OtherMethods
    //==============================================================

    function validationOperation() {

        const { condition, item } = props.route.params;

        setDescription(null);
        setBarCode(null);
        setBrand(null);
        setFamily(null);
        setGroup(null);
        setGrid(null);
        setCostPrice(null);
        setAveragePrice(null);
        setSalePrice(null);
        setWholeSalePrice(null);
        setCurrentStock(null);
        setMeasuredUnit(null);
        setMinimumStock(null);
        setSwitchMinimumStock(false);
        setSwitchMonitoring(false);

        if (condition == 1) {
            listInfoProduct(item);
        };
    }


    // List predefined product properties
    async function listInfoProduct(id) {

        // List items Family
        await findProduct({
            _id: id,
        })
            .then((resp) => {
                gFn.consoleLog("Informações do Produto: ", resp);
                setItem(id);
                setDescription(resp.title);
                setBarCode(resp.barcode.toString());
                setFamily(resp.family);
                setGroup(resp.group);
                setGrid(resp.grid);
                setCostPrice(resp.price == null ? 0 : resp.price);
                setWholeSalePrice(resp.wholeSalePrice == null ? 0 : resp.wholeSalePrice);
                setSalePrice(resp.retailPrice == null ? 0 : resp.retailPrice);
                setMinimumStock(resp.minimumStock);
                setSwitchMinimumStock(resp.alertLowStock);
                setSwitchMonitoring(resp.alertReplenishments);
                setCurrentStock(resp.currentStock);
                setMeasuredUnit(resp.measuredUnit);

            })
            .catch((error) => { console.log(error) });
    }

    // List predefined product properties
    function listPropProducts() {

        // List items Family
        listFamilies({
            matrix_id: infoUser.matrix_id,
        })
            .then((resp) => {
                setProductFamily(resp);
            })
            .catch((error) => {
                console.log(error);
            });


        // List items groups
        listGroups({
            matrix_id: infoUser.matrix_id,
        })
            .then((resp) => {
                setProductGroup(resp);
            })
            .catch((error) => {
                console.log(error);
            });


        // List items grids
        listGrids({
            matrix_id: infoUser.matrix_id,
        })
            .then((resp) => {
                setProductGrid(resp);
            })
            .catch((error) => {
                console.log(error);
            });

    }

    //Function save product
    async function saveProduct() {


        setIsLoginLoading(true);


        if (description != "" && barCode != null || barCode != "") {
            if (condition == 1) {
                await updateProduct({
                    _id: item,
                    productData: {
                        name: description,
                        title: description,
                        barcode: parseInt(barCode),
                        brand: family,
                        family: family,
                        group: group,
                        grid: grid,
                        tags: [''],
                        measuredUnit: measuredUnit,
                        price: gFn.convertStringMoney(costPrice),
                        retailPrice: gFn.convertStringMoney(salePrice),
                        wholeSalePrice: gFn.convertStringMoney(wholeSalePrice),
                        minimumStock: minimumStock,
                        currentStock: currentStock,
                        alertLowStock: switchMinimumStock,
                        alertReplenishments: switchMonitoring,
                    }
                })
                    .then(async (resp) => {
                        gFn.toastConfirm("Atualizado com sucesso!");
                        // props.navigation.goBack(null);
                        props.navigation.reset({
                            index: 0,
                            routes: [{ name: "ListProducts" }]
                        });
                    })
                    .catch((error) => {
                        gFn.toastConfirm("Ops, tivemos algum problema!");
                        console.log(error);
                    });


            } else {

                await addProduct({
                    matrix_id: matrix,
                    name: description,
                    title: description,
                    barcode: parseInt(barCode),
                    brand: family,
                    family: family,
                    measuredUnit: measuredUnit,
                    measuredUnit: measuredUnit,
                    group: group,
                    grid: grid,
                    tags: [''],
                    price: gFn.convertStringMoney(costPrice),
                    retailPrice: gFn.convertStringMoney(salePrice),
                    wholeSalePrice: gFn.convertStringMoney(wholeSalePrice),
                    minimumStock: minimumStock,
                    currentStock: currentStock,
                    alertLowStock: switchMinimumStock,
                    alertReplenishments: switchMonitoring,

                })
                    .then(async (resp) => {
                        props.navigation.goBack();
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        } else {
            alert("Nome e Código de barras são obrigatórios!");
            setIsLoginLoading(false);
        }
        setIsLoginLoading(false);
    };


    //==============================================================
    // Render
    //==============================================================

    return (

        <ScrollView>
            <SafeAreaView>
                <View style={styles.container}>
                    <View style={styles.layout}>
                        <View style={styles.element}>
                            <Text style={styles.titleInput}>
                                *Descrição
                        </Text>
                            <TextInput
                                value={description}
                                onChangeText={(text) => setDescription(text)}
                                returnKeyType="next"
                                onSubmitEditing={() => { codigoBarras.current.focus(); }}
                                blurOnSubmit={false}
                                style={styles.textInput}
                                placeholder="Digite a descrição do produto"
                            />
                        </View>

                        <View style={styles.element}>
                            <Text
                                keyboardType='numeric'
                                style={styles.titleInput}
                            >
                                *Código de Barras
                            </Text>
                            <TextInput
                                value={barCode}
                                onChangeText={(text) => setBarCode(text)}
                                returnKeyType="next"
                                onSubmitEditing={() => { marca.current.focus(); }}
                                blurOnSubmit={false}
                                ref={codigoBarras}
                                style={styles.textInput}
                                placeholder="Código de barras"
                            />
                        </View>

                        {/* <View style={styles.element}>
                            <Text
                                style={styles.titleInput}
                            >
                                Marca do produto
                            </Text>
                            <TextInput
                                value={brand}
                                onChangeText={(text) => setBrand(text)}
                                returnKeyType="next"
                                onSubmitEditing={() => { familia.current.focus(); }}
                                blurOnSubmit={false}
                                ref={marca}
                                style={styles.textInput}
                                placeholder="Marca do Produto"
                            />
                        </View> */}

                        <View style={styles.element}>
                            <Text style={styles.titleInput} >
                                Grupo/SubGrupo
                            </Text>
                            <View style={styles.dropdown}>
                                <Picker
                                    selectedValue={group}
                                    style={styles.titleInput}
                                    onValueChange={(itemValue) => setGroup(itemValue)}
                                >

                                    {
                                        productGroup.map((item, index) => {
                                            return (
                                                <Picker.Item key={index} label={item.title} value={item._id} />
                                            )
                                        })
                                    }
                                </Picker>
                            </View>
                        </View>

                        <View style={styles.element}>
                            <Text
                                style={styles.titleInput}
                            >
                                Família
                            </Text>
                            <View style={styles.dropdown}>
                                <Picker
                                    selectedValue={family}
                                    style={styles.titleInput}
                                    onValueChange={
                                        (itemValue) => setFamily(itemValue)
                                    }>
                                    {
                                        productFamily.map((item, index) => {
                                            return (
                                                <Picker.Item key={index} label={item.title} value={item._id} />
                                            )
                                        })
                                    }
                                </Picker>
                            </View>
                        </View>

                        <View style={styles.element}>
                            <Text
                                style={styles.titleInput}
                            >
                                Grade
                            </Text>
                            <View style={styles.dropdown}>
                                <Picker
                                    selectedValue={grid}
                                    style={styles.titleInput}
                                    onValueChange={
                                        (itemValue) => setGrid(itemValue)
                                    }>
                                    {
                                        productGrid.map((item, index) => {
                                            return (
                                                <Picker.Item key={index} label={item.title} value={item._id} />
                                            )
                                        })
                                    }
                                </Picker>
                            </View>
                        </View>

                        <View style={styles.element}>
                            <Text style={styles.titleInput}>
                                Unidade de medida
                            </Text>
                            <View style={styles.dropdown}>
                                <Picker
                                    selectedValue={measuredUnit}
                                    style={styles.titleInput}
                                    onValueChange={
                                        (itemValue) => setMeasuredUnit(itemValue)
                                    }>
                                    <Picker.Item label="Selecione" value="" />
                                    <Picker.Item label="Unidade" value="unity" />
                                    <Picker.Item label="Caixa" value="box" />
                                    <Picker.Item label="Kit" value="kit" />
                                    <Picker.Item label="Par" value="pair" />
                                </Picker>
                            </View>
                        </View>



                        <View style={styles.element1}>
                            <View style={styles.price}>
                                <Text style={styles.titleInput}>
                                    Preço de Custo
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
                                    value={costPrice}
                                    ref={custos}
                                    onChangeText={(text) => setCostPrice(text)}
                                    returnKeyType="next"
                                    // onSubmitEditing={() => { precoMedio.current.focus(); }}
                                    blurOnSubmit={false}
                                    keyboardType='numeric'
                                    style={styles.textInput}
                                    placeholder="Custo"
                                />
                            </View>

                            <View style={styles.price}>
                                <Text keyboardType='numeric' style={[styles.titleInput, { color: color.quartiary }]}>
                                    Preço Médio
                                </Text>
                                <TextInputMask
                                    options={{
                                        precision: 2,
                                        separator: ',',
                                        delimiter: '.',
                                        unit: 'R$',
                                        suffixUnit: ''
                                    }}
                                    editable={false}
                                    type={'money'}
                                    value={averagePrice}
                                    onChangeText={(text) => setAveragePrice(text)}
                                    returnKeyType="next"
                                    // onSubmitEditing={() => { precoVenda.current.focus(); }}
                                    blurOnSubmit={false}
                                    ref={precoMedio}
                                    style={[styles.textInput, { borderColor: color.quartiary }]}
                                    placeholder="Médio"
                                    keyboardType='numeric'
                                    placeholderTextColor={color.quartiary}
                                />
                            </View>
                        </View>

                        <View style={styles.element1}>

                            <View style={styles.price}>
                                <Text style={styles.titleInput}>
                                    Preço Venda
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
                                    value={salePrice}
                                    onChangeText={(text) => setSalePrice(text)}
                                    returnKeyType="next"
                                    blurOnSubmit={false} ref={precoVenda}
                                    style={styles.textInput}
                                    placeholder="Venda"
                                    placeholderTextColor={color.tertiary}
                                    keyboardType='numeric'
                                />
                            </View>

                            <View style={styles.price}>
                                <Text style={styles.titleInput}>
                                    Preço Atacado
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
                                    value={wholeSalePrice}
                                    onChangeText={(text) => setWholeSalePrice(text)}
                                    returnKeyType="next"
                                    // onSubmitEditing={() => { codigoBarras.current.focus(); }}
                                    blurOnSubmit={false} ref={precoAtacado}
                                    style={styles.textInput}
                                    placeholder="Atacado"
                                    keyboardType='numeric'
                                />
                            </View>

                        </View>

                        <View style={styles.element1}>

                            <View style={styles.price}>
                                <Text style={styles.titleInput}>
                                    Estoque atual
                                </Text>
                                <TextInput
                                    value={currentStock}
                                    keyboardType="numeric"
                                    onChangeText={(text) => setCurrentStock(text)}
                                    style={styles.textInput}
                                    placeholder="Estoque atual"
                                />
                            </View>

                            <View style={styles.price}>
                                <Text style={styles.titleInput}>
                                    Estoque minímo
                                </Text>
                                <TextInput
                                    keyboardType="numeric"
                                    value={minimumStock}
                                    onChangeText={(text) => setMinimumStock(text)}
                                    style={styles.textInput}
                                    placeholder="Estoque minímo"
                                />
                            </View>
                        </View>

                        <View style={[styles.element1, { flexDirection: 'column' }]}>
                            <View style={styles.viewSwitch}>
                                <Text>
                                    Alertar quando o estoque estiver baixo
                                </Text>
                                <Switch
                                    color={color.primary}
                                    value={switchMinimumStock}
                                    onValueChange={() => { setSwitchMinimumStock(!switchMinimumStock) }}
                                />
                            </View>
                            <View style={styles.viewSwitch}>
                                <Text>
                                    Monitorar reposições
                                </Text>
                                <Switch
                                    color={color.primary}
                                    value={switchMonitoring}
                                    onValueChange={() => { setSwitchMonitoring(!switchMonitoring) }}
                                />
                            </View>
                        </View>

                        <View style={styles.areaButton}>
                            <TouchableOpacity
                                disabled={isLoginLoading}
                                onPress={() => { saveProduct() }}
                                style={styles.touchable}
                            >
                                {
                                    !isLoginLoading ?
                                        <Text style={styles.textTouch}>
                                            Salvar
                                        </Text>
                                        :
                                        <ActivityIndicator
                                            size="small"
                                            color={color.light}
                                        />
                                }
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        </ScrollView>
    );
};
