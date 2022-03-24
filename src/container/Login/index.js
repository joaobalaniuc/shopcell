import React, { useState, useRef } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    TextInput,
    Image,
    StatusBar,
    ActivityIndicator
} from 'react-native';
import { auth } from '../../services/api';
import styles from './styles';
import gFn from '../../libs/functions';


export default function Login({ navigation }) {


    //==============================================================
    // Declaration const and States
    //==============================================================

    //Declaration for reference in next focus textInput
    const senha = useRef();

    //State for spin loading button
    const [isLoginLoading, setIsLoginLoading] = useState(false);
    const [email, setEmail] = useState('appixar');
    //appixar
    //Dev123!@#
    const [password, setPassword] = useState('Dev123!@#');
    const [matrix, setMatrix] = useState('5fce90517f3d3ee8d392711a');

    //Validations for inputText
    const validations = []
    validations.push(email && email.length >= 6)
    validations.push(password && password.length >= 6)
    const validForm = validations.reduce((t, a) => t && a)


    //==============================================================
    // OtherMethods
    //==============================================================

    //Function send remeberPassword
    function rememberPassword() {
        // await your beautiful code
    };

    // Function login User
    async function login() {
        setIsLoginLoading(true);
        if (validForm == true) {

            //Function receive resp mongoDb
            const user = await auth(matrix, email, password);
            //Condition for user exists or not
            if (user.error === "Access denied") {
                alert("Seus dados não conferem!");
                setIsLoginLoading(false);
            } else if (user.toString() == "Error: Network Error") {
                gFn.toastConfirm("Problemas na conexão!");
                setIsLoginLoading(false)
            } else {
                callDashboard(user)
            }
        } else {
            alert("Preencha corretamente o login e a senha");
            setIsLoginLoading(false);
        }
    }

    //Function call Dashboard
    function callDashboard(infoUser) {

        infoUser.store = infoUser.matrix_id;

        navigation.reset({
            routes: [{
                name: "DrawerNavigator",
                params: infoUser
            }]
        });
    };


    //==============================================================
    // Render
    //==============================================================

    return (

        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="#0090de" />
            <KeyboardAvoidingView
                style={styles.view}
                enable={Platform.OS === 'ios'}
                behavior="padding"
            >
                <View style={styles.view}>
                    <Image style={styles.logo}
                        source={require("../../assets/img/shopcell.png")}
                    />
                </View>
                <View style={styles.view}>
                    <Text style={styles.textWeight}>
                        Faça seu Login
                </Text >
                    <TextInput
                        returnKeyType="next"
                        onSubmitEditing={() => { senha.current.focus(); }}
                        blurOnSubmit={false}
                        placeholder="Login"
                        style={styles.textInput}
                        value={email}
                        onChangeText={(email) => setEmail(email)}
                    />
                    <TextInput
                        placeholder="Senha"
                        secureTextEntry={true}
                        style={styles.textInput}
                        ref={senha}
                        value={password}
                        onChangeText={(password) => setPassword(password)}
                    />
                    <TouchableOpacity
                        disabled={isLoginLoading}
                        onPress={login.bind()}
                        style={[styles.touchable, validForm ? {} : styles.touchableoff]}>
                        {!isLoginLoading ?
                            <Text style={styles.textButton}>
                                Entrar
                                </Text>
                            :
                            <ActivityIndicator
                                size="small"
                                color="#fff"
                            />
                        }
                    </TouchableOpacity>
                    {/* <TouchableOpacity onPress={rememberPassword.bind()} style={styles.touchEsq}>
                        <Text style={styles.textWeight}>
                            Esqueci minha senha!
                        </Text>
                    </TouchableOpacity> */}
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};