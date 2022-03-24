import { View, Text, FlatList, SafeAreaView, StatusBar } from 'react-native';
import { color } from '../../assets/AppStyles';
import { Icon } from 'react-native-elements';
import { Card } from 'react-native-paper';
import styles from './styles';
import React from 'react';

export default function Product(props) {


    //==============================================================
    // Declaration const and States
    //==============================================================


    const { infosUser } = props.route.params;

    //==============================================================
    // OtherMethods
    //==============================================================

    //Function navigate for Register Product
    function navigationRegister() {
        props.navigation.navigate("RegisterProduct", { condition: 0, infosUser });
    };


    const actions = [
        {
            title: "Consulta",
            icon: "search-circle-outline",
            action: "ListProducts",
            params: {},
        },
        {
            title: "Cadastro",
            icon: "add-outline",
            action: "RegisterProduct",
            params: { condition: 0, infosUser }
        },
        {
            title: "Gestão de Estoque",
            icon: "cart-outline",
            action: "InventoryManagement",
            params: {},
        },
        {
            title: "Grupos",
            icon: "layers-outline",
            action: "ListGroups" ,
            params: {},
        },
        {
            title: "Famílias",
            icon: "flag-outline", 
            action: "ListFamilyProduct",
            params: {},
        },
        {
            title: "Grades",
            icon: "grid-outline", 
            action: "ListGrids",
            params: {},
        },
        // {
        //     title: "Estoque", 
        //     icon: "library-outline",
        //     action: "ListProviders" 
        // },
    ];
    //==============================================================
    // Render
    //==============================================================

    return (

        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={color.primary} />
            <View style={styles.container}>


                <FlatList
                    data={actions}
                    numColumns='2'
                    keyExtractor={actions => actions.title}
                    renderItem={({ item }) =>
                        <Card
                            style={styles.itemCard}
                            onPress={() => { props.navigation.navigate(item.action, item.params) }}
                        >
                            <View style={styles.viewCard}>
                                <Icon
                                    size={50}
                                    color={color.primary}
                                    name={item.icon}
                                    type="ionicon"
                                />
                                <Text style={styles.textCard}>
                                    {item.title}
                                </Text>
                            </View>
                        </Card>
                    }
                />
            </View>
        </SafeAreaView>
    );
};