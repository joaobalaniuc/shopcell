import { View, SafeAreaView, StatusBar, Text } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { color } from '../../assets/AppStyles';
import React, { useState, useEffect } from 'react';
import { Icon } from 'react-native-elements';
import { Card } from 'react-native-paper';
import styles from './styles';

import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { LineChart, Grid } from 'react-native-svg-charts';

import { listClients, listBranches } from '../../services/api';
import gFn from '../../libs/functions';

export default function Dashboard(props) {


    //==============================================================
    // Declaration const and States
    //==============================================================

    const infoUser = props.route.params;
    const [listStores, setListStores] = useState([]);
    const [nameStore, setNameStore] = useState('');
    const [visibleValueFinance, setVisibleValueFinance] = useState(true);

    const [dailySales, setDailySales] = useState('');
    const [monthSales, setMonthSales] = useState('');

    //==============================================================
    // LifeCycle
    //==============================================================

    useEffect(() => {
        findStores();
    }, [props.route.params])

    useFocusEffect(
        React.useCallback(() => {
            findStores();
        }, [props.route.params])
    );
    //==============================================================
    // OtherMethods
    //==============================================================

    //Function call Dashboard selected store
    function callNewStore(item) {
        if (item._id != infoUser.store) {
            infoUser.store = item._id;
            props.navigation.reset({
                routes: [{
                    name: "SplashScreen",
                    params: infoUser
                }]
            });
        } else {
            gFn.toastConfirm("Loja já selecionada!");
        }

    };

    // Function to select the bank's store list
    async function findStores() {

        const infoUser = props.route.params;

        await listBranches({
            matrix_id: infoUser.matrix_id,
        })
            .then((resp) => {
                resp.map((item) => {
                    if (item._id == infoUser.store) {
                        setNameStore(item.name);
                        setDailySales(item.dailySales);
                        setMonthSales(item.monthSales);
                    }
                });
                setListStores(resp);
            })
            .catch((error) => {
                if (error.Error == "Network Error") {
                    gFn.toastConfirm("Parece que existe problemas ao se conectar ao banco!");
                    props.navigation.reset({
                        routes: [{
                            name: "SplashScreen",
                            params: infoUser
                        }]
                    });
                }
                console.log(error);
            })
        // await listClients({
        //     find: {
        //         matrix_id: infoUser.matrix_id,
        //     },
        //     filter: {
        //         name: 1,
        //         type: 1,
        //     }
        // })
        //     .then((resp) => {

        //         resp.map((item) => {
        //             if (item._id == infoUser.store) {
        //                 setNameStore(item.name);
        //             }
        //         });

        //         setListStores(resp);
        //     })
        //     .catch((error) => {
        //         if (error.Error == "Network Error") {
        //             gFn.toastConfirm("Parece que existe problemas ao se conectar ao banco!");
        //             props.navigation.reset({
        //                 routes: [{
        //                     name: "SplashScreen",
        //                     params: infoUser
        //                 }]
        //             });
        //         }
        //         console.log(error);
        //     })
    };

    //Function to navigate
    function nav(page, action) {
        props.navigation.navigate(page, { action });
    };

    const data = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, 80]

    const actions = [
        {
            title: "Nova Venda",
            icon: "cart-outline",
            action: "ListClients",
            func: "RegisterSale",
            especial: true,
        },
        {
            title: "Gestão de Vendas",
            icon: "file-tray-full-outline",
            action: "ListSale",
            especial: false,
        },
        {
            title: "Produtos",
            icon: "cube-outline",
            action: "Product",
            especial: false,
        },
        {
            title: "Clientes",
            icon: "people-outline",
            action: "ListClients",
            especial: false,
            func: "EditClient",
        },
        {
            title: "Fornecedores",
            icon: "people-circle-outline",
            action: "ListProviders",
            especial: false,
        },
        {
            title: "Serviços",
            icon: "receipt-outline",
            action: "Services",
            especial: false,
        },
    ];



    //==============================================================
    // Render
    //==============================================================

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="#0090de" />
            <FlatList
                ListHeaderComponent={

                    <View style={styles.container}>
                        <View style={styles.viewInfo}>
                            <Text style={styles.textTitle}>
                                {nameStore}
                            </Text>

                            <View style={styles.viewFinance}>

                                <View style={styles.viewItemFinance}>
                                    {
                                        (visibleValueFinance) ?
                                            <View>
                                                <Text style={styles.textMoney}>
                                                    Diário: {gFn.convertMoneyString(dailySales)}
                                                </Text>
                                                <Text style={styles.textMoneyMonth}>
                                                    Mensal: {gFn.convertMoneyString(monthSales)}
                                                </Text>
                                            </View>
                                            :
                                            <View style={{
                                                backgroundColor: 'white',
                                                width: '100%',
                                                borderRadius: 15,
                                                height: 34.5,
                                                opacity: 0.5,
                                            }}>

                                            </View>

                                    }
                                </View>

                                <View style={[styles.viewItemFinance, { flex: 1 }]}>
                                    <TouchableOpacity onPress={() => { setVisibleValueFinance(!visibleValueFinance) }}>
                                        {
                                            visibleValueFinance ?
                                                <Icon
                                                    size={20}
                                                    style={{ marginLeft: 20 }}
                                                    color={color.light}
                                                    name="eye-outline"
                                                    type="ionicon"
                                                />
                                                :
                                                <Icon
                                                    size={20}
                                                    style={{ marginLeft: 20 }}
                                                    color={color.light}
                                                    name="eye-off-outline"
                                                    type="ionicon"
                                                />
                                        }
                                    </TouchableOpacity>
                                </View>




                            </View>


                            <LineChart
                                style={{ height: 200 }}
                                data={data}
                                svg={{ stroke: 'rgb(255, 255, 255)' }}
                                contentInset={{ top: 20, bottom: 20 }}
                            >
                                <Grid />
                            </LineChart>

                        </View>
                        <View style={styles.viewList}>
                            <Text style={styles.textActions}>
                                Ações
                            </Text>
                            <View>
                                <FlatList
                                    showsHorizontalScrollIndicator={false}
                                    horizontal={true}
                                    data={actions}
                                    keyExtractor={actions => actions.title}
                                    renderItem={({ item }) =>
                                        <Card
                                            style={[styles.itemCard, item.especial && { backgroundColor: color.primary }]}
                                            onPress={() => { props.navigation.navigate(item.action, { action: item.func }) }}
                                        >
                                            <View style={styles.viewCard}>
                                                <Icon
                                                    size={30}
                                                    color={item.especial ? color.light : color.primary}
                                                    name={item.icon}
                                                    type="ionicon"
                                                />
                                                <Text style={[styles.textCard, item.especial && { color: color.light }]}>
                                                    {item.title}
                                                </Text>
                                            </View>
                                        </Card>
                                    }
                                />
                            </View>
                        </View>
                        <View style={styles.viewList}>
                            <Text style={styles.textActions}>
                                Selecione a Loja
                            </Text>
                        </View>
                    </View>



                }
                data={listStores}
                keyExtractor={stores => stores._id}
                renderItem={
                    ({ item }) =>
                        <Card
                            onPress={() => { callNewStore(item) }}
                            style={styles.itemListStore}
                        >
                            <View style={styles.viewItemCard}>
                                <View style={styles.viewCardLeft}>
                                    <Icon
                                        size={20}
                                        color={color.primary}
                                        name={(item._id == infoUser.store) ? "home" : "home-outline"}
                                        type="ionicon"
                                    />
                                </View>
                                <View style={styles.viewCardRight}>
                                    <Text>
                                        {item.name}
                                    </Text>
                                    <Text style={styles.textSubtitle}>
                                        {
                                            item.type == "root" ?
                                                'Matriz'
                                                :
                                                'Filial'
                                        }
                                    </Text>
                                </View>
                                <View style={[styles.viewCardLeft, { flex: 5, alignItems: 'flex-end' }]}>
                                    {/* <Text style={{ color: color.success, fontSize: 12 }}>
                                        {
                                            (((item.dailySales == undefined ? 0 : item.dailySales)
                                                -
                                                (item.monthSales == undefined ? 0 : item.monthSales))
                                                / (item.monthSales == undefined ? 0 : item.dailySales))
                                            * 100
                                        }
                                    </Text> */}
                                    <Text style={{ color: color.tertiary, fontWeight: 'bold' }}>
                                        Diário: {gFn.convertMoneyString(item.dailySales)}
                                    </Text>
                                    <Text style={{ color: color.tertiary }}>
                                        Mensal: {gFn.convertMoneyString(item.monthSales)}
                                    </Text>
                                </View>
                            </View>
                        </Card>
                }
            />
        </SafeAreaView>
    );
};