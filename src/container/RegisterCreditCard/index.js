import {
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    FlatList,
    TextInput,
    Alert,
} from 'react-native';
import { addPMethod, updatePMethod } from '../../services/api';
import React, { useState, useEffect } from 'react';
import { color } from '../../assets/AppStyles';
import { Card, FAB, Appbar } from 'react-native-paper';
import { Icon } from 'react-native-elements';
import styles from './styles';


export default function RegisterSale(props) {

    //==============================================================
    //Declaration const and States
    //==============================================================

    const { matrix_id, condition, typeCredit } = props.route.params;

    const [_id, set_id] = useState('');
    const [descriptionCard, setDescriptionCard] = useState('');
    const [parcel, setParcel] = useState('');
    const [descParcel, setDescParcel] = useState('');
    const [tax, setTax] = useState([]);
    const [iconDelete, setIconDelete] = useState(false);
    const [hideItem, setHideItem] = useState(false);
    const [addTaxVisible, setAddTaxVisible] = useState(false);



    //==============================================================
    //LifeCycle
    //==============================================================

    useEffect(() => {
        previewItens();
    }, [props.route.params]);


    //==============================================================
    //OtherMethods
    //==============================================================

    // Function validation click item list
    function previewItens() {
        try {
            const { item } = props.route.params;
            setTax(item.fees);
            setDescriptionCard(item.title);
            set_id(item._id);
        } catch (error) {
            console.log(error);
        }
        const { condition } = props.route.params;

        console.log(condition);

        if (condition === 0) {
            setTax([]);
            setDescriptionCard('');
        }
    }

    // Function save Credit Card and fees
    function saveCreditCard() {

        const receiveTax = tax;

        if (!parcel == '' && !descParcel == '') {

            setAddTaxVisible(!addTaxVisible);
            receiveTax.push({
                description: descParcel,
                fee: parcel,
            });

            setTax(receiveTax);
            setParcel('');
            setDescParcel('');
        } else {
            setAddTaxVisible(!addTaxVisible);
        }
    }


    // Function delete item list Rate
    function deleteItem(item, index) {
        const listTax = tax;

        Alert.alert(
            "Remover Item",
            "Deseja remover o item?",
            [
                {
                    text: "Não",
                },
                {
                    text: "Sim", onPress: async () => {

                        setLoading(true);

                        listTax.splice(index, 1);
                        setTax(listTax);

                    }
                },
            ],
            { cancelable: false }
        );
    }

    // Function Register Credit Card
    async function RegisterCreditCard() {

        if (condition === 0) {
            await addPMethod({
                matrix_id: matrix_id,
                title: descriptionCard,
                type: typeCredit,
                fees: tax,
            })
                .then((resp) => {
                    console.log(resp);
                    props.navigation.goBack();
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            await updatePMethod({
                _id: _id,
                paymentMethodData: {
                    title: descriptionCard,
                    type: typeCredit,
                    fees: tax,
                }
            })
                .then((resp) => {
                    console.log(resp);
                    props.navigation.goBack();
                })
                .catch((error) => {
                    console.log(error);
                });
        }

        setTax([]);
        setDescriptionCard([]);
    }

    //==============================================================
    // Render
    //==============================================================

    return (
        <SafeAreaView style={{ flex: 1 }}>

            <Appbar.Header style={styles.appbar}>
                <Appbar.BackAction onPress={() => { props.navigation.goBack() }} />
                <Appbar.Content title="Adicionar" subtitle="" />
            </Appbar.Header>

            <View style={styles.container}>
                <View style={styles.sViewCard}>
                    <FlatList
                        ListHeaderComponent={
                            <View style={styles.modalize}>
                                <View style={styles.itemModalize}>
                                    <View style={styles.viewTitleModalize}>
                                        <Text style={styles.sTextCustomer}>
                                            Nova Descrição
                                        </Text>
                                    </View>
                                    <View style={styles.viewNewCard}>
                                        <View>
                                            <Text style={styles.textSubTitle}>
                                                Tìtulo
                                        </Text>
                                        </View>
                                        <View>
                                            <TextInput
                                                editable={tax == ''}
                                                style={styles.inputDesc}
                                                placeholder="Descrição ou nome"
                                                value={descriptionCard}
                                                onChangeText={(text) => setDescriptionCard(text)}
                                            />
                                        </View>
                                    </View>

                                    {
                                        (!addTaxVisible && descriptionCard != '') &&
                                        <View style={styles.viewNewTax}>
                                            <View>
                                                <Text style={styles.textSubTitle}>
                                                    Taxas
                                            </Text>
                                            </View>

                                            <TouchableOpacity
                                                style={styles.touchNewProduct}
                                                onPress={() => { setAddTaxVisible(!addTaxVisible) }}
                                            >
                                                <Icon
                                                    size={25}
                                                    color={color.primary}
                                                    name='add-outline'
                                                    type='ionicon'
                                                />
                                            </TouchableOpacity>
                                        </View>
                                    }

                                    {
                                        addTaxVisible &&
                                        <View style={styles.viewTax}>
                                            <View style={styles.viewDescTax}>
                                                <Text style={styles.sText}>
                                                    Descrição
                                            </Text>
                                                <TextInput
                                                    keyboardType="default"
                                                    style={styles.textTax}
                                                    value={descParcel}
                                                    onChangeText={(text) => setDescParcel(text)}
                                                />
                                            </View>

                                            <View style={styles.textInputTax}>

                                                <View style={styles.viewItensTax}>
                                                    <Text style={styles.sText}>
                                                        Taxa em Percentual
                                            </Text>
                                                    <TextInput
                                                        maxLength={5}
                                                        placeholder="%"
                                                        keyboardType="numeric"
                                                        style={styles.textTax}
                                                        value={parcel}
                                                        onChangeText={(text) => setParcel(text)}
                                                    />

                                                </View>

                                                <View style={styles.viewItensTax1}>
                                                    <TouchableOpacity
                                                        style={styles.touchOkProduct}
                                                        onPress={() => { saveCreditCard() }}
                                                    >
                                                        <Text style={[styles.textSubTitle, { color: color.primary }]}>
                                                            OK
                                                        </Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </View>
                                    }

                                </View>
                            </View>
                        }
                        data={tax}
                        keyExtractor={tax => tax.description}
                        renderItem={({ item, index }) =>

                            <Card
                                style={styles.sCard}
                                onPress={() => { setIconDelete(!iconDelete) }}
                            >
                                <View style={styles.viewTaxList}>
                                    <View style={styles.viewDescTax}>
                                        <Text style={styles.textDescriptionList}>
                                            {item.description}
                                        </Text>
                                        <Text style={styles.textTitle}>
                                            {descriptionCard}
                                        </Text>
                                    </View>

                                    {
                                        iconDelete ?
                                            <TouchableOpacity
                                                onPress={() => { deleteItem(item, index) }}
                                                style={styles.touchDelete}
                                            >
                                                <Icon
                                                    size={20}
                                                    color='red'
                                                    name='trash-outline'
                                                    type='ionicon'
                                                />
                                            </TouchableOpacity>
                                            :
                                            <View style={styles.viewDescTax}>
                                                <Text>
                                                    {item.fee}%
                                                </Text>
                                            </View>
                                    }

                                </View>
                            </Card>
                        }
                    />
                </View>
                {
                    (tax.length != 0) &&
                    <FAB
                        onPress={() => { RegisterCreditCard() }}
                        style={styles.fab}
                        icon="check"
                    />
                }
            </View>
        </SafeAreaView>
    );
};
