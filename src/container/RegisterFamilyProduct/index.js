import {
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    TextInput,
    ScrollView,
    ActivityIndicator,
} from 'react-native';
import { addFamily, updateFamily } from '../../services/api';
import React, { useRef, useState, useEffect } from 'react';
import { color } from '../../assets/AppStyles';
import gFn from '../../libs/functions';
import styles from './styles';



export default function RegisterFamilyProduct(props) {


    //==============================================================
    // Declarations const and states
    //==============================================================

    //State for spin loading button
    const [loading, setLoading] = useState(false);

    //Declaration for reference in next focus textInput
    const nome = useRef();
    const descricao = useRef();


    //Declaration states for const
    const [operation, setOperation] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [infosUser, setInfosUser] = useState([]);
    const [item, setItem] = useState([]);


    //==============================================================
    // LifeCycle
    //==============================================================

    useEffect(() => {
        validationOperation();
    }, [props.route.params])


    //==============================================================
    // OtherMethods
    //==============================================================

    // Function for validation operation
    function validationOperation() {

        const { infoUser, selectedFamily, operation } = props.route.params;

        if (operation == 1) {
            setOperation(operation);
            setTitle(selectedFamily.title);
            setDescription(selectedFamily.description);
            setItem(selectedFamily);
        } else {
            setOperation('');
            setTitle('');
            setDescription('');
            setItem([]);
        }
        setInfosUser(infoUser);
    }


    //Function save product
    function saveProvider() {
        setLoading(true);

        if (title != "") {
            if (operation == 1) {

                updateFamily({
                    _id: item._id,
                    familyData: {
                        title: title,
                        description: description,
                    }
                })
                    .then((resp) => {
                        console.log(resp);
                        setLoading(false);
                        props.navigation.goBack();
                    })
                    .catch((error) => {
                        console.log(error);
                    });

            } else {
                addFamily({
                    matrix_id: infosUser.matrix_id,
                    title: title,
                    description: description,
                    product: true,
                })
                    .then((resp) => {
                        setLoading(false);
                        console.log(resp);
                        props.navigation.goBack();
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            };
        } else {
            gFn.toastConfirm("Nome deve estar preenchido!");
            setLoading(false);
        }
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
                            <Text style={styles.titleInput}>
                                Nome
                            </Text>
                            <TextInput
                                value={title}
                                ref={nome}
                                onChangeText={(text) => setTitle(text)}
                                returnKeyType="next"
                                onSubmitEditing={() => { descricao.current.focus(); }}
                                blurOnSubmit={false}
                                style={styles.textInput}
                                placeholder="Nome da família"
                            />
                        </View>

                        <View style={styles.element}>
                            <Text
                                style={styles.titleInput}
                            >
                                Descrição
                            </Text>
                            <TextInput
                                multiline={true}
                                numberOfLines={4}
                                value={description}
                                onChangeText={(text) => setDescription(text)}
                                blurOnSubmit={false}
                                ref={descricao}
                                style={styles.textInputDescription}
                                placeholder="Descrição da Família"
                            />
                        </View>

                        <View style={styles.areaButton}>
                            <TouchableOpacity
                                disabled={loading}
                                onPress={() => { saveProvider() }}
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
                                            color={color.light}
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