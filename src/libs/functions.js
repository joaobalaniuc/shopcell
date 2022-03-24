import { Alert, ToastAndroid } from 'react-native';
import React from 'react';

export default gFn = {


    //==============================================================
    // Function set Items in list for cart
    //==============================================================
    popUpConfirm: function () {

        return Alert.alert(
            "Remover Item",
            "Deseja remover o item?",
            [
                {
                    text: "Não", onPress: async () => {
                        return false;
                    }
                },
                {
                    text: "Sim", onPress: () => {
                        return true;
                    }
                },
            ],
            { cancelable: false }
        )
    },


    //==============================================================
    // Function to display action alert
    //==============================================================
    toastConfirm: function (message) {

        ToastAndroid.showWithGravityAndOffset(
            message,
            ToastAndroid.LONG,
            ToastAndroid.CENTER,
            25,
            50
        );
    },

    
    //==============================================================
    // Function to convert the value of the Financial String to Float format
    //==============================================================
    convertStringMoney: function (value) {

        if (value != "" && value != null && value /1 != value) {
            return ((value.replace("R$", "")).replace(/[^0-9,-]+/g, "")).replace(",", ".");
        }

        return value;
    },

    
    //==============================================================
    // Function to convert the float value to Financial String
    //==============================================================
    convertMoneyString: function (value) {
        if (value != "" && value != null) {
        } else {
            value = 0;    
        }
        return ("R$" + value.toFixed(2).replace(".", ","));
    },

    
    //==============================================================
    // Function to return formatted log console
    //==============================================================
    consoleLog: function (screen, value) {

        console.log(
            "\n\n\n====================================================================================\n",
            screen,
            "\n====================================================================================\n",
            JSON.stringify(value, null, 4),
            "\n====================================================================================\n\n\n");

    },

    
    //==============================================================
    // Function to return formatted log console
    //==============================================================
    convertDate: function (data) {
        data.hour('-03');
        data.minute('00');
        data.second('00');
        return data

    },

}