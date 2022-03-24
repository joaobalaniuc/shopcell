
import { Appbar, FAB, Card, Searchbar } from 'react-native-paper';
import { Text, View, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { listCashiers } from '../../services/api';
import { Icon } from 'react-native-elements';
import styles from './styles';
import Moment from 'moment';
import gFn from '../../libs/functions';
import { color } from '../../assets/AppStyles';


export default props => {


    //==============================================================
    //Declaration const and States
    //==============================================================

    // Receive date for drawer navigator
    const infoUser = props.route.params; 

    //Const receive navigation for action
    //Action = navigation RegisterSale or RegisterClient 
    // const { action } = props.route.params;


    //Component navigation screens
    const [search, setSearch] = useState(false);
    const [valueSearch, setValueSearch] = useState('');
    const [checkCashFlow, setCheckCashFlow] = useState(false);


    //Const for list Clients
    const [list, setList] = useState([]);
    const [data, setData] = useState([]);

    //==============================================================
    // LifeCycle
    //==============================================================

    useEffect(() => {
        props.navigation.addListener('focus', () => {
            listCashie();
        });
    }, [props.route.params]);

    //==============================================================
    // OtherMethos
    //==============================================================

    //Function list subject clients
    async function listCashie() {

        console.log("listCashie");

        await listCashiers({
            matrix_id: infoUser.matrix_id,
            find: {
                branch_id: infoUser.store
            }
        })
            .then((resp) => {
                setList(resp);
                setData(resp);
                setCheckCashFlow(false);

                resp.map((res) => {
                    if (res.status == "open") {
                        setCheckCashFlow(true);
                    }
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }


    //Function navigation Create a Clients
    function navigationRegisterCashFlow() {

        if(!checkCashFlow){
            props.navigation.navigate("RegisterCashFlow", { detailsItem: null, infoUser });
        } else {
            gFn.toastConfirm("Já existe um caixa aberto!");
        }
    }

    //Function navigation Create a New Sale
    function selectedItem(item) {
        props.navigation.navigate("RegisterCashFlow", { detailsItem: item, infoUser });
    }


    // Fucntion for search list Users
    function searchFilterFunction(text) {
        const newData = data.filter(item => {
            const itemData = `${Moment(item.open_date.toUpperCase()).format("DD/MM/YYYY")}   
          ${Moment(item.open_date.toUpperCase()).format("DD/MM/YYYY")} ${Moment(item.open_date.toUpperCase()).format("DD/MM/YYYY")}`;

            const textData = text.toUpperCase();

            return itemData.indexOf(textData) > -1;
        });

        setList(newData);
    };


    //==============================================================
    // Render
    //==============================================================

    return (
        <View style={styles.container}>
            <Appbar.Header
                style={styles.appbar}
            >
                {
                    !search &&
                    <Appbar.BackAction onPress={() => { props.navigation.goBack() }} />
                }
                {
                    !search ?
                        <Appbar.Content title="Lista de Fluxo de Caixa" subtitle="" />
                        :
                        <Searchbar
                            autoFocus
                            style={styles.searchbar}
                            placeholder="Pesquisar"
                            color="#000"
                            iconColor="#000"
                            placeholderTextColor="gray"
                            icon="arrow-left"
                            onIconPress={() => {
                                setSearch(!search)
                                setValueSearch('')
                            }}
                            onChangeText={(text) => { searchFilterFunction(text) }}

                        />
                }
                {
                    !search &&
                    <Appbar.Action icon="magnify" onPress={() => {
                        setSearch(!search)
                    }} />
                }
            </Appbar.Header>



            <View style={styles.sViewLista}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={list}
                    keyExtractor={item => item._id}
                    renderItem={({ item }) =>
                        <Card
                            onPress={() => selectedItem(item)}
                            style={styles.sCard}
                        >

                            <View style={styles.sViewCard}>
                                <View style={styles.sListLeft}>
                                    {
                                        (item.status == 'open') ?
                                            <Icon
                                                size={20}
                                                color={"#4285F4"}
                                                name="lock-open"
                                                situation='ionicon'
                                            />
                                            :
                                            <Icon
                                                size={20}
                                                color={"#4285F4"}
                                                name="lock"
                                                situation='ionicon'
                                            />
                                    }
                                </View>
                                <View style={styles.sListRight}>
                                    <Text style={styles.sText}>{Moment(item.open_date).format("DD/MM/YYYY")} </Text>
                                    <Text style={styles.sTextInfoList}> {item.comment} </Text>
                                </View>
                            </View>
                        </Card>
                    } 
                />
            </View>
            <View>
                <FAB
                    onPress={() => { navigationRegisterCashFlow() }}
                    style={[styles.fab, checkCashFlow && { backgroundColor: color.tertiary }]}
                    icon="plus"
                />
            </View>
        </View>
    )
};