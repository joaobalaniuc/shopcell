import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { View, StyleSheet, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import React, { useState, useEffect } from 'react';
import { listClients } from '../src/services/api';
import listDrawer from './routeDrawerContent';
import { Drawer } from 'react-native-paper';
import { color } from './assets/AppStyles';
import gFn from './libs/functions'

export function DrawerContent(props) {

    //==============================================================
    // Declaration Consts and States
    //==============================================================

    const { infoUser } = props;
    const [subItemProduct, setSubItemProduct] = useState([{ visible: false, num: 0 }]);
    const [listStores, setListStores] = useState([{ _id: "", name: "" }]);
    const [selectedStore, setSelectedStore] = useState('');

    //==============================================================
    // LifeCycle
    //==============================================================

    useEffect(() => {
        // findStores();
    }, []);


    //==============================================================
    // OtherMethods
    //==============================================================

    // Function to select the bank's store list
    // async function findStores() {
    //     const { infoUser } = props;
    //     await listClients({
    //         find: {
    //             matrix_id: infoUser.matrix_id,
    //         },
    //         filter: {
    //             name: 1, 
    //         }
    //     })
    //         .then((resp) => {
    //             setListStores(resp);
    //             infoUser.store == undefined ? (infoUser.store = resp[0]._id) : (infoUser.store = infoUser.store); 
    //             setSelectedStore(infoUser.store);
    //             gFn.toastConfirm(resp)
    //         })
    //         .catch((error) => {
    //             console.log(error); 
    //         })
    // };


    //Function call Dashboard selected store
    function callDashboard() {

        infoUser.store = selectedStore;
        props.navigation.reset({
            routes: [{
                name: "SplashScreen",
                params: infoUser
            }]
        });
    };


    return (
        <View style={{ flex: 1, position: 'absolute', zIndex: 99, width: '100%' }}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <Drawer.Section style={styles.bottomDrawerSection}>


                        {
                            listDrawer.map((item, index) => {
                                return (
                                    <View key={index}>
                                        <DrawerItem
                                            icon={() => (
                                                <Icon 
                                                    name={item.icon}
                                                    color={color.primary}
                                                    size={20}
                                                />
                                            )}
                                            label={item.label}
                                            onPress={() => {
                                                (subItemProduct.num == index) ?
                                                    setSubItemProduct({
                                                        visible: !subItemProduct.visible,
                                                        num: index,
                                                    })
                                                    :
                                                    setSubItemProduct({
                                                        visible: true,
                                                        num: index,
                                                    })

                                            }}
                                        /> 
                                        {
                                            (subItemProduct.visible == true && subItemProduct.num == index) &&
                                            <View style={styles.itemList}>
                                                {
                                                    item.items.map((elem, index) => {
                                                        return (
                                                            <DrawerItem
                                                                key={index}
                                                                label={elem.name}
                                                                onPress={() => {
                                                                    props.navigation.navigate(elem.action, { action: elem.func })
                                                                }}
                                                            />
                                                        )
                                                    }) 
                                                }
                                            </View>
                                        }

                                    </View>
                                )
                            })
                        }
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>

            {/* <View style={{ padding: 10 }}>
                <Text style={styles.sTextTitleSelected}>
                    Loja Selecionada
                </Text>
                <View style={styles.sViewPicker}>
                    <Picker
                        style={{ color: 'gray' }}
                        dropdownIconColor='gray'
                        selectedValue={selectedStore}
                        onValueChange={(store) => { setSelectedStore(store) }}>
                        {
                            listStores.map((item) => {
                                return (
                                    <Picker.Item key={item._id} label={item.name} value={item._id} />
                                )
                            })
                        }
                    </Picker>
                </View>

                <View>
                    {
                        ((infoUser.store != undefined) && (infoUser.store != selectedStore)) &&
                        <TouchableOpacity
                            style={styles.sButtonSelectStore}
                            onPress={() => { callDashboard() }}>
                            <Text style={styles.sTextSelectStore}>
                                Alterar loja
                            </Text>
                        </TouchableOpacity>
                    }
                </View>
            </View> */}

        </View >
    );
}


const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
        width: '100%',
    },

    sViewPicker: {
        marginTop: 10,
        borderRadius: 15,
        borderColor: 'gray',
        borderWidth: 1,
        padding: 5,
        height: 35,
        justifyContent: 'center',
    },

    sTextTitleSelected: {
        color: 'gray',
        fontWeight: 'bold'
    },

    sButtonSelectStore: {
        marginTop: 10,
        backgroundColor: color.success,
        alignItems: 'center',
        justifyContent: 'center',
        height: 35,
        borderRadius: 15,
    },

    sTextSelectStore: {
        fontWeight: 'bold',
        color: color.light,
    },

    bottomDrawerSection: {
        marginTop: 15,
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1,
    },

    itemList: {
        paddingLeft: '10%',
        borderBottomColor: '#d3d3d3',
        borderBottomWidth: 1,
    }
});