import DateTimePicker from '@react-native-community/datetimepicker';
import { Text, View, FlatList, TouchableOpacity } from 'react-native';
import { Chip, Card, Searchbar } from 'react-native-paper';
import React, { useEffect, useState, useRef } from 'react';
import { Picker } from '@react-native-picker/picker';
import { Modalize } from 'react-native-modalize';
import { transations } from '../../services/api';
import { color } from '../../assets/AppStyles';
import { Icon } from 'react-native-elements';
import gFn from '../../libs/functions';
import styles from './styles';
import Moment from 'moment';

export default props => {


    //==============================================================
    //Declaration const and States
    //==============================================================

    const infoUser = props.route.params;
    const modalizeDate = useRef(null);

    const [loading, setLoading] = useState(false);
    const [listTransations, setListTransations] = useState([]);

    const [descriptionChip, setDescriptionChip] = useState('Hoje');
    const [date, setDate] = useState(new Date());
    const [startDate, setStartDate] = useState(date);
    const [endDate, setEndDate] = useState(date);


    const [showStartDate, setShowStartDate] = useState(false);
    const [showEndDate, setShowEndDate] = useState(false);
    const [typePayment, setTypePayment] = useState(0);
    const [listPayments, setListPayments] = useState([
        { _id: 0, title: "Todos" },
        { _id: 1, title: "Dinheiro" },
        { _id: 2, title: "Boleto" },
        { _id: 3, title: "Cartão de Crédito" },
        { _id: 4, title: "Crediário" },
    ]);



    //==============================================================
    //LifeCycle
    //==============================================================

    useEffect(() => {
        findListSale();
    }, []);

    //==============================================================
    //OtherMethods
    //==============================================================

    //Function navigation Create a Grid Product
    function navigationRegisterGridProduct() {
        props.navigation.navigate("ListClients", "RegisterSale");
    }

    //Function navigation Create a Grid Product 
    function findListSale() {
        setLoading(true);


        const atualDate = new Date();
        const mili = 1000 * 60 * 60 * 24;

        transations({
            matrix_id: infoUser.matrix_id,
            filterDate: {
                startDate: new Date(atualDate.getTime() - 30 * mili),
                endDate: atualDate,
            }
        })
            .then((resp) => {
                setListTransations(resp);
            })
            .catch((error) => {
                console.log("Error: ", error);
            })
    }

    //Navigation details sale
    function navigationDetailsSale(item) {
        props.navigation.navigate("DetailsTransations", { item });
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

    function searchDate(number, description) {
        setDescriptionChip(description);


        if (gFn.convertDate(Moment()) > gFn.convertDate(Moment()).add(number, 'days')) {
            setStartDate(new Date(gFn.convertDate(Moment()).add(number, 'days')));
            setEndDate(new Date(gFn.convertDate(Moment())));
        } else {
            setStartDate(new Date(gFn.convertDate(Moment())));
            setEndDate(new Date(gFn.convertDate(Moment()).add(number, 'days')));
        }

        modalizeDate.current?.close();
    };

    const onChangeDate = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowStartDate(false);
        setStartDate(currentDate);
    };

    const onChangeEndDate = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowEndDate(false);
        setEndDate(currentDate);
    };

    function filter() {
        console.log(startDate);
        console.log(endDate);
    }

    //==============================================================
    //Render
    //==============================================================


    return (
        <View style={styles.container}>
            <View style={styles.sViewLista}>
                <FlatList
                    ListHeaderComponent={
                        <View style={styles.viewHeader}>

                            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={styles.sTextTitle}>
                                    CONSULTA DE VENDAS
                                </Text>
                            </View>

                            <View style={styles.viewSearch}>
                                <Searchbar
                                    // autoFocus 
                                    style={styles.searchbar}
                                    placeholder="Pesquisar"
                                    color={color.tertiary}
                                    iconColor={color.tertiary}
                                    placeholderTextColor="gray"
                                    onIconPress={() => {
                                        setSearch(!search)
                                        setValueSearch('')
                                    }}
                                    onChangeText={(text) => { searchFilterFunction(text) }}

                                />
                            </View>

                            <View style={styles.viewChip}>
                                <Chip
                                    style={styles.chip}
                                    icon="chevron-up"
                                    onPress={() => modalizeDate.current?.open()}>
                                    {descriptionChip}
                                </Chip>

                                <View style={styles.dropdwonFlag}>
                                    <Picker
                                        selectedValue={typePayment}
                                        onValueChange={
                                            (itemValue) => setTypePayment(itemValue)
                                        }>
                                        {
                                            listPayments.map((item, index) => {
                                                return <Picker.Item key={index} value={item._id} label={item.title} />
                                            })
                                        }
                                    </Picker>
                                </View>

                            </View>
                        </View>
                    }
                    data={listTransations}
                    keyExtractor={item => item._id}
                    renderItem={({ item }) =>
                        <Card
                            onPress={() => { navigationDetailsSale(item) }}
                            style={styles.sCard}
                        >

                            <View style={styles.sViewCard}>

                                <View style={[styles.sListRight, { flex: 0.2, alignItems: 'center' }]}>
                                    <Icon
                                        size={20}
                                        color={color.tertiary}
                                        name='pricetag-outline'
                                        type='ionicon'
                                    />
                                </View>

                                <View style={styles.sListRight}>
                                    <Text style={styles.sTextInfoList}>
                                        {
                                            item.updatedAt != undefined ? Moment(item.updatedAt).format("hh:mm") : "Sem Título"
                                        }
                                    </Text>
                                    <Text style={styles.sText}>
                                        José Pereira
                                    </Text>
                                    <Text style={styles.sTextInfoList}>
                                        Vendedor
                                    </Text>

                                </View>

                                <View style={[styles.sListRight, { flex: 0.5, alignItems: 'flex-end', paddingRight: 20, }]}>
                                    <Text style={[styles.sText, { fontSize: 14 }]}>
                                        {
                                            item.value != undefined ? gFn.convertMoneyString(item.value) : ""
                                        }
                                    </Text>
                                    <Text style={styles.sTextInfoList}>
                                        {
                                            item.updatedAt != undefined ? Moment(item.updatedAt).format("DD/MM/YYYY") : "Sem Título"
                                        }
                                    </Text>
                                    <Text style={styles.sTextInfoList}>
                                        Tipo da venda
                                    </Text>
                                </View>
                            </View>
                        </Card>
                    }
                    ListFooterComponent={
                        <View style={styles.viewFoot}>
                            <View style={styles.viewValues}>
                                <Text style={styles.sText}>
                                    Valor Bruto:
                                </Text>
                                <Text>
                                    R$10.232,23
                                </Text>
                            </View>

                            <View style={styles.viewValues}>
                                <Text style={styles.sText}>
                                    Valor Liquído:
                                </Text>
                                <Text>
                                    R$12.232,23
                                </Text>
                            </View>

                            <View style={styles.viewValues}>
                                <Text style={styles.sText}>
                                    Desconto:
                                </Text>
                                <Text>
                                    R$2.652,23
                                </Text>
                            </View>

                            <View style={styles.viewValues}>
                                <Text style={styles.sText}>
                                    Transferência:
                                </Text>
                                <Text>
                                    R$1.433,23
                               f </Text>
                            </View>
                        </View>
                    }
                />
            </View>



            <Modalize
                ref={modalizeDate}
                snapPoint={400}
                modalHeight={600}
            >
                <View style={styles.modalize}>
                    <View style={styles.itemModalize}>
                        <View style={styles.viewDesc}>
                            <Text style={styles.textTitleDisc}>
                                Escolha o período
                            </Text>
                        </View>

                        <View style={[styles.viewChip, { justifyContent: 'flex-start' }]}>
                            <Chip
                                style={styles.chip}
                                icon="chevron-up"
                                onPress={() => { searchDate(1, 'Hoje') }}>
                                Hoje
                            </Chip>
                            <Chip
                                style={styles.chip}
                                icon="chevron-up"
                                onPress={() => { searchDate(-7, '7 Dias') }}>
                                7 Dias
                            </Chip>
                            <Chip
                                style={styles.chip}
                                icon="chevron-up"
                                onPress={() => { searchDate(-15, '15 Dias') }}>
                                15 Dias
                            </Chip>
                            <Chip
                                style={styles.chip}
                                icon="chevron-up"
                                onPress={() => { searchDate(-30, '30 Dias') }}>
                                30 Dias
                            </Chip>
                        </View>


                        <View style={styles.viewDescData}>
                            <Text style={styles.textInfo}>
                                Ou informe uma data
                            </Text>
                        </View>

                        <View>

                            <View style={styles.body}>
                                <View style={styles.viewTitleDate}>
                                    <Text style={styles.textTitleDisc}>
                                        Data Inicial
                                    </Text>
                                </View>
                                <View style={styles.viewTitleDate}>
                                    <Text style={styles.textTitleDisc}>
                                        Data Final
                                    </Text>
                                </View>
                            </View>


                            <View style={styles.body}>
                                <TouchableOpacity onPress={() => { setShowStartDate(!showStartDate) }} style={styles.touchDate}>
                                    <Text>
                                        {Moment(startDate).format("DD/MM/YYYY")}
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => { setShowEndDate(!showEndDate) }} style={styles.touchDate}>
                                    <Text>
                                        {Moment(endDate).format("DD/MM/YYYY")}
                                    </Text>
                                </TouchableOpacity>

                                {
                                    showStartDate &&
                                    <DateTimePicker
                                        testID="dateTimePicker"
                                        value={startDate}
                                        mode='date'
                                        maximumDate={new Date()}
                                        is24Hour={true}
                                        display="default"
                                        onChange={onChangeDate}
                                    />
                                }

                                {
                                    showEndDate &&
                                    <DateTimePicker
                                        testID="dateTimePicker"
                                        value={endDate}
                                        mode='date'
                                        maximumDate={new Date()}
                                        is24Hour={true}
                                        display="default"
                                        onChange={onChangeEndDate}
                                    />
                                }
                            </View>

                            <View style={styles.viewDesc}>
                                <Text style={styles.textInfo}>
                                    Consulte entre os últimos 24 meses e a data atual
                                </Text>
                            </View>

                            <View style={[styles.viewDesc, { padding: 3 }]}>
                                <TouchableOpacity
                                    onPress={() => { filter() }}
                                    style={styles.touchFilterDate}
                                >
                                    <Text style={[styles.textTitleDisc, { color: color.light }]}>
                                        Filtrar
                                    </Text>
                                </TouchableOpacity>
                            </View>


                        </View>


                    </View>
                </View>
            </Modalize>


        </View>

    )
};

