import React, { useRef, useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    ActivityIndicator,
} from 'react-native';
import { addUser, updateUser, listClients } from '../../services/api';
import { useFocusEffect } from '@react-navigation/native';
import { color } from '../../assets/AppStyles';
import { Icon } from 'react-native-elements';
import { TextInput, HelperText } from 'react-native-paper';
import styles from './styles';
import { Picker } from '@react-native-picker/picker';
import gFn from '../../libs/functions';

export default function RegisterGroupsProduct(props) {


    //==============================================================
    // Declaration consts and states
    //==============================================================


    //State for spin loading button
    const [loading, setLoading] = useState(false);

    //Declaration for reference in next focus textInput
    const nome = useRef();
    const caixa = useRef();
    const senha = useRef();

    const [loadingTrash, setLoadingTrash] = useState(false);
    const [loadingIndex, setLoadingIndex] = useState('');

    //Declaration states for const
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [access, setAccess] = useState('');

    const [infosUser, setInfosUser] = useState('');
    const [operation, setOperation] = useState('');
    const [item, setItem] = useState([]);

    const [listStores, setListStores] = useState([]);
    const [selectedStore, setSelectedStore] = useState('');

    const [typeAccess, setTypeAccess] = useState('root');
    const [listAccess, setListAcess] = useState([
        { _id: 'root', title: "Administrador" },
        { _id: 'seller', title: "Vendedor" },
        { _id: 'clerk', title: "Atendente" },
        { _id: 'cashier', title: "Caixa" },
    ]);




    //==============================================================
    // LifeCycle
    //==============================================================

    useEffect(() => {
        setParams();
    }, [props.route.params]);

    useFocusEffect(
        React.useCallback(() => {
            setParams();
        }, [props.route.params])
    );


    //==============================================================
    // OtherMethods
    //==============================================================

    // Function params
    function setParams() {
        const { item, infoUser, operation } = props.route.params;
        // listBranchs(infoUser.matrix_id);
        if (operation == 1) {
            setOperation(operation);
            setInfosUser(infoUser);
            setName(item.name);
            setEmail(item.email);
            setAccess(item.access);
            setItem(item);
        } else {
            setInfosUser(infoUser);
            setItem(item);
            setOperation(0);
            setName('');
            setPassword('');
            setEmail('');
            setAccess('');
        };
    };

    // Function listStores
    async function listBranchs(matrix_id) {
        listClients({
            matrix_id: matrix_id
        })
            .then((resp) => {
                console.log(JSON.stringify(resp, null, 4))
                setListStores(resp)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    //Function save and update product
    function saveUser() {

        setLoading(true);

        if (operation == 1) {
            updateUser({
                _id: item._id,
                userData: {
                    name: name,
                    email: email,
                    login: email,
                    pass: password,
                    access: [typeAccess]
                }
            })
                .then((resp) => {
                    setLoading(false);
                    props.navigation.goBack();
                })
                .catch((error) => {
                    setLoading(false);
                    props.navigaiton.goBack();
                });

        } else {

            addUser({
                matrix_id: infosUser.matrix_id,

                name: name,
                email: email,
                login: email,
                pass: password,
                access: [typeAccess]
            })
                .then((resp) => {
                    setLoading(false);
                    props.navigation.goBack();
                    console.log(resp)
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    const hasErrors = () => {
        return password.length < 5;
    };

    //==============================================================
    // Render
    //==============================================================

    return (

        <SafeAreaView>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <View style={styles.layout}>


                        <View style={styles.element}>
                            <TextInput
                                value={name}
                                label="Nome do Usuário"
                                ref={nome}
                                returnKeyType="next"
                                blurOnSubmit={false}
                                onSubmitEditing={() => { caixa.current.focus(); }}
                                mode='outlined'
                                theme={{ colors: { primary: color.primary } }}
                                onChangeText={(text) => { setName(text) }}
                                style={{ height: 50 }}
                            />
                        </View>

                        <View style={styles.element}>
                            <TextInput
                                value={email}
                                label="E-mail"
                                ref={caixa}
                                returnKeyType="next"
                                mode='outlined'
                                onChangeText={(text) => { setEmail(text) }}
                                onSubmitEditing={() => { senha.current.focus(); }}
                                theme={{ colors: { primary: color.primary } }}
                                style={{ height: 50 }}
                            />
                        </View>

                        <View style={styles.element}>
                            <TextInput
                                value={password}
                                label="Senha"
                                ref={senha}
                                mode='outlined'
                                onChangeText={(text) => { setPassword(text) }}
                                theme={{ colors: { primary: color.primary } }}
                                style={{ height: 50 }}
                                secureTextEntry={false}
                                right={<TouchableOpacity style={{ backgroundColor: 'blue' }}><Text>Lucas</Text></TouchableOpacity>}
                            />
                            {
                                password.length != '' &&
                                <HelperText type="error" visible={hasErrors()}>
                                    A senha precisa ter pelo menos 6 caracteres!
                                </HelperText>
                            }
                        </View>

                        <View style={styles.dropdwonFlag}>
                            <Picker
                                selectedValue={typeAccess}
                                onValueChange={
                                    (itemValue) => setTypeAccess(itemValue)
                                }>
                                {
                                    listAccess.map((item, index) => {
                                        return <Picker.Item key={index} value={item._id} label={item.title} />
                                    })
                                }
                            </Picker>
                        </View>


                        {/* <View style={styles.dropdwonFlag}>
                            <Picker
                                selectedValue={selectedStore}
                                onValueChange={
                                    (itemValue) => setSelectedStore(itemValue)
                                }>
                                {
                                    listStores.map((item, index) => {
                                        return <Picker.Item key={index} value={item._id} label={item.name} />
                                    })
                                }
                            </Picker>
                        </View> */}





                        <View style={styles.areaButton}>
                            <TouchableOpacity
                                disabled={loading}
                                onPress={() => { saveUser() }}
                                style={styles.touchable}
                            >
                                {
                                    !loading ?
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
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};
