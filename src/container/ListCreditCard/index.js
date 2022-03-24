import {
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    FlatList,
    Alert,
    ToastAndroid,
    ActivityIndicator,
} from 'react-native';
import { listPMethods, deletePMethod } from '../../services/api';
import { useFocusEffect } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { color } from '../../assets/AppStyles';
import { Icon } from 'react-native-elements';
import { Card } from 'react-native-paper';
import styles from './styles';

import gFn from '../../libs/functions';

export default function RegisterSale(props) {

    //==============================================================
    //Declaration const and States
    //==============================================================

    const { matrix_id } = props.route.params;
    const [iconDelete, setIconDelete] = useState(false);
    const [typeCredit, setTypeCredit] = useState("credit card");
    const [descriptionMethod, setDescriptionMethod] = useState("Cartões de Crédito");
    const [listPMethod, setListPMethod] = useState();

    const [loading, setLoading] = useState(false);
    const [indexLoading, setIndexLoading] = useState(null);




    //==============================================================
    //LifeCycle
    //==============================================================

    useEffect(() => {
        listCreditCard();
        setIconDelete(false);
    }, [props.route.params]);


    useFocusEffect(
        React.useCallback(() => {
            listCreditCard();
        }, [props.route.params])
    );

    //==============================================================
    //OtherMethods
    //==============================================================

    // Function to list credit card the database records
    async function listCreditCard() {


        if (props.route.name === "ListCredit") {
            setTypeCredit("credit");
            setDescriptionMethod("Crediário");
        }

        await listPMethods({
            matrix_id: matrix_id,
            find: {
                type: typeCredit,
            }
        })
            .then((resp) => {
                setListPMethod(resp);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    // Function open edit CreditCard
    function navigationRegisterCard(item, condition) {
        props.navigation.navigate("RegisterCreditCard", {
            matrix_id: matrix_id,
            item: item,
            condition: condition,
            typeCredit: typeCredit,
        })
    }

    // Fuction Delete Item mongodb
    function deleteItem(item, index) {

        setIndexLoading(index);

        Alert.alert(
            "Remover Item",
            "Deseja remover a Bandeira?",
            [
                {
                    text: "Não",
                },
                {
                    text: "Sim", onPress: async () => {

                        setLoading(true);

                        deletePMethod({
                            _id: item._id,
                        })
                            .then((resp) => {
                                gFn.toastConfirm("Item removido com Sucesso!");
                                listCreditCard();
                                setLoading(false);
                            })
                            .catch((error) => {
                                console.log(error);
                                gFn.toastConfirm("O item não foi excluído, tente novamente!");
                            });
                    }
                },
            ],
            { cancelable: false }
        );
    }

    //==============================================================
    //Render
    //==============================================================

    return (

        <SafeAreaView style={styles.container}>
                <FlatList
                    ListHeaderComponent={
                        <View>
                            <View style={styles.cardCustomer}>
                                <Text style={styles.textTitle}>
                                    {descriptionMethod}
                                </Text>
                            </View>
                            <View style={styles.headerListCard}>
                                <View>
                                    <Text style={[styles.textTitle, { fontSize: 16 }]}>
                                        Lista
                                    </Text>
                                </View>

                                <View style={styles.viewButtonAdd}>
                                    <TouchableOpacity
                                        onPress={() => navigationRegisterCard(null, 0)}
                                        style={styles.buttonAdd}
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
                        </View>
                    }
                    data={listPMethod}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={item => item.title}
                    renderItem={({ item, index }) =>
                        <Card
                            style={styles.sCard}
                            onLongPress={() => { setIconDelete(!iconDelete) }}
                            onPress={() => { navigationRegisterCard(item, 1) }}
                        >
                            <View style={styles.sViewCard}>
                                <View style={styles.sListRight}>
                                    <View style={styles.vDescription}>
                                        <Text style={styles.sText}>
                                            {item.title}
                                        </Text>
                                        <Text style={styles.sTextInfoList}>
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

                                        </Text>
                                    </View>
                                    <View style={styles.vPrice}>
                                        {
                                            (iconDelete === true) &&
                                            <TouchableOpacity
                                                onPress={() => { deleteItem(item, index) }}
                                                style={styles.touchDelete}
                                            >
                                                {
                                                    (loading && indexLoading == index) ?
                                                        <ActivityIndicator
                                                            size="small"
                                                            color={color.danger}
                                                        />
                                                        :
                                                        <Icon
                                                            size={20}
                                                            color={"red"}
                                                            name='trash-outline'
                                                            type='ionicon'
                                                        />
                                                }
                                            </TouchableOpacity>
                                        }
                                    </View>
                                </View>
                            </View>
                        </Card>

                    } />
        </SafeAreaView>
    );
};
