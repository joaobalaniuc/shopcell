import React, { useRef, useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    Alert,
    ActivityIndicator,
} from 'react-native';
import { addGroup, updateGroup, findGroup } from '../../services/api';
import { useFocusEffect } from '@react-navigation/native';
import { color } from '../../assets/AppStyles';
import { Icon } from 'react-native-elements';
import { Card, TextInput } from 'react-native-paper';
import styles from './styles';

import gFn from '../../libs/functions';

export default function RegisterGroupsProduct(props) {


    //==============================================================
    // Declaration consts and states
    //==============================================================


    //State for spin loading button
    const [loading, setLoading] = useState(false);

    //Declaration for reference in next focus textInput
    const nome = useRef();
    const descricao = useRef();

    const [loadingTrash, setLoadingTrash] = useState(false);
    const [loadingIndex, setLoadingIndex] = useState('');

    //Declaration states for const
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [operation, setOperation] = useState('');
    const [infosUser, setInfosUser] = useState('');
    const [item, setItem] = useState([]);
    const [hideTrash, setHideTrash] = useState(false);
    const [hide, setHide] = useState(false);
    const [subgroups, setSubgroups] = useState([{ title: "" }]);




    //==============================================================
    // LifeCycle
    //==============================================================

    useEffect(() => {

        // Receive data info user for ListGroups
        const { operation, item, infoUser } = props.route.params;

        if (operation == 1) {
            setOperation(operation);
            setInfosUser(infoUser);
            setTitle(item.title);
            setDescription(item.description);
            setItem(item);
            listDataGroups(item._id);
        } else {
            setSubgroups([{ title: "" }]);
            setInfosUser(infoUser);
            setItem(item);
            setOperation(0);
            setTitle('');
            setDescription('');
        };

    }, [props.route.params]);

    useFocusEffect(
        React.useCallback(() => {
            const { item, infoUser, operation } = props.route.params;


            if (operation == 1) {
                listDataGroups(item._id);
            } else {
                setSubgroups([{ title: "" }])
                setInfosUser(infoUser);
                setItem(item);
                setOperation(0);
                setTitle('');
                setDescription('');
            }
        }, [props.route.params])
    );


    //==============================================================
    // OtherMethods
    //==============================================================

    // Function list data groups
    async function listDataGroups(id) {

        await findGroup({
            _id: id
        })
            .then((resp) => {
                setItem(resp);
                setSubgroups(resp.subgroups);

            })
            .catch((error) => {
                gFn.consoleLog("listDataGroupError: ", error);
            });
    };

    //Function save and update product
    function saveProvider() {

        setLoading(true);

        if (operation == 1) {
            updateGroup({
                _id: item._id,
                groupData: {
                    title: title,
                    description: description,
                }
            })
                .then((resp) => {
                    setLoading(false);
                    props.navigation.goBack();
                })
                .catch((error) => {
                    setLoading(false);
                    props.navigaiton.goBack();
                });
        } else {

            addGroup({
                matrix_id: infosUser.matrix_id,
                title: title,
                description: description,
                product: true,
                service: false,
                subgroups: [],
            })
                .then((resp) => {
                    setLoading(false);
                    props.navigation.goBack();
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    // Function delete subgroup
    async function deleteItem(id, index) {


        const currentSubGroup = item.subgroups;
        currentSubGroup.splice(index, 1);

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

                        updateGroup({
                            _id: id,
                            groupData: {
                                subgroups: currentSubGroup,
                            }
                        })
                            .then((resp) => {
                                console.log(resp);

                                gFn.toastConfirm("Atualizado com sucesso!");
                            })
                            .catch((error) => {
                                console.log(error);
                            });

                        setLoadingTrash(false);
                        setHideTrash(false);
                    }
                },
            ], { cancelable: false });
    }

    const Sub = function listSubitems() {
        let teste = subgroups.map((elem, index) => {
            return (
                <Card
                    key={index} style={styles.sCard}
                    onPress={() => { props.navigation.navigate("RegisterSubGroupsProduct", { operation: 1, _id: item._id, item: item.subgroups, subGroup: elem }) }}
                    onLongPress={() => { setHideTrash(!hideTrash) }}
                >
                    <View style={styles.sViewCard}>
                        <View style={styles.sListRight}>
                            <Text style={styles.sText}>{elem.title}</Text>
                        </View>
                        <View style={[styles.sListRight, { alignItems: 'flex-end', paddingRight: 20, }]}>
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
            )
        });
        return teste;
    }

    //==============================================================
    // Render
    //==============================================================

    return (

        <SafeAreaView>
            <ScrollView showsVerticalScrollIndicator={false}>

                <View style={styles.container}>
                    <View style={styles.layout}>

                        <View style={styles.element}>
                            <TextInput
                                value={title}
                                label="Nome do grupo"
                                ref={nome}
                                returnKeyType="next"
                                blurOnSubmit={false}
                                onSubmitEditing={() => { descricao.current.focus(); }}
                                mode='outlined'
                                theme={{ colors: { primary: color.primary } }}
                                onChangeText={(text) => { setTitle(text) }}
                                style={{ height: 46 }}
                            />
                        </View>

                        <View style={styles.element}>
                            <TextInput
                                value={description}
                                label="Descrição"
                                ref={descricao}
                                multiline={true}
                                mode='outlined'
                                onChangeText={(text) => { setDescription(text) }}

                                numberOfLines={5}
                                theme={{ colors: { primary: color.primary } }}
                            />
                        </View>

                        {
                            (operation == 1) &&
                            <View style={styles.sViewButton}>
                                <TouchableOpacity
                                    onPress={() => { props.navigation.navigate("RegisterSubGroupsProduct", { operation: 0, _id: item._id, item: item.subgroups, subGroup: {} }) }}
                                    style={styles.sTouchNewProduct}
                                >
                                    <Icon
                                        size={25}
                                        color={color.primary}
                                        name='add'
                                        type='ionicon'
                                    />

                                    <Text style={styles.sTextButtonNewProduct}>
                                        Adicionar Novo SubGrupo
                                </Text>
                                </TouchableOpacity>
                            </View>
                        }

                        <View style={styles.element}>
                            <Sub />
                        </View>

                        <View style={styles.areaButton}>
                            <TouchableOpacity
                                disabled={loading}
                                onPress={() => { saveProvider() }}
                                style={styles.touchable}
                            >
                                {
                                    !loading ?
                                        <Text style={styles.textTouch}>
                                            Salvar
                                        </Text>
                                        :
                                        <ActivityIndicator
                                            size="small"
                                            color="#fff"
                                        />
                                }
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};
