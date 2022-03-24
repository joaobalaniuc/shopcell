import { useFocusEffect } from '@react-navigation/native';
import { Appbar, FAB, Card, Searchbar, ActivityIndicator } from 'react-native-paper';
import { Text, View, FlatList, TouchableOpacity, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { listClients, deleteClient } from '../../services/api';
import { Icon } from 'react-native-elements';
import styles from './styles';
import gFn from '../../libs/functions';
import { color } from '../../assets/AppStyles';

export default props => {

    //==============================================================
    // Declaration const and States
    //==============================================================




    //Component para Navegacao de paginas
    const [search, setSearch] = useState(false);
    const [valueSearch, setValueSearch] = useState('');
    const [listStores, setListStores] = useState([]);
    const [data, setData] = useState([]);

    const [hideTrash, setHideTrash] = useState(false);
    const [loadingTrash, setLoadingTrash] = useState(false);
    const [indexLoading, setIndexLoading] = useState(null);


    //==============================================================
    // LifeCycle
    //==============================================================

    //Executing requestCatalog when initialize
    useEffect(() => {
        listStore();
    }, [props.route.params]);

    useFocusEffect(
        React.useCallback(() => {
            listStore();
        }, [])
    );



    //==============================================================
    // OtherMethods
    //==============================================================

    // Function to list mongoDB stores
    async function listStore() {
        const infoUser = props.route.params;
        await listClients({
            find: {
                matrix_id: infoUser.matrix_id,
            }
        }
        )
            .then((resp) => {
                setListStores(resp);
                setData(resp);
            })
            .catch();
    };

    // Function delete store
    async function removeStore(id, index) {

        Alert.alert(
            "Remover Item",
            "Deseja remover o item?",
            [
                {
                    text: "Não", onPress: async () => { }
                },
                {
                    text: "Sim", onPress: async () => {

                        setIndexLoading(index);
                        setLoadingTrash(true);

                        await deleteClient({
                            _id: id,
                        })
                            .then((resp) => {
                                gFn.toastConfirm("Loja removida!");
                                console.log(resp);
                            })
                            .catch((error) => {
                                console.log(error);
                                gFn.toastConfirm("Ops! Problemas ao deletar")
                            });
                        listStore();
                        setLoadingTrash(false);
                        setHideTrash(false);
                        setIndexLoading(null);

                    }
                },
            ], { cancelable: false });

    }

    //Function to navigatio for edit info client
    function selectClient(item, index) {
        props.navigation.navigate("RegisterStore", { _id: item._id });
    };


    // Fucntion for search list Users
    function searchFilterFunction(text) {
        const newData = data.filter(item => {
            const itemData = `${item.name.toUpperCase()}   
      ${item.name.toUpperCase()} ${item.name.toUpperCase()}`;
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });
        setListStores(newData);
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
                                    CONSULTA DE LOJAS
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
                                    onPress={() => { props.navigation.navigate("RegisterStore", { _id: 0 }) }}
                                    style={styles.sTouchNewProduct}
                                >
                                    <Icon
                                        size={25}
                                        color={color.primary}
                                        name='add'
                                        type='ionicon'
                                    />
                                    <Text style={styles.sTextButtonNewProduct}>
                                        Adicionar Nova Loja
                                    </Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    }
                    data={listStores}
                    keyExtractor={item => item._id}
                    renderItem={({ item, index }) =>
                        <Card
                            onPress={() => selectClient(item, index)}
                            style={styles.sCard}
                            onLongPress={() => { setHideTrash(!hideTrash) }}
                        >

                            <View style={styles.sViewCard}>
                                <View style={styles.sListLeft}>
                                    <Icon
                                        size={20}
                                        color={"#4285F4"}
                                        name='cart'
                                        type='ionicon'
                                    />
                                </View>
                                <View style={styles.sListRight}>
                                    <Text style={styles.sText}>{item.name}</Text>
                                    <Text style={styles.sTextInfoList}> {item.companyName} </Text>
                                </View>
                                {
                                    hideTrash &&
                                    <View style={[styles.sListLeft, { paddingRight: 20, }]}>
                                        <TouchableOpacity
                                            onPress={() => { removeStore(item._id, index) }}
                                        >
                                            {
                                                (loadingTrash && indexLoading == index) ?
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
                                    </View>
                                }
                            </View>
                        </Card>
                    }
                />
            </View>
        </View>

    )
};


// <View style={styles.container}>
//             <Appbar.Header
//                 style={styles.appbar}
//             >
//                 {
//                     !search &&
//                     <Appbar.BackAction onPress={() => { props.navigation.goBack() }} />
//                 }
//                 {
//                     !search ?
//                         <Appbar.Content title="Lista de Lojas" subtitle="" />
//                         :
//                         <Searchbar
//                             autoFocus
//                             style={styles.searchbar}
//                             placeholder="Pesquisar"
//                             value={valueSearch}
//                             color="#000"
//                             iconColor="#000"
//                             placeholderTextColor="gray"
//                             icon="arrow-left"
//                             onIconPress={() => {
//                                 setSearch(!search)
//                                 setValueSearch('')
//                             }}
//                             onChangeText={(text) => { setValueSearch(text) }}

//                         />
//                 }
//                 {
//                     !search &&
//                     <Appbar.Action icon="magnify" onPress={() => {
//                         setSearch(!search)
//                     }} />
//                 }
//             </Appbar.Header>



//             <View style={styles.sViewLista}>
//                 <FlatList
//                     showsVerticalScrollIndicator={false}
//                     data={listStores}
//                     keyExtractor={item => item._id}
//                     renderItem={({ item, index }) =>
//                         <Card
//                             onPress={() => selectClient(item, index)}
//                             style={styles.sCard}
//                             onLongPress={() => { setHideTrash(!hideTrash) }}
//                         >

//                             <View style={styles.sViewCard}>
//                                 <View style={styles.sListLeft}>
//                                     <Icon
//                                         size={20}
//                                         color={"#4285F4"}
//                                         name='cart'
//                                         type='ionicon'
//                                     />
//                                 </View>
//                                 <View style={styles.sListRight}>
//                                     <Text style={styles.sText}>{item.name}</Text>
//                                     <Text style={styles.sTextInfoList}> {item.companyName} </Text>
//                                 </View>
//                                 {
//                                     hideTrash &&
//                                     <View style={[styles.sListLeft, { paddingRight: 20, }]}>
//                                         <TouchableOpacity
//                                             onPress={() => { removeStore(item._id, index) }}
//                                         >
//                                             {
//                                                 (loadingTrash && indexLoading == index) ?
//                                                     <ActivityIndicator
//                                                         size="small"
//                                                         color={color.danger}
//                                                     />
//                                                     :
//                                                     <Icon
//                                                         size={20}
//                                                         color={color.danger}
//                                                         name='trash-outline'
//                                                         type='ionicon'
//                                                     />
//                                             }
//                                         </TouchableOpacity>
//                                     </View>
//                                 }
//                             </View>
//                         </Card>
//                     }
//                 />
//             </View>
//             <View>
//                 <FAB
//                     onPress={() => { props.navigation.navigate("RegisterStore", { _id: 0 }) }}
//                     style={styles.fab}
//                     icon="plus"
//                 />
//             </View>
//         </View>