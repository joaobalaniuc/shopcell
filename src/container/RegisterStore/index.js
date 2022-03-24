import React, { useRef, useState, useEffect } from 'react';
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
import { addClient, findClient, updateClient } from '../../services/api';
import { getActionFromState, useFocusEffect } from '@react-navigation/native';
import styles from './styles';
import gFn from '../../libs/functions';

export default function RegisterStore(props) {


    const infoUser = props.route.params;


    //==============================================================
    // LifeCycle
    //==============================================================


    //State for spin loading button
    const [isLoginLoading, setIsLoginLoading] = useState(false);

    //Declaration for reference in next focus textInput
    const matrix = infoUser.matrix_id;
    const nome = useRef();
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
    const responsavel = useRef();


    //Declaration states for const
    const [idClient, setIdClient] = useState('');
    const [name, setName] = useState('');
    const [razao, setRazao] = useState('');
    const [fullAddress, setFullAddress] = useState([]);
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
    const [commissionaire, setCommissionaire] = useState('');


    //==============================================================
    // LifeCycle
    //==============================================================

    useEffect(() => {
        validationEdit();
    }, [props.route.params]);

    //==============================================================
    // OtherMethods
    //==============================================================

    // Function validation if edit informations
    async function validationEdit() {

        // Const receive _id of listClient for edit informations
        const { _id } = props.route.params;
        setIdClient(_id);
        console.log(_id)
        // setIdClient(_id);

        if (_id != 0) {
            await findClient({ _id: _id })
                .then((resp) => {
                    setName(resp.name);
                    setRazao(resp.companyName);
                    setCnpj(resp.document);
                    setStreet(resp.address.street);
                    setNumber(resp.address.number);
                    setDistrict(resp.address.district);
                    setCep(resp.address.cep);
                    setCity(resp.address.city);
                    setState(resp.address.state);
                    setCountry(resp.address.country);
                    setEmail(resp.email);
                    setPhone(resp.phone);
                    setCommissionaire(resp.responsible);

                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            setName("");
            setRazao("");
            setCnpj("");
            setStreet("");
            setNumber("");
            setDistrict("");
            setCep("");
            setCity("");
            setState("");
            setCountry("");
            setEmail("");
            setPhone("");
            setCommissionaire("");
        }

    };

    //Function save product
    async function saveStore() {

        setIsLoginLoading(true);

        if (name != "" && cnpj != "") {

            if (idClient != 0) {

                await updateClient({
                    _id: idClient,
                    clientData: {
                        name: name,
                        companyName: razao,
                        // plan: "",
                        // planExpiration: "",
                        status: 'active',
                        type: "branch",
                        document: cnpj,
                        email: email,
                        phone: phone,
                        address: {
                            street: street,
                            number: number,
                            district: district,
                            city: city,
                            state: state,
                            country: country,
                        },
                        matrix_id: matrix,
                        responsible: commissionaire,
                    }
                })
                    .then((resp) => {
                        console.log("Resposta do banco ao inserir", resp);
                        if (resp.error == "No data to update") {
                            alert("Desculpe, as informações não foram atualizadas");
                        } else {
                            props.navigation.goBack();
                        }
                    })
                    .catch((error) => {

                    });

            } else {
                await addClient({
                    name: name,
                    companyName: razao,
                    // plan: "",
                    // planExpiration: "",
                    status: 'active',
                    type: "branch",
                    document: cnpj,
                    email: email,
                    phone: phone,
                    address: {
                        street: street,
                        number: number,
                        district: district,
                        city: city,
                        state: state,
                        country: country,
                    },
                    matrix_id: matrix,
                    responsible: commissionaire,
                })
                    .then((resp) => {
                        console.log("Resposta do banco ao inserir", resp);
                        if (resp.error == "Subject document is required") {
                            alert("Desculpe, algumas informações importantes estão vazias!");
                        } else {
                            gFn.toastConfirm("Salvo com sucesso!");
                            props.navigation.goBack();
                        }
                    })
                    .catch((error) => {
                        gFn.toastConfirm("Ops!, tivemos problemas para salvar!");
                    });
            };
        } else {
            alert("Nome e CNP ou CNPJ precisa estar preenchidos!");
        }
        setIsLoginLoading(false);
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
                            <Text style={styles.titleInput}>
                                E-mail
                            </Text>
                            <TextInput
                                keyboardType="email-address"
                                value={email}
                                onChangeText={(text) => setEmail(text)}
                                returnKeyType="next"
                                onSubmitEditing={() => { rua.current.focus(); }}
                                blurOnSubmit={false}
                                ref={emailNext}
                                style={styles.textInput}
                                placeholder="E-mail"
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
                                        onSubmitEditing={() => { responsavel.current.focus(); }}
                                        ref={pais}
                                        returnKeyType="next"
                                        style={styles.textInput}
                                        placeholder="País"
                                    />
                                </View>
                            </View>
                        </View>

                        <View style={styles.element}>
                            <Text style={styles.titleInput}>
                                Responsável
                            </Text>
                            <TextInput
                                value={commissionaire}
                                blurOnSubmit={false}
                                ref={responsavel}
                                style={styles.textInput}
                                placeholder="Nome"
                                onChangeText={(text) => setCommissionaire(text)}
                            />
                        </View>

                        <View style={styles.areaButton}>
                            <TouchableOpacity
                                disabled={isLoginLoading}
                                onPress={() => { saveStore() }}
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
