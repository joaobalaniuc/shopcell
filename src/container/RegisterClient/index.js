import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    TextInput,
    ScrollView,
    ActivityIndicator,
    KeyboardAvoidingView,
} from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import { useNavigation } from '@react-navigation/native';
import { addSubject, updateSubject } from '../../services/api';
import gFn from '../../libs/functions';
import styles from './styles';

export default function RegisterClient(props) {


    //==============================================================
    // Declarations const and states
    //==============================================================

    //State for spin loading button
    const [isLoginLoading, setIsLoginLoading] = useState(false);

    const { action, infoUser } = props.route.params;

    //Declaration for reference in next focus textInput
    const razaoNext = useRef();
    const cnpjNext = useRef();
    const rua = useRef();
    const numero = useRef();
    const bairro = useRef();
    const cepNext = useRef();
    const cidade = useRef();
    const estado = useRef();
    const pais = useRef();
    const emailNext = useRef();
    const telefone = useRef();


    //Declaration states for const
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [razao, setRazao] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [street, setStreet] = useState('');
    const [number, setNumber] = useState('');
    const [district, setDistrict] = useState('');
    const [cep, setCep] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');



    //==============================================================
    // LifeCycle
    //==============================================================

    useEffect(() => {
        validationOperation();
    }, [props.route.params]);



    //==============================================================
    // OtherMethods
    //==============================================================

    function validationOperation() {

        const { action, item } = props.route.params;

        if (action == "EditClient") {
            setId(item._id);
            setName(item.name);
            setRazao(item.companyName);
            setCnpj(item.document);
            setEmail(item.email);
            setPhone(item.phone);
            if (item.address != undefined) {
                setStreet(item.address.street);
                setNumber(item.address.number);
                setDistrict(item.address.district);
                setCep(item.address.cep);
                setCity(item.address.city);
                setState(item.address.state);
                setCountry(item.address.country);
            }else {
                setStreet("");
                setNumber("");
                setDistrict("");
                setCep("");
                setCity("");
                setState("");
                setCountry("");
            }
        } else {
            setName('');
            setRazao('');
            setCnpj('');
            setStreet('');
            setNumber('');
            setDistrict('');
            setCep('');
            setCity('');
            setState('');
            setCountry('');
            setEmail('');
            setPhone('');
        }
    }


    //Function save product
    async function saveSubject() {

        setIsLoginLoading(true);

        if (name != "") {
            if (action == "EditClient") {
                updateSubject({
                    _id: id,
                    subjectData: {
                        name: name,
                        companyName: razao,
                        client: true,
                        provider: false,
                        transporter: false,
                        status: '',
                        document: cnpj,
                        address: {
                            street,
                            number,
                            district,
                            city,
                            cep,
                            state,
                            country,
                        },
                        email: email,
                        phone: phone,
                    }
                })
                    .then((resp) => {
                        setIsLoginLoading(false);
                        props.navigation.goBack(null);
                    })
                    .catch((error) => {
                        console.log(error);
                    });

            } else {

                setIsLoginLoading(true);
                await addSubject({
                    matrix_id: infoUser.matrix_id,
                    name: name,
                    companyName: razao,
                    client: true,
                    provider: false,
                    transporter: false,
                    status: '',
                    document: cnpj,
                    address: {
                        street,
                        number,
                        district,
                        city,
                        state,
                        cep,
                        country,
                    },
                    email: email,
                    phone: phone,

                })
                    .then((resp) => {
                        console.log("Resposta do banco ao inserir", resp);

                        if (resp.error == "This document belongs to another subject") {
                            alert("Desculpe! Já existe um cliente com o CPF - CNPJ");
                            setIsLoginLoading(false);
                        } else if (resp.error == "Subject document is required") {
                            alert("Desculpe, algumas informações importantes estão vazias!");
                            setIsLoginLoading(false);
                        } else {
                            setIsLoginLoading(false);
                            props.navigation.goBack();
                        }
                    })
                    .catch((error) => {
                        console.log(JSON.stringify(error, null, 4));
                    });
            }
        } else {
            setIsLoginLoading(false);
            alert("Nome e CPF ou CNPJ são obrigatórios!");
        }
    };

    //Const create adjust params keyboard
    const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 50


    //==============================================================
    // Render
    //==============================================================

    return (

        <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            keyboardVerticalOffset={keyboardVerticalOffset}
            style={styles.container}>
            <SafeAreaView>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.layout}>
                        <View style={styles.element}>
                            <Text style={styles.titleInput}>
                                *Nome
                            </Text>
                            <TextInput
                                value={name}
                                onChangeText={(text) => setName(text)}
                                returnKeyType="next"
                                onSubmitEditing={() => { razaoNext.current.focus(); }}
                                blurOnSubmit={false}
                                style={styles.textInput}
                                placeholder="Nome do Cliente"
                            />
                        </View>

                        <View style={styles.element}>
                            <Text
                                style={styles.titleInput}
                            >
                                Razão Social
                            </Text>
                            <TextInput
                                value={razao}
                                onChangeText={(text) => setRazao(text)}
                                returnKeyType="next"
                                onSubmitEditing={() => { cnpjNext.current.focus(); }}
                                blurOnSubmit={false}
                                ref={razaoNext}
                                style={styles.textInput}
                                placeholder="Razão Social"
                            />
                        </View>

                        <View style={styles.element2}>
                            <View style={styles.information}>
                                <Text style={styles.titleInput}>
                                    *CPF ou CNPJ
                                </Text>
                                <TextInput
                                    value={cnpj}
                                    keyboardType="number-pad"
                                    onChangeText={(text) => setCnpj(text)}
                                    returnKeyType="next"
                                    onSubmitEditing={() => { telefone.current.focus(); }}
                                    blurOnSubmit={false}
                                    ref={cnpjNext}
                                    style={styles.textInput}
                                    placeholder="Cpf ou Cnpj"
                                />
                            </View>

                            <View style={styles.information}>
                                <Text style={styles.titleInput}>
                                    Telefone
                                </Text>
                                <TextInput
                                    value={phone}
                                    keyboardType="number-pad"
                                    onChangeText={(text) => setPhone(text)}
                                    returnKeyType="next"
                                    onSubmitEditing={() => { emailNext.current.focus(); }}
                                    ref={telefone}
                                    style={styles.textInput}
                                    placeholder="Telefone"
                                />
                            </View>
                        </View>

                        <View style={styles.element}>
                            <Text keyboardType='numeric' style={styles.titleInput}>
                                E-mail
                            </Text>
                            <TextInput
                                placeholder="E-mail"
                                value={email}
                                ref={emailNext}
                                keyboardType="email-address"
                                returnKeyType="next"
                                blurOnSubmit={false}
                                style={styles.textInput}
                                onSubmitEditing={() => { rua.current.focus() }}
                                onChangeText={(text) => setEmail(text)}
                            />
                        </View>

                        <View style={styles.endereco}>
                            <View style={styles.element2}>
                                <View style={styles.informationRua}>
                                    <Text style={styles.titleInput}>
                                        Rua
                                    </Text>
                                    <TextInput
                                        value={street}
                                        onChangeText={(text) => setStreet(text)}
                                        returnKeyType="next"
                                        onSubmitEditing={() => { numero.current.focus(); }}
                                        blurOnSubmit={false}
                                        ref={rua}
                                        style={styles.textInput}
                                        placeholder="Rua ou Avenida"
                                    />
                                </View>

                                <View style={styles.informationNum}>
                                    <Text style={styles.titleInput}>
                                        Número
                                    </Text>
                                    <TextInput
                                        value={number}
                                        keyboardType="number-pad"
                                        onChangeText={(text) => setNumber(text)}
                                        returnKeyType="next"
                                        onSubmitEditing={() => { bairro.current.focus(); }}
                                        ref={numero}
                                        style={styles.textInput}
                                        placeholder="Número"
                                    />
                                </View>
                            </View>

                            <View style={styles.element2}>
                                <View style={styles.informationRua}>
                                    <Text style={styles.titleInput}>
                                        Bairro
                                    </Text>
                                    <TextInput
                                        value={district}
                                        onChangeText={(text) => setDistrict(text)}
                                        returnKeyType="next"
                                        onSubmitEditing={() => { cepNext.current.focus(); }}
                                        blurOnSubmit={false}
                                        ref={bairro}
                                        style={styles.textInput}
                                        placeholder="Digite o Bairro"
                                    />
                                </View>

                                <View style={styles.informationNum}>
                                    <Text style={styles.titleInput}>
                                        CEP
                                    </Text>
                                    <TextInput
                                        value={cep}
                                        keyboardType="number-pad"
                                        onChangeText={(text) => setCep(text)}
                                        returnKeyType="next"
                                        onSubmitEditing={() => { cidade.current.focus(); }}
                                        ref={cepNext}
                                        style={styles.textInput}
                                        placeholder="CEP"
                                    />
                                </View>
                            </View>

                            <View style={styles.element2}>
                                <View style={styles.price}>
                                    <Text style={styles.titleInput}>
                                        Cidade
                                    </Text>
                                    <TextInput
                                        value={city}
                                        onChangeText={(text) => setCity(text)}
                                        returnKeyType="next"
                                        onSubmitEditing={() => { estado.current.focus(); }}
                                        blurOnSubmit={false}
                                        ref={cidade}
                                        style={styles.textInput}
                                        placeholder="Cidade"
                                    />
                                </View>

                                <View style={styles.price}>
                                    <Text style={styles.titleInput}>
                                        Estado
                                    </Text>
                                    <TextInput
                                        value={state}
                                        onChangeText={(text) => setState(text)}
                                        returnKeyType="next"
                                        onSubmitEditing={() => { pais.current.focus(); }}
                                        ref={estado}
                                        style={styles.textInput}
                                        placeholder="Estado"
                                    />
                                </View>

                                <View style={styles.price}>
                                    <Text style={styles.titleInput}>
                                        País
                                    </Text>
                                    <TextInput
                                        value={country}
                                        onChangeText={(text) => setCountry(text)}
                                        ref={pais}
                                        style={styles.textInput}
                                        placeholder="País"
                                    />
                                </View>
                            </View>
                        </View>

                        <View style={styles.areaButton}>
                            <TouchableOpacity
                                disabled={isLoginLoading}
                                onPress={() => { saveSubject() }}
                                style={styles.touchable}
                            >
                                {
                                    !isLoginLoading ?
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
                </ScrollView>
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
};
