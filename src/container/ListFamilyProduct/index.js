import { Text, View, FlatList, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Card, Searchbar } from 'react-native-paper';
import React, { useEffect, useState } from 'react';
import { listFamilies, deleteFamily } from '../../services/api';
import { color } from '../../assets/AppStyles';
import { Icon } from 'react-native-elements';
import styles from './styles';


export default props => {


    //==============================================================
    // Declaration const and States
    //==============================================================

    // Const receive info user screen product
    const infoUser = props.route.params;

    // Const receive data for mongo db
    const [data, setData] = useState([]);
    const [list, setList] = useState([]);

    const [loading, setLoading] = useState(false);
    const [loadingIndex, setLoadingIndex] = useState(null);
    const [hideTrash, setHideTrash] = useState(null);



    //==============================================================
    // LifeCycle
    //==============================================================

    useEffect(() => {
        listDataFamily();
    }, [props.route.params]);

    useFocusEffect(
        React.useCallback(() => {
            listDataFamily();
        }, [])
    );

    //==============================================================
    // OtherMethods
    //==============================================================

    // Function list family product
    function listDataFamily() {
        listFamilies({
            matrix_id: infoUser.matrix_id,
        })
            .then((resp) => {
                setList(resp);
                setData(resp);

            })
            .catch((error) => {
                if (error == "Error: Network Error") {
                    gFn.toastConfirm("Parece que existe problemas ao se conectar ao banco!");
                    props.navigation.reset({
                        routes: [{
                            name: "SplashScreen",
                            params: infoUser
                        }]
                    });
                }
                console.log(error);
            });
    };

    // Function delete family
    async function removeFamily(id, index) {
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

                        await deleteFamily({
                            _id: id,
                        })
                            .then((resp) => {
                                gFn.toastConfirm("Removido com sucesso!");
                                console.log(resp);
                            })
                            .catch((error) => {
                                gFn.toastConfirm("Ops! Tivemos problemas na conexão!");
                                console.log(error);
                            })

                            listDataFamily();
                            setLoading(false);
                            setHideTrash(false);
                    }
                },
            ], { cancelable: false });

    }


    // Function navigation Create a Family Product
    function createFamilyProduct(selectedFamily, operation) {
        setHideTrash(false);
        console.log(selectedFamily);
        props.navigation.navigate("RegisterFamilyProduct", { infoUser, selectedFamily, operation });
    };

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
                                    CONSULTA DE FAMÍLIAS
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
                                    onPress={() => { createFamilyProduct() }}
                                    style={styles.sTouchNewProduct}
                                >
                                    <Icon
                                        size={25}
                                        color={color.primary}
                                        name='add'
                                        type='ionicon'
                                    />
                                    <Text style={styles.sTextButtonNewProduct}>
                                        Adicionar Nova Família
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
                            onPress={() => { createFamilyProduct(item, 1) }}
                            onLongPress={() => { setHideTrash(!hideTrash) }}>
                            <View style={styles.sViewCard}>
                                <View style={styles.sListRight}>
                                    <Text style={styles.sText}>{item.title}</Text>
                                    {/* <Text style={styles.sTextInfoList}> {item.descricao} </Text> */}
                                </View>
                                <View style={[styles.sListRight, { flex: 1 }]}>
                                    {
                                        hideTrash &&
                                        <TouchableOpacity onPress={() => { removeFamily(item._id, index) }}>
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
