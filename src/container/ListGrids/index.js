import { Text, View, FlatList, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Card, Searchbar } from 'react-native-paper';
import React, { useEffect, useState } from 'react';
import { color } from '../../assets/AppStyles';
import { Icon } from 'react-native-elements';
import styles from './styles';
import gFn from '../../libs/functions';
import { deleteGrid, listGrids } from '../../services/api';


export default props => {


    //==============================================================
    // Declaration const and States
    //==============================================================


    useEffect(() => {
        dataGrids();
    }, []);


    useFocusEffect(
        React.useCallback(() => {
            dataGrids();
        }, [])
    );


    //==============================================================
    // Declaration const and States
    //==============================================================

    const infoUser = props.route.params;

    //State para Teste
    const [list, setList] = useState([]);
    const [data, setData] = useState(list);
    const [dataGrid, setDataGrid] = useState([]);

    const [hideTrash, setHideTrash] = useState(false);
    const [loadingTrash, setLoadingTrash] = useState(false);
    const [loadingIndex, setLoadingIndex] = useState(null);

    //==============================================================
    // OtherMethods
    //==============================================================

    //Function list grids
    async function dataGrids() {
        await listGrids({
            matrix_id: infoUser.matrix_id,
        })
            .then((resp) => {
                gFn.consoleLog("DataGrids: ", resp);
                setList(resp);
                setData(resp);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    //Function navigation Create a Grid Product
    function navigationRegisterGridProduct(item, condition, ) {
        setHideTrash(false);
        props.navigation.navigate("RegisterGridProduct", { infoUser, item, condition });
    }


    // Fucntion for search list Users
    function searchFilterFunction(text) {
        const newData = data.filter(item => {
            const itemData = `${item.title.toUpperCase()}   
          ${item.title.toUpperCase()} ${item.title.toUpperCase()}`;
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });
        setList(newData);
    };

    // Function delete group
    function deleteItem(id, index) {

        setLoadingIndex(index);

        Alert.alert(
            "Remover Item",
            "Deseja remover o item?",
            [
                {
                    text: "Não", onPress: async () => { }
                },
                {
                    text: "Sim", onPress: async () => {
                        setLoadingTrash(true);
                        await deleteGrid({
                            _id: id
                        })
                            .then((resp) => {
                                console.log(resp);
                                gFn.toastConfirm("Item deletado com sucesso!");
                            })
                            .catch((error) => {
                                console.log(error);
                                gFn.toastConfirm("Ops, o item não foi deletado!");
                            });
                            setLoadingTrash(false);
                            setHideTrash(false);
                            dataGrids();
                    }
                },
            ], { cancelable: false });

    }


    //==============================================================
    // Render
    //==============================================================

    return (
        <View style={styles.container}>
            <View style={styles.sViewLista}>
                <FlatList
                    ListHeaderComponent={
                        <View style={styles.sViewHeader}>
                            <View>
                                <Text style={styles.sTextTitle}>
                                    CONSULTA DE GRADES
                                </Text>
                            </View>

                            <View>
                                <Searchbar
                                    // autoFocus
                                    style={styles.searchbar}
                                    placeholder="Pesquisar"
                                    color={color.tertiary}
                                    iconColor={color.tertiary}
                                    placeholderTextColor="gray"
                                    onChangeText={(text) => { searchFilterFunction(text) }}

                                />
                            </View>

                            <View style={styles.sViewButton}>
                                <TouchableOpacity
                                    onPress={() => { navigationRegisterGridProduct({}, 0) }}
                                    style={styles.sTouchNewProduct}
                                >
                                    <Icon
                                        size={25}
                                        color={color.primary}
                                        name='add'
                                        type='ionicon'
                                    />
                                    <Text style={styles.sTextButtonNewProduct}>
                                        Adicionar Nova Grade
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    }
                    data={list}
                    keyExtractor={item => item._id}
                    renderItem={({ item, index }) =>
                        <Card
                            style={styles.sCard}
                            onPress={() => { navigationRegisterGridProduct(item, 1) }}
                            onLongPress={() => { setHideTrash(!hideTrash) }}
                        >
                            <View style={styles.sViewCard}>
                                <View style={styles.sListRight}>
                                    <Text style={styles.sText}>{item.title}</Text>
                                    <Text style={styles.sTextInfoList}> {item.description} </Text>
                                </View>
                                <View style={[styles.sListRight, { alignItems: 'flex-end', padding: 20 }]}>
                                    {
                                        hideTrash &&
                                        <TouchableOpacity
                                            onPress={() => { deleteItem(item._id, index) }}
                                        >
                                            {
                                                (loadingTrash && loadingIndex == index) ?
                                                    <ActivityIndicator
                                                        size="small"
                                                        color={color.danger}
                                                    />
                                                    :
                                                    <Icon
                                                        size={20}
                                                        color={color.danger}
                                                        name='trash-outline'
                                                        type='ionicon'
                                                    />

                                            }
                                        </TouchableOpacity>
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