import { Text, View, FlatList, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Card, FAB, Searchbar } from 'react-native-paper';
import React, { useEffect, useState } from 'react';
import { listStocks, resumeStock } from '../../services/api';
import { color } from '../../assets/AppStyles';
import { Icon } from 'react-native-elements';
import gFn from '../../libs/functions';
import styles from './styles';
import Moment from 'moment';


export default props => {

    //==============================================================
    //  Declarations consts and states
    //==============================================================

    // Const receive date for drawer navigator
    const infoUser = props.route.params;
    const [list, setList] = useState([]);
    const [data, setData] = useState([]);
    const [actualImei, setActualImei] = useState('');
    const [actualStock, setActualStock] = useState('');
    



    //==============================================================
    // LifeCycle
    //==============================================================

    //Executing requestCatalog when initialize
    useEffect(() => {
        requestListProducts();
    }, [props.route.params]);


    useFocusEffect(
        React.useCallback(() => {
            requestListProducts();
        }, [])
    );


    //==============================================================
    // OtherMethods
    //==============================================================

    //Fucntion list bd products
    async function requestListProducts() {
        await resumeStock({
            matrix_id: infoUser.matrix_id,
            client_id: infoUser.store,

        })
            .then((resp) => {
                setList(resp);
                setData(resp);
            })
            .catch((error) => {
                if (error.Error == "Network Error") {
                    gFn.toastConfirm("Parece que existe problemas ao se conectar ao banco!");
                }
                console.log("Esse é o erro:\n", error);
            })
    };

    //Function navigation Create a Family Product
    function navigationRegisterProduct() {
        props.navigation.navigate("RegisterProduct", { condition: 0, item: undefined });
    };

    // function add component details
    function componentDetails(item) {
        props.navigation.navigate("RegisterProduct", { infoUser, item: item._id.product_id, condition: 1 });

        searchFilterFunction("");
    }

    // Fucntion for search list Users
    async function searchFilterFunction(text) {

        setActualStock('');

        if (isNaN(text)) {

            const newData = data.filter(item => {
                const itemData = `${item.title.toUpperCase()}   
              ${item.title.toUpperCase()} ${item.title.toUpperCase()}`;
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
            setList(newData);

        } else if (text == '') {

            setList(data);

        } else if (!isNaN(text)) {

            setActualImei(text);
            await listStocks({
                find: {
                    client_id: infoUser.store,
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
                                setList(res);
                            })
                            .catch((error) => {
                                console.log(error);
                            });
                    } else {
                        setList([]);
                    }
                    setActualStock(resp[0]._id);

                })
                .catch((error) => {
                    console.log(error)
                });
        }

    };


//==============================================================
// Render
//==============================================================

return (
    <View style={styles.container}>
        <View style={styles.sViewLista}>
            <FlatList
                data={list}
                keyExtractor={item => item._id.product_id}
                ListHeaderComponent={
                    <View style={styles.sViewHeader}>
                        <View>
                            <Text style={styles.sTextTitle}>
                                CONSULTA DE MERCADORIAS
                                </Text>
                        </View>

                        <View>
                            <Searchbar
                                // autoFocus
                                style={styles.searchbar}
                                placeholder="Pesquisar"
                                color={color.tertiary}
                                iconColor={color.tertiary}
                                placeholderTextColor={color.tertiary}
                                onChangeText={(text) => { searchFilterFunction(text) }}

                            />
                        </View>

                        <View style={styles.sViewButton}>
                            <TouchableOpacity
                                onPress={() => { navigationRegisterProduct() }}
                                style={styles.sTouchNewProduct}
                            >
                                <Icon
                                    size={25}
                                    color={color.primary}
                                    name='add'
                                    type='ionicon'
                                />
                                <Text style={styles.sTextButtonNewProduct}>
                                    Adicionar Novo Produto
                                    </Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                }
                renderItem={({ item, index }) =>
                    <Card
                        onPress={() => { componentDetails(item, index) }}
                        style={styles.sCard}
                    >
                        <View style={styles.sViewCard}>
                            <View style={styles.sListLeft}>
                                <Text style={styles.sText}>
                                    {
                                        (item.title === undefined) ?
                                            ""
                                            : (item.title.length <= 11) ?
                                                item.title
                                                :
                                                item.title.substring(0, 40) + "..."
                                    }
                                </Text>

                                {
                                    item.lastInsert == null ?
                                        <Text style={styles.sTextDetailsList}>
                                            Sem movimentação
                                            </Text>
                                        :
                                        <Text style={styles.sTextDetailsList}>
                                            Última Entrada:
                                                {Moment(item.lastInsert).format("DD/MM/YYYY")}
                                        </Text>
                                }
                            </View>

                            <View style={styles.sListRight}>
                                <Text style={[styles.sTextInfoList, { fontSize: 15 }]}>
                                    {gFn.convertMoneyString(item.price)}
                                </Text>
                                {
                                    false ?
                                        <Text style={styles.sTextInfoList}>
                                            Estoque atual: 2 {' '}
                                        </Text>
                                        :
                                        <Text style={styles.sTextInfoList}>
                                            Estoque atual: {' '} {item.stockTotal}
                                        </Text>
                                }
                            </View>

                        </View>
                    </Card>
                }
            />
        </View>
    </View>
)
};
