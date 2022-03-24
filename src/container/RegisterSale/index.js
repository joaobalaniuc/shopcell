import {
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    FlatList,
    Alert,
    Dimensions,
    ActivityIndicator,
} from 'react-native';
import React, { useRef, useState, useEffect } from 'react';
import { Card, FAB, Searchbar } from 'react-native-paper';
import InputSpinner from "react-native-input-spinner";
import { listProducts, listStocks, resumeStock } from '../../services/api';
import { Modalize } from 'react-native-modalize';
import { color } from '../../assets/AppStyles';
import { Icon } from 'react-native-elements';
import styles from './styles';
import gFn from '../../libs/functions';

const windowHeight = Dimensions.get('window').height;

export default function RegisterSale(props) {

    //==============================================================
    //Declaration const and States
    //==============================================================

    //Const receive data navigation ListClients
    const { client, infoUser } = props.route.params;

    //Const modalize ref
    const modalizeItem = useRef(null);


    //Const teste matriz
    const idStore = infoUser.store;
    const idMatrix = infoUser.matrix_id;
    const user_id = infoUser._id;

    //Const listProducts
    const [products, setProducts] = useState();
    const [loading, setLoading] = useState(-1);
    const [data, setData] = useState();
    const [selectItems, setSelectItems] = useState([]);
    const [listItems, setListItems] = useState([]);
    const [hideItem, setHideItem] = useState('');
    const [visibleFab, setVisibleFab] = useState(false);
    const [total, setTotal] = useState(0);
    const [listTotalPrices, setListTotalPrices] = useState([])
    const [iconDelete, setIconDelete] = useState(false);
    const [search, setSearch] = useState(false);
    const [actualImei, setActualImei] = useState([]);
    const [productsByImei, setProductsByImei] = useState([]);
    const [actualStock, setActualStock] = useState([]);
    const [textSearch, setTextSearch] = useState('');


    //==============================================================
    // LifeCycle
    //==============================================================

    useEffect(() => {
        requestListProducts();
    }, [props.route.params]);

    //==============================================================
    //OtherMethods
    //==============================================================

    //Fucntion list bd products
    async function requestListProducts() {

        await resumeStock({
            matrix_id: idMatrix,
            client_id: idStore,
        })
            .then(async (respProducts) => {
                setProducts(respProducts);
                setData(respProducts);

            })
            .catch((error) => {
                console.log("Error:\n", error);
            });
    };

    //Function for open modalize
    function openModalizeItem() {
        setActualImei('');
        setVisibleFab(false);
        if (!products == '') {
            modalizeItem.current?.open();
        } else {
            alert("Desculpa, você não possui items no seu catálogo")
        };
    };

    //Function click item catalog in modalize
    async function selectItem(item, index) {

        setLoading(index);
        var verifyProduct = -1;


        selectItems.map((resp, index) => {
            // If para verificar se existe o id do produto nos items selecionados
            // Caso exista ele retorna um valor >= 0
            if ((resp._id.product_id.indexOf(item._id.product_id)) != -1) {
                verifyProduct = index;
                return;
            }
        });


        // Caso o item seja >= 0 ele executa esse if
        // Significa que o produto já está na lista
        // Ele insere uma unidade no produto da lista de produtos selecionados
        if (verifyProduct != -1) {


            // Alterar ordenação dos elementos
            const itema = selectItems[verifyProduct].stocks[0].stock_ids.splice(selectItems[verifyProduct].stocks[0].stock_ids.indexOf(actualStock), 1);
            selectItems[verifyProduct].stocks[0].stock_ids.unshift(itema[0]);

            // Verifica se o item tem quantidade no estoque
            if (selectItems[verifyProduct].quantity < selectItems[verifyProduct].quantityStock) {

                const newQuantity = selectItems[verifyProduct].quantity + 1;
                alterQuantity(verifyProduct, newQuantity, actualImei);

            } else {
                gFn.toastConfirm("Estoque máximo selecionado!")
            }

            modalizeItem.current?.close();
            setVisibleFab(true);
        }
        // Caso o item não esteja na lista ele entra no else
        // E adiciona um novo item com quantidade == 1
        else {

            item.quantityStock = parseInt(item.stockTotal);
            // Verifica se tem estoque do produto
            if (item.quantityStock == 0) {
                gFn.toastConfirm("O produto não possui estoque!");
            } else {

                const items = selectItems;
                const list = listItems;
                const quantity = 1;
                const listTotal = listTotalPrices;
                const priceTotal = item.price * quantity;
                // gFn.consoleLog("pegando o array", (item.stocks[0].stock_ids.lastIndexOf(actualStock),1))
                // gFn.consoleLog("pegando o array", actualStock)
                // gFn.consoleLog("pegando o array", item.stocks[0].stock_ids.splice(item.stocks[0].stock_ids.indexOf(actualStock),1))

                // Alterar a sequencia do array
                const itema = item.stocks[0].stock_ids.splice(item.stocks[0].stock_ids.indexOf(actualStock), 1);
                item.stocks[0].stock_ids.unshift(itema[0]);

                // Insere o item selecionado na lista de items do pedido
                items.push({
                    _id: item._id,
                    title: item.title,
                    price: item.price,
                    quantity: quantity,
                    priceTotal: priceTotal,
                    imeis: [actualImei],
                    quantityStock: item.quantityStock,
                    stocks: item.stocks,
                });

                // Faz a soma dos valores do itens selecionados
                listTotal.push({ value: priceTotal });

                // Inseri na lista pra verificar quantidade e preço para soma
                list.push({
                    product_id: item._id.product_id,
                    quantity: quantity,
                    value: priceTotal,
                });

                // Seta os valores para os estados
                setSelectItems(items);
                setListItems(list);
                setListTotalPrices(listTotal);
                modalizeItem.current?.close();

                calculateTotal();
                setVisibleFab(true);
            };
        };

        setLoading(-1);

        searchFilterFunction("");

        // hide para atualizar a página
        if (hideItem === false) {
            setHideItem(true);
        } else {
            setHideItem(false);
        };
    };

    //Function navigation confirm sale
    function navigationConfirmSale() {

        if (selectItems.length != 0) {
            props.navigation.navigate("ConfirmSale", {
                sale: {
                    idStore,
                    matrix_id: idMatrix,
                    user_id,
                    client,
                    selectItems,
                    total,
                    listItems,
                    valueDiscounts: 0,
                    percentualDiscounts: 0,
                    discountedValues: 0
                }
            });
        } else {
            alert("Desculpe, você precisa selecionar pelo menos um produto!")
        };
    };

    // Function alter quantity products
    function alterQuantity(index, num, newImei) {

        if (num === 0) {
            deleteItem(index);
        };

        const pricesTotal = listTotalPrices;

        const items = selectItems;
        items[index].quantity = num;
        items[index].priceTotal = num * selectItems[index].price;


        const currentListImei = selectItems[index].imeis;
        currentListImei.push(newImei)


        const list = listItems;
        list[index].quantity = num;
        list[index].value = num * selectItems[index].price;
        pricesTotal[index].value = num * selectItems[index].price;
        setListTotalPrices(pricesTotal);

        calculateTotal();

        setSelectItems(items);

    };

    //function delete item list produtos
    function deleteItem(index) {

        const listProducts = selectItems;
        const list = listItems;
        const listTotal = listTotalPrices;

        Alert.alert(
            "Remover Item",
            "Deseja remover o item?",
            [
                {
                    text: "Não", onPress: async () => {
                        selectItems[index].quantity = 1;
                        alterQuantity(index, 1, "");
                    }
                },
                {
                    text: "Sim", onPress: async () => {

                        listProducts.splice(index, 1);
                        setSelectItems(listProducts);

                        list.splice(index, 1);
                        setListItems(list);

                        listTotal.splice(index, 1);
                        setListTotalPrices(listTotal);


                        calculateTotal();
                        modalizeItem.current?.close();
                        setVisibleFab(true);

                        if (hideItem === false) {
                            setHideItem(true)
                        } else {
                            setHideItem(false);
                        }

                    }
                },
            ],
            { cancelable: false }
        );
    };

    //Function for calc total value
    function calculateTotal() {

        var valueTotal = 0;

        listTotalPrices.map((num) => {
            valueTotal += num.value;
        });

        setTotal(valueTotal);

    };


    // Fucntion for search produtos
    async function searchFilterFunction(text) {
        setActualStock('');
        setTextSearch(text);

        if (isNaN(text)) {

            const newData = data.filter(item => {
                const itemData = `${item.title.toUpperCase()}   
              ${item.title.toUpperCase()} ${item.title.toUpperCase()}`;

                const textData = text.toUpperCase();

                return itemData.indexOf(textData) > -1;
            });


            setProducts(newData);

        } else if (text == "") {
            console.log("Passando por aqui");
            setProducts(data);

        } else if (!isNaN(text)) {

            setActualImei(text);
            await listStocks({
                find: {
                    client_id: idStore,
                    imei: text,
                }
            })
                .then(async (resp) => {
                    if (resp != '') {
                        await resumeStock({
                            matrix_id: infoUser.matrix_id,
                            client_id: infoUser.store,
                            product_id: resp[0].product_id
                        })
                            .then((res) => {
                                setProducts(res);
                            })
                            .catch((error) => {
                                console.log(error);
                            });
                    } else {
                        setProducts([]);
                    }
                    setActualStock(resp[0]._id);

                })
                .catch((error) => {
                    console.log(error)
                });
        }
    };


    //==============================================================
    //Render
    //==============================================================

    return (

        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <View style={styles.cardCustomer}>
                    {/* <Text style={styles.sTextCustomer}>
                            Cliente
                        </Text> */}
                    <Text style={styles.textTitle}>
                        {client.name}
                    </Text>
                    <Text style={styles.sTextCustomer}>
                        {client.email}
                    </Text>
                </View>


                <View style={[styles.cardCustomer, { flexDirection: 'row' }]}>
                    <View style={[styles.viewButtons, { justifyContent: 'flex-start' }]}>
                        <Text style={[styles.textTitle, { fontSize: 16 }]}>
                            Valor Total
                        </Text>
                    </View>
                    <View style={styles.viewButtons}>
                        <Text style={[styles.textTitle, { fontSize: 16 }]}>
                            {gFn.convertMoneyString(total)}
                        </Text>
                    </View>
                </View>

                <View style={[styles.cardCustomer, { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }]}>
                    <Text style={[styles.textTitle, { fontSize: 16 }]}>
                        Produtos
                    </Text>
                    <TouchableOpacity
                        onPress={() => openModalizeItem()}
                        style={styles.buttonAdd}
                    >
                        <Icon
                            size={20}
                            color={'white'}
                            name='add'
                            type='ionicon'
                        />
                        <Text style={styles.textButton}>
                            Adicionar
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={[styles.cardCustomer, { padding: 0, flex: 1 }]}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        keyExtractor={selectItems => selectItems._id.product_id}
                        data={selectItems}
                        renderItem={({ item, index }) =>
                            <Card
                                style={styles.sCard}
                                onPress={() => { setIconDelete(!iconDelete) }}
                            >
                                <View style={styles.sViewCard}>
                                    <View style={styles.sListRight}>
                                        <View style={styles.vDescription}>
                                            <Text style={styles.sText}>
                                                {
                                                    (item.title === undefined) ?
                                                        ""
                                                        : (item.title.length <= 11) ?
                                                            item.title
                                                            :
                                                            item.title.substring(0, 35) + "..."
                                                }
                                            </Text>
                                            {/* <Text style={styles.sTextInfoList}>
                                                {item.description}
                                            </Text> */}
                                        </View>
                                        <View style={styles.vPrice}>
                                            {
                                                !iconDelete ?
                                                    <Text style={styles.sText}>
                                                        {gFn.convertMoneyString(item.price)}
                                                    </Text>
                                                    :
                                                    <View style={styles.sViewSpinner}>
                                                        <InputSpinner
                                                            max={item.quantityStock}
                                                            min={0}
                                                            step={1}
                                                            buttonTextColor={color.dark}
                                                            colorLeft={color.light}
                                                            colorRight={color.light}
                                                            colorPress={color.light}
                                                            colorMin={color.light}
                                                            colorMax={color.light}
                                                            value={item.quantity}
                                                            onChange={(num) => { alterQuantity(index, num, "") }}
                                                        />
                                                    </View>
                                            }
                                        </View>
                                    </View>
                                </View>
                            </Card>
                        }
                    />
                    {
                        (selectItems.length != 0) &&
                        <View style={styles.viewButtonFinalizar}>
                            {/* <FAB
                                onPress={() => { navigationConfirmSale() }}
                                style={styles.fab}
                                icon="arrow-right"
                            /> */}
                            <TouchableOpacity
                                onPress={() => navigationConfirmSale()}
                                style={[styles.buttonAdd, { backgroundColor: color.success }]}
                            >
                                <Icon
                                    size={20}
                                    color={'white'}
                                    name='checkmark-outline'
                                    type='ionicon'
                                />
                                <Text style={styles.textButton}>
                                    Finalizar
                                    </Text>
                            </TouchableOpacity>
                        </View>
                    }
                </View>
            </View>
            <Modalize
                ref={modalizeItem}
                snapPoint={windowHeight - 130}
                modalHeight={windowHeight}
            >
                <View style={styles.modalize}>
                    <View style={styles.itemModalize}>
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            ListHeaderComponent={
                                <View>
                                    {/* {
                                        search ? */}
                                    <View style={styles.viewTitleModalize}>
                                        <Searchbar
                                            style={styles.search}
                                            placeholder="Pesquisar"
                                            value={textSearch}
                                            onChangeText={(text) => searchFilterFunction(text)}
                                        />
                                    </View>
                                    {/* :
                                            <View style={styles.viewTitleModalize}>

                                                <TouchableOpacity
                                                    style={{
                                                        borderRadius: 5,
                                                        padding: 8,
                                                        paddingLeft: 10,
                                                        paddingRight: 10,
                                                        backgroundColor: color.light,
                                                        elevation: 2
                                                    }}
                                                    onPress={() => { setSearch(!search) }}
                                                >
                                                    <Icon
                                                        size={27}
                                                        color={color.primary}
                                                        name='search-outline'
                                                        type='ionicon'
                                                    />
                                                </TouchableOpacity>

                                                <TouchableOpacity
                                                    style={{
                                                        borderRadius: 5,
                                                        paddingLeft: 10,
                                                        padding: 8,
                                                        paddingRight: 10,
                                                        marginLeft: 15,
                                                        backgroundColor: color.light,
                                                        elevation: 2
                                                    }}
                                                    onPress={() => { props.navigation.navigate("RegisterProduct", { condition: 0 }) }}
                                                >
                                                    <Icon
                                                        size={27}
                                                        color={color.primary}
                                                        name='add'
                                                        type='ionicon'
                                                    />
                                                </TouchableOpacity>
                                            </View>
                                    } */}
                                </View>
                            }
                            keyExtractor={products => products._id.product_id}
                            data={products}
                            renderItem={({ item, index }) =>
                                <Card
                                    style={styles.sCard}
                                    onPress={() => { selectItem(item, index) }}
                                >
                                    <View style={styles.sViewCard}>
                                        <View style={styles.sListRight}>
                                            <View style={styles.vDescription}>
                                                <Text style={styles.sText}>
                                                    {
                                                        (item.title === undefined) ?
                                                            ""
                                                            : (item.title.length <= 11) ?
                                                                item.title
                                                                :
                                                                item.title.substring(0, 35) + "..."
                                                    }
                                                </Text>
                                            </View>
                                            <View style={styles.vPrice}>
                                                <Text style={styles.sText}>
                                                    {gFn.convertMoneyString(item.price)}
                                                </Text>
                                                <Text style={styles.sTextInfoList}>
                                                    Estoque: {item.stockTotal}
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                </Card>
                            }
                        />
                    </View>
                </View>
            </Modalize>
        </SafeAreaView >
    );
};
