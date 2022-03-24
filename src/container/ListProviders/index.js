import { Card, FAB, Searchbar } from 'react-native-paper';
import { Text, View, FlatList, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { listSubjects, deleteSubject } from '../../services/api';
import { color } from '../../assets/AppStyles';
import { Icon } from 'react-native-elements';
import styles from './styles';
import gFn from '../../libs/functions'


export default props => {

    //==============================================================
    //  Declarations consts and states
    //==============================================================

    // Receive date drawer navigator
    const infoUser = props.route.params;


    //Const list providers
    const [list, setList] = useState([{ companyName: "", name: "" }]);
    const [data, setData] = useState([{ companyName: "", name: "" }]);

    const [hideTrash, setHideTrash] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loadingIndex, setLoadingIndex] = useState(null);


    //==============================================================
    // LifeCycle
    //==============================================================

    //Executing requestCatalog when initialize
    useEffect(() => {
        listProviders();
    }, [props.route.params]);

    useFocusEffect(
        React.useCallback(() => {
            listProviders();
        }, [])
    );


    //==============================================================
    // OtherMethods
    //==============================================================

    //Function list subject clients
    async function listProviders() {
        await listSubjects({
            find: {
                matrix_id: infoUser.matrix_id,
                provider: true,
            }
        }
        )
            .then((resp) => {
                setList(resp);
                setData(resp);
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
            });
    };


    //Function navigation Create a Provider
    function navigationRegisterProvider(item, action) {
        props.navigation.navigate("RegisterProvider", { item, action, infoUser });
    }


    // Fucntion for search list Users
    function searchFilterFunction(text) {
        const newData = data.filter(item => {
            const itemData = `${item.name.toUpperCase()}   
          ${item.name.toUpperCase()} ${item.name.toUpperCase()}`;
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });
        setList(newData);
    };

    // Function delete family
    async function removeProvider(id, index) {

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

                        await deleteSubject({
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

                            listProviders();
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
                                    CONSULTA DE FORNECEDORES
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
                                    onPress={() => { navigationRegisterProvider(null, 0) }}
                                    style={styles.sTouchNewProduct}
                                >
                                    <Icon
                                        size={25}
                                        color={color.primary}
                                        name='add'
                                        type='ionicon'
                                    />
                                    <Text style={styles.sTextButtonNewProduct}>
                                        Adicionar Novo Fornecedor
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    }
                    data={list}
                    keyExtractor={item => item._id}
                    renderItem={({ item, index }) =>
                        <Card
                            onPress={() => { navigationRegisterProvider(item, 1) }}
                            style={styles.sCard}
                            onLongPress={ () => { setHideTrash(!hideTrash) }}
                        >
                            <View style={styles.sViewCard}>
                                <View style={styles.sListRight}>
                                    <Text style={styles.sText}>{item.name || ''}</Text>
                                    <Text style={styles.sTextInfoList}> {item.companyName || ''}</Text>
                                </View>
                                <View style={[styles.sListRight, { flex: 1 }]}>
                                {
                                        hideTrash &&
                                        <TouchableOpacity onPress={() => { removeProvider(item._id, index) }}>
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
