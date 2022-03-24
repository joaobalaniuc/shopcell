import React, { useCallback, useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    ActivityIndicator,
    FlatList,
    ScrollView,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { Checkbox, Card } from 'react-native-paper';
import { listProducts, listClients } from '../../services/api';
import { color } from '../../assets/AppStyles';
import { Icon } from 'react-native-elements';
import styles from './styles';
import Moment from 'moment';
import fn from './functions';



export default function InventoryManagement(props) {


    //==============================================================
    // Declaration const and States
    //==============================================================

    const infoUser = props.route.params;

    const [listStores, setlistStores] = useState([]);
    const [selectedStore, setSelectedStore] = useState('');

    const [operation, setOperation] = useState('entry');
    const [dataProducts, setDataProducts] = useState([]);
    const [hideItem, setHideItem] = useState(false);
    const [iconDelete, setIconDelete] = useState(false);
    const [loading, setLoading] = useState(false);


    const [date, setDate] = useState(new Date());
    const [showDate, setShowDate] = useState(false);
    const [showAddProduct, setShowAddProduct] = useState(true);
    const [toId, setToId] = useState(infoUser.store);
    const [listItems, setListItems] = useState([]);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowDate(!showDate);
        setDate(currentDate);
    };



    const [visible, setVisible] = useState(false);
    const hideDialog = () => setVisible(!visible);

    //==============================================================
    // LifeCycle
    //==============================================================

    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            setListItems(fn.selectProducts);
            // setHideItem(!hideItem);
            setShowAddProduct(true);
            listStore();
            return unsubscribe;
        });
    });



    //==============================================================
    // OtherMethods
    //==============================================================

    // Function List store mongoDb
    async function listStore() {
        listClients({
            find: {
                matrix_id: infoUser.matrix_id,
            },
            filter: {
                name: 1
            }
        })
            .then((resp) => {
                setlistStores(resp);
            })
            .catch((error) => {
                console.log(error);
            });

        await listProducts({
            matrix_id: infoUser.matrix_id,
            limit: 5
        })
            .then(resp => {
                setDataProducts(resp);
            }).catch(err => console.log(err))
    }

    // Function for search clients in list select
    async function searchFilterFunction(text) {

        if (text != '') {
            await listProducts({
                matrix_id: infoUser.matrix_id,
                title: text,
            })
                .then(resp => {
                    setDataProducts(resp);
                }).catch(err => console.log(err))
        } else {
            setDataProducts([]);
        }
    }

    // Function select products 
    function operationProducts(item, index, condition) {

        setVisible(!visible);
        // item.details = [""];

        props.navigation.navigate("AddProductsInventoryManagement", { item: item, index: index, condition: condition, infoUser: infoUser });
        searchFilterFunction("");
        // setHideItem(!hideItem);
        setShowAddProduct(false);
    };

    async function saveInfos() {

        const _idNewUser = operation == "exit" ? "608b17698e467166f3c57cd5" : toId
        setLoading(true);


        await fn.insertProducts(infoUser, operation, _idNewUser, date);

        setLoading(false);
        // props.navigation.goBack();
        props.navigation.reset({
            routes: [{
                name: "Dashboard",
                params: infoUser
            }]
        });

    }


    //==============================================================
    // Render
    //==============================================================

    return (
        <View style={styles.container}>
            <View>
                <View style={styles.viewFlat}>
                    {
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            ListHeaderComponent={
                                <View>

                                    {
                                        (showAddProduct) ?
                                            <View style={styles.bodyContainer}>
                                                <Text>
                                                    Operação
                                                </Text>
                                                <View style={styles.sPicker}>
                                                    <Picker
                                                        mode="dropdown"
                                                        selectedValue={operation}
                                                        onValueChange={
                                                            (itemValue) => {
                                                                setOperation(itemValue),
                                                                    (itemValue == "transfer") ? setToId(selectedStore) : setToId(infoUser.store)
                                                            }
                                                        }>
                                                        <Picker.Item label="Entrada" value="entry" />
                                                        <Picker.Item label="Saída" value="exit" />
                                                        <Picker.Item label="Transferência" value="transfer" />
                                                    </Picker>
                                                </View>
                                                {
                                                    (operation == "transfer") &&
                                                    <View style={styles.body}>
                                                        <Text>
                                                            Id da loja para transferência
                                                        </Text>
                                                        {/* <TextInput
                                                            style={styles.textInput}
                                                            value={toId}
                                                            onChangeText={(text) => { setToId(text) }}
                                                        /> */}
                                                        <View style={styles.sPicker}>
                                                            <Picker
                                                                mode="dropdown"
                                                                selectedValue={selectedStore}
                                                                onValueChange={
                                                                    (select) => {
                                                                        setSelectedStore(select)
                                                                        setToId(select)
                                                                    }
                                                                }>
                                                                {
                                                                    listStores.map((item) => {
                                                                        return (
                                                                            <Picker.Item key={item._id} label={item.name} value={item._id} />
                                                                        )
                                                                    })
                                                                }
                                                            </Picker>
                                                        </View>
                                                    </View>
                                                }

                                                <View style={styles.body}>
                                                    <Text>
                                                        Data
                                                    </Text>
                                                    <TouchableOpacity>
                                                        <TouchableOpacity onPress={() => { setShowDate(!showDate) }} style={styles.touchDate}>
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

                                                <View style={styles.viewButtonAdd}>
                                                    <Text style={styles.textTitle}>
                                                        Produtos
                                                    </Text>
                                                    <TouchableOpacity
                                                        style={styles.buttonAdd}
                                                        onPress={() => { setShowAddProduct(!showAddProduct) }}
                                                    >
                                                        <Icon
                                                            size={30}
                                                            color={color.primary}
                                                            name='add'
                                                            type='ionicon'
                                                        />
                                                    </TouchableOpacity>
                                                </View>
                                            </View>

                                            :

                                            <View>
                                                <View style={styles.viewButtonAdd}>
                                                    <Text style={styles.textTitle}>
                                                        Produtos
                                                    </Text>
                                                    <TouchableOpacity
                                                        style={styles.buttonAdd}
                                                        onPress={() => { setShowAddProduct(!showAddProduct) }}
                                                    >
                                                        <Icon
                                                            size={30}
                                                            color={color.primary}
                                                            name='chevron-down-outline'
                                                            type='ionicon'
                                                        />
                                                    </TouchableOpacity>
                                                </View>

                                                <TextInput
                                                    placeholder="Pesquisar"
                                                    style={styles.inputSearch}
                                                    onChangeText={(text) => searchFilterFunction(text)}
                                                />
                                                {
                                                    (dataProducts == '') &&
                                                    <View style={styles.subAction}>
                                                        <TouchableOpacity onPress={() => { props.navigation.navigate("RegisterProduct", { condition: 0 }) }}>
                                                            <Text style={[styles.textTitle, { fontSize: 13 }]}>
                                                                O Produto não está cadastrado?
                                                            </Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                }
                                                {
                                                    <View style={styles.viewFlat}>
                                                        <FlatList
                                                            data={dataProducts}
                                                            keyExtractor={item => item._id}
                                                            renderItem={
                                                                ({ item }) =>
                                                                    <Card
                                                                        onPress={() => { operationProducts(item, -1, 0) }}
                                                                        style={[styles.cardFlat, { backgroundColor: color.quartiary }]}
                                                                    >
                                                                        <View style={styles.viewItemFlat}>
                                                                            <Text>
                                                                                {item.title}
                                                                            </Text>
                                                                        </View>
                                                                    </Card>
                                                            }
                                                        />
                                                    </View>
                                                }
                                            </View>
                                    }
                                </View>
                            }
                            data={listItems}
                            keyExtractor={item => item.product._id}
                            renderItem={
                                ({ item, index }) =>
                                    <Card style={styles.cardFlat} onPress={() => { operationProducts(item, index, 1) }}>
                                        <View style={styles.cardFlat}>
                                            <View style={styles.viewItemFlat}>
                                                <Text>
                                                    {item.product.title}
                                                </Text>
                                            </View>
                                            <View style={[styles.viewItemFlat, { alignItems: 'flex-end' }]}>

                                                <View>
                                                    <View>
                                                        <Text style={{ fontSize: 12, color: 'gray', fontWeight: 'bold' }}>
                                                            Quant.
                                                        </Text>
                                                    </View>
                                                    <View>
                                                        <Text>
                                                            {item.quantity}
                                                        </Text>
                                                    </View>
                                                </View>
                                            </View>

                                        </View>
                                    </Card>
                            }
                            ListFooterComponent={

                                <View>
                                    {
                                        (listItems != '' && showAddProduct) &&
                                        <TouchableOpacity
                                            disabled={loading}
                                            style={styles.touchFinalizar}
                                            onPress={async () => { saveInfos() }}
                                        >
                                            {
                                                !loading ?
                                                    <Text style={styles.textButton}>
                                                        Concluir
                                                    </Text>
                                                    :
                                                    <ActivityIndicator
                                                        style={{ padding: 10 }}
                                                        size="small"
                                                        color="#fff"
                                                    />
                                            }
                                        </TouchableOpacity>
                                    }

                                </View>
                            }
                        />
                    }
                </View>
                <View>

                </View>
            </View>
        </View>
    );
};

