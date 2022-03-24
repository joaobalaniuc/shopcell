import { Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { countStock } from '../../../services/api';
import styles from './styles';
import Product from '../../../container/Product';


export default props => {

    //==============================================================
    //  Declarations consts and states
    //==============================================================

    const [details, setDetails] = useState([]);

    //==============================================================
    // OtherMethods
    //==============================================================

    //Fucntion list bd products
    async function requestDetailsProduct() {
        await countStock({
            find: {
                client_id: "",
                product_id: "",
            }
        })
            .then((resp) => {
                setDetails(resp);
            })
            .catch((error) => {
                console.log("Erro na listagem dos detalhes:\n", error);
            })
    };

    //==============================================================
    // LifeCycle
    //==============================================================

    //Executing requestCatalog when initialize
    useEffect(() => {
        requestDetailsProduct();
    }, []);


    //==============================================================
    // Render
    //==============================================================

    return (
        <View style={styles.container}>
            <Text>
                Isso são os detalhes
           </Text>
        </View>
    )
};