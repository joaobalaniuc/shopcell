import { Card, Searchbar } from 'react-native-paper';
import { Text, Alert, View, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { listUsers, deleteUser } from '../../services/api';
import { color } from '../../assets/AppStyles';
import { Icon } from 'react-native-elements';
import gFn from '../../libs/functions';
import styles from './styles';


export default props => {


    //==============================================================
    //Declaration const and States
    //==============================================================

    //Const receive navigation for action
    //Action = navigation RegisterSale or RegisterClient 
    const infoUser = props.route.params;

    // const search clients
    const [search, setSearch] = useState(false);

    const [loading, setLoading] = useState(false);
    const [loadingIndex, setLoadingIndex] = useState(null);
    const [hideTrash, setHideTrash] = useState(false);



    //Const for list Clients
    const [list, setList] = useState([]);
    const [data, setData] = useState([]);

    //==============================================================
    // LifeCycle
    //==============================================================

    //Executing requestCatalog when initialize
    useEffect(() => {
        listAccess();
    }, [props.route.params]);

    useFocusEffect(
        React.useCallback(() => {
            listAccess();
        }, [])
    );


    //==============================================================
    // OtherMethos
    //==============================================================


    //Function list subject clients
    async function listAccess() {
        await listUsers({
            matrix_id: infoUser.matrix_id,
        })
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
                console.log(error)
            });
    };

    // Function delete item
    async function deleteClient(id, index) {

        setLoadingIndex(index);

        Alert.alert(
            "Remover Item",
            "Deseja remover o Cliente?",
            [
                {
                    text: "Não", onPress: async () => { }
                },
                {
                    text: "Sim", onPress: async () => {
                        setLoading(true);

                        await deleteUser({
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
                        listAccess();
                        setLoading(false);
                        setLoadingIndex(null);
                        setHideTrash(false);
                    }
                },
            ], { cancelable: false });
    };


    //Function navigation Create a New Sale
    function selectClient(item) {
        setHideTrash(false);
        props.navigation.navigate("RegisterUser", { item: item, infoUser, operation: 1 });
    };


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


    //==============================================================
    // Render
    //==============================================================

    return (
        <View style={styles.container}>

            <View style={styles.sViewLista}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={
                        <View style={styles.sViewHeader}>
                            <View>
                                <Text style={styles.sTextTitle}>
                                    CONSULTA DE USUÁRIOS
                                </Text>
                            </View>

                            <View>
                                <Searchbar
                                    style={styles.searchbar}
                                    placeholder="Pesquisar"
                                    color={color.dark}
                                    iconColor={color.dark}
                                    placeholderTextColor="gray"
                                    onChangeText={(text) => { searchFilterFunction(text) }}

                                />
                            </View>

                            <View style={styles.sViewButton}>
                                <TouchableOpacity
                                    onPress={() => { props.navigation.navigate("RegisterUser", { infoUser, item: {}, operation: 0 }) }}
                                    style={styles.sTouchNewProduct}
                                >
                                    <Icon
                                        size={25}
                                        color={color.primary}
                                        name='add'
                                        type='ionicon'
                                    />
                                    <Text style={styles.sTextButtonNewProduct}>
                                        Adicionar Novo Usuário
                                </Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    }
                    data={list}
                    keyExtractor={item => item._id}
                    renderItem={({ item, index }) =>
                        <Card
                            onPress={() => selectClient(item)}
                            style={styles.sCard}
                            onLongPress={() => { setHideTrash(!hideTrash) }}
                        >

                            <View style={styles.sViewCard}>
                                <View style={styles.sListLeft}>
                                    <Icon
                                        size={20}
                                        color={color.primary}
                                        name='person'
                                        type='ionicon'
                                    />
                                </View>
                                <View style={styles.sListRight}>
                                    <Text style={styles.sText}>{item.login}</Text>
                                    <Text style={styles.sTextInfoList}> {item.email} </Text>
                                </View>
                                <View style={{ height: '100%', paddingHorizontal: 20, justifyContent: 'center' }}>
                                    {
                                        hideTrash &&
                                        <TouchableOpacity
                                            onPress={() => { deleteClient(item._id, index) }}
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