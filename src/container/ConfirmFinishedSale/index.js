import {
    View,
    Text,
    SafeAreaView,
} from 'react-native';
import React, { useEffect } from 'react';
import styles from './styles';


export default props => {

    //==============================================================
    //Declaration const and States
    //==============================================================


    //==============================================================
    //LifeCycle
    //==============================================================

    useEffect(() => {
        setTimeout(function () {
            props.navigation.reset({
                routes: [{
                    name: "Dashboard",
                }]
            }); 
        }, 3000);
    }, []);

    //==============================================================
    //OtherMethods
    //==============================================================

    //Function finish sale
    function finishSale() {
        props.navigation.navigate("ListSale");
    }

    //==============================================================
    //Render
    //==============================================================

    return (

        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <Text>
                    Venda finalizada!
                </Text>
            </View>
        </SafeAreaView>
    );
};
