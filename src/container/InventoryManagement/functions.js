import { addTransation, addStock, updateStock, updateProduct } from '../../services/api';
import gFn from '../../libs/functions';

state = {
    itemsCart: [],
    itemsCartOnlyId: [],
}

export default fn = {


    //==============================================================
    // Functions to perform actions on the backend (MongoDB)
    //==============================================================

    selectProducts: function () {
        return state.itemsCart;
    },

    insertProducts: async function (info, operation, toId, date) {


        var totalValue = 1;

        state.itemsCartOnlyId.map((item) => {
            totalValue += parseFloat(item.value);
        });

        console.log("Saving!");

        if (operation == "entry") {

            // In case it is entered

            var countItems = 0;

            // Is to run the range of selected products
            for (countItems; countItems < state.itemsCartOnlyId.length; countItems++) {

                const loopFor = state.itemsCart[countItems].quantity;
                var i = 0;
                //go to get all registered properties
                for (i; i < loopFor; i++) {

                    // Adding Stock of the product in the store
                    await addStock({
                        product_id: state.itemsCart[countItems].product._id,
                        client_id: toId,
                        type: operation,
                        color: "602ea73103cb0bae0e241c87",
                        grade: "602ea73103cb0bae0e241c87",
                        imei: state.itemsCart[countItems].listImeis[i] != undefined ? state.itemsCart[countItems].listImeis[i] : "",
                        prices: {
                            cost: {
                                currency: "R$",
                                value: gFn.convertStringMoney(state.itemsCart[countItems].costPrice),
                            },
                            retail: {
                                currency: "R$",
                                value: gFn.convertStringMoney(state.itemsCart[countItems].salePrice),
                            },
                            wholesale: {
                                currency: "R$",
                                value: gFn.convertStringMoney(state.itemsCart[countItems].wholeSalePrice),
                            },
                            average: {
                                currency: "R$",
                                value: gFn.convertStringMoney(state.itemsCart[countItems].averagePrice),
                            },
                        }
                    });


                    //Update price product
                    await updateProduct({
                        _id: state.itemsCart[countItems].product._id,
                        productData: {
                            price: gFn.convertStringMoney(state.itemsCart[countItems].costPrice),
                            retailPrice: gFn.convertStringMoney(state.itemsCart[countItems].salePrice),
                            wholeSalePrice: gFn.convertStringMoney(state.itemsCart[countItems].wholeSalePrice),
                        }
                    })
                        .then(async (resp) => {

                        })
                        .catch((error) => {

                        });
                }
            }
        } else {
            // In case of departure or transfer


            const quantityProducts = state.itemsCart.length;
            var i = 0;

            for (i; i < quantityProducts; i++) {

                quantityItems = parseInt(state.itemsCart[i].quantity);
                var j = 0;

                for (j; j < quantityItems; j++) {

                    // Updating store Stock data 
                    await updateStock({
                        _id: state.itemsCart[i].listIds[j]._id,
                        stockData: {
                            client_id: toId,
                        }
                    })
                        .then(async (resp) => {
                            console.log(resp);
                        })
                        .catch((error) => {
                            console.log(error);
                        });

                    //Update price product
                    await updateProduct({
                        _id: state.itemsCart[i].product._id,
                        productData: {
                            price: gFn.convertStringMoney(state.itemsCart[i].costPrice),
                            retailPrice: gFn.convertStringMoney(state.itemsCart[i].salePrice),
                            wholeSalePrice: gFn.convertStringMoney(state.itemsCart[i].wholeSalePrice),
                        }
                    })
                        .then(async (resp) => {
                            console.log(resp)
                        })
                        .catch((error) => {
                            console.log(error)
                        });

                };
            };
        };

        // Adding the sale to the billing transaction
        await addTransation({
            matrix_id: info.matrix_id,
            user_id: info._id,
            type: operation,
            target: state.itemsCartOnlyId,
            from: info.store,
            to: toId,
            status: '',
            comment: '',
            date: date,
            value: totalValue,
        })
            .then((resp) => {
                gFn.toastConfirm("Salvo com Sucesso!");
                state.itemsCart = [];
                state.itemsCartOnlyId = [];
                return ("Sucess");
            })
            .catch((error) => {
                console.log("Error: ", error);
                gFn.toastConfirm("Ops! Tivemos problemas, tente novamente!");
                return ("Error");
            })
    },



    //==============================================================
    // Functions to perform iterations on the list in the application
    //==============================================================

    deleteProducts: async function (index) {

        const currentItems = state.itemsCart;
        const currentItemsOnlyId = state.itemsCartOnlyId;
        currentItems.splice(index, 1);
        currentItemsOnlyId.splice(index, 1);
        state = ({
            itemsCart: currentItems,
            itemsCartOnlyId: currentItemsOnlyId,
        });
        gFn.toastConfirm("Item Deletado!");

    },

    addProducts: function (item) {

        const currentItems = state.itemsCart;
        const currentItemsOnlyId = state.itemsCartOnlyId;

        currentItems.push(item);
        currentItemsOnlyId.push({
            product_id: item.product._id,
            quantity: item.quantity,
            value: gFn.convertStringMoney(item.costPrice),
        });

        state = ({ itemsCart: currentItems, itemsCartOnlyId: currentItemsOnlyId });

    },

}