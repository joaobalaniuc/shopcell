import { Text, View, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Card, FAB } from 'react-native-paper';
import styles from '../../../container/ListProducts/styles';
import { listProducts } from '../../../services/api';


export default props => {

    //==============================================================
    //  Declarations consts and states
    //==============================================================

    // Const receive date screen
    const { infoUser } = props;

    const [list, setList] = useState();


    //==============================================================
    // OtherMethods
    //==============================================================
    //Fucntion list bd products
    async function requestListProducts() {
        await listProducts({
            matrix_id: infoUser.matrix_id,
        })
            .then((resp) => {
                setList(resp);
            })
            .catch((error) => {
                console.log("Esse é o erro:\n", error);
            })
    };

    // function add component details
    function componentDetails() {
        // <DetailsProducts/>
        console.log("Testando");
    }

    //==============================================================
    // LifeCycle
    //==============================================================

    useEffect(() => {
        requestListProducts();
    }, []);

    //==============================================================
    // Render
    //==============================================================

    return (
        <View style={styles.container}>
            <View style={styles.sViewLista}>
                <FlatList
                    data={list}
                    keyExtractor={item => item._id}
                    renderItem={({ item }) =>
                        <Card
                            onPress={() => { componentDetails() }}
                            style={styles.sCard}
                        >
                            <View style={styles.sViewCard}>
                                <View style={styles.sListRight}>
                                    <Text style={styles.sText}>
                                        {
                                            (item.title === undefined) ?
                                                ""
                                                : (item.title.length <= 11) ?
                                                    item.title
                                                    :
                                                    item.title.substring(0, 40) + "..."
                                        }
                                    </Text>
                                    <Text style={styles.sTextInfoList}> {item.group} </Text>
                                </View>
                            </View>
                        </Card>
                    }
                />
            </View>
        </View>
    )
};
