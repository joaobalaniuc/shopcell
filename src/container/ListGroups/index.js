import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Card, Searchbar } from 'react-native-paper';
import { color } from '../../assets/AppStyles';
import { listGroups, deleteGroup } from '../../services/api';
import { Icon } from 'react-native-elements';
import styles from './styles';

import gFn from '../../libs/functions';

export default props => {


    //==============================================================
    // Declaration const and States
    //==============================================================

    // Const receive infos screen Product
    const infoUser = props.route.params;

    const [loading, setLoading] = useState(false);
    const [loadingIndex, setLoadingIndex] = useState('');

    const [data, setData] = useState([]);
    const [list, setList] = useState([]);
    const [hideTrash, setHideTrash] = useState(false);



    //==============================================================
    // LifeCycle
    //==============================================================

    useEffect(() => {
        listDataGroups();
    }, []);


    useFocusEffect(
        React.useCallback(() => {
            listDataGroups();
        }, [])
    );

    //==============================================================
    // OtherMethods
    //==============================================================


    // Function list data Groups
    function listDataGroups() {
        listGroups({
            _id: infoUser._id,
        })
            .then((resp) => {
                setList(resp);
                setData(resp);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    //Function navigation Create a Groups Product
    function navigationRegisterGroupsProduct(item, operation) {
        setHideTrash(false);
        props.navigation.navigate("RegisterGroupsProduct", { infoUser, item, operation });
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
                        setLoading(true);
                        await deleteGroup({
                            _id: id
                        })
                            .then((resp) => {
                                console.log(resp);
                                gFn.toastConfirm("Item deletado com sucesso!");
                                listDataGroups();
                            })
                            .catch((error) => {
                                console.log(error);
                                gFn.toastConfirm("Ops, o item não foi deletado!");
                            });
                        setLoading(false);
                        setHideTrash(false);
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
                                    CONSULTA DE GRUPOS
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
                                    onIconPress={() => {
                                        setSearch(!search)
                                        setValueSearch('')
                                    }}
                                    onChangeText={(text) => { searchFilterFunction(text) }}

                                />
                            </View>

                            <View style={styles.sViewButton}>
                                <TouchableOpacity
                                    onPress={() => { navigationRegisterGroupsProduct(infoUser, {}, 0) }}
                                    style={styles.sTouchNewProduct}
                                >
                                    <Icon
                                        size={25}
                                        color={color.primary}
                                        name='add'
                                        type='ionicon'
                                    />
                                    <Text style={styles.sTextButtonNewProduct}>
                                        Adicionar Novo Grupo
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
                            onPress={() => { navigationRegisterGroupsProduct(item, 1) }}
                            onLongPress={() => { setHideTrash(!hideTrash) }}
                        >
                            <View style={styles.sViewCard}>
                                <View style={styles.sListLeft}>
                                    <Text style={styles.sText}>{item.title}</Text>
                                </View>

                                <View style={styles.sListRight}>
                                    {
                                        hideTrash ?
                                            <TouchableOpacity
                                                onPress={() => { deleteItem(item._id, index) }}
                                            >
                                                {
                                                    (loading && loadingIndex == index) ?
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
                                            :
                                            <Text style={styles.sTextInfoList}> {item.subgroups.length} Subgrupos </Text>
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

