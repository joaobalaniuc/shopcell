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
import { addSubject, updateSubject } from '../../services/api';
import gFn from '../../libs/functions';
import styles from './styles';
import { StackActions } from '@react-navigation/native';


export default function RegisterProvider(props) {


    //==============================================================
    // Declarations consts and states
    //==============================================================

    const popAction = StackActions.pop(1);

    const { action, infoUser } = props.route.params;

    //State for spin loading button
    const [isLoginLoading, setIsLoginLoading] = useState('');

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
    // OtherMethods
    //==============================================================

    useEffect(() => {
        validationOperation();
    }, [props.route.params]);


    //==============================================================
    // OtherMethods
    //==============================================================

    // Functino validation items
    function validationOperation() {

        const { action, item } = props.route.params;

        if (action == 0) {

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
        } else {
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
            } else {
                setStreet("");
                setNumber("");
                setDistrict("");
                setCep("");
                setCity("");
                setState("");
                setCountry("");
            }
        }
    }


    //Function save product
    async function saveProvider() {
        setIsLoginLoading('true');

        if (action == 1) {
            updateSubject({
                _id: id,
                subjectData: {
                    name: name,
                    companyName: razao,
                    client: false,
                    provider: true,
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

            await addSubject({
                matrix_id: matrix,
                name: name,
                companyName: razao,
                client: false,
                provider: true,
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
                    setIsLoginLoading(false);
                    props.navigation.goBack();
                    // navigation.dispatch(popAction);
                })
                .catch((error) => {
                    setIsLoginLoading('');
                });
        }
    };

    //Const create adjust params keyboard
    const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0


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
                                placeholder="Nome do Fornecedor"
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
                                    *CNPJ
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
                                    placeholder="Cnpj"
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
                                value={email}
                                keyboardType="email-address"
                                onChangeText={(text) => setEmail(text)}
                                returnKeyType="next"
                                onSubmitEditing={() => { rua.current.focus(); }}
                                blurOnSubmit={false}
                                ref={emailNext}
                                style={styles.textInput}
                                placeholder="E-mail para Contabilidade"
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
                                disabled={
                                    !isLoginLoading == true ?
                                        false
                                        : true
                                }
                                onPress={saveProvider.bind()}
                                style={styles.touchable}
                            >
                                {
                                    !isLoginLoading == true ?
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
