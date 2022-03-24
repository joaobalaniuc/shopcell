import React, { useRef, useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    TextInput,
    ScrollView,
    ActivityIndicator,
} from 'react-native';
import styles from './styles';
import { addGrid, updateGrid } from '../../services/api';
import { color } from '../../assets/AppStyles';
import gFn from '../../libs/functions';

export default function RegisterGridProduct(props) {


    //==============================================================
    // Declarations consts and states
    //==============================================================

    useEffect(() => {

        const { item, condition } = props.route.params;
        setCondition(condition);
        if (condition == 1) {
            setName(item.title);
            setDescription(item.description);
            setId(item._id);
        } else {
            setName('');
            setDescription('');
        }
    }, [props.route.params]);

    //==============================================================
    // Declarations consts and states
    //==============================================================


    const { infoUser } = props.route.params;

    //State for spin loading button
    const [loading, setLoading] = useState(false);

    //Declaration for reference in next focus textInput
    const nome = useRef();
    const descricao = useRef();


    //Declaration states for const
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [condition, setCondition] = useState('');



    //==============================================================
    //OtherMethods
    //==============================================================

    //Function save Grid
    async function saveGrid() {
        setLoading(true);

        if (condition == 1) {

            await updateGrid({
                _id: id,
                gridData: {
                    title: name,
                    description: description,
                }
            })
                .then((resp) => {
                    console.log(resp);
                    gFn.toastConfirm("Salvo com sucesso!");
                    setLoading(false);
                    setName('');
                    setDescription('');
                    props.navigation.goBack();
                })
                .catch((error) => {
                    console.log(error);
                    gFn.toastConfirm("Ops, tivemos um problema!");
                })

        } else {
            await addGrid({
                matrix_id: infoUser.matrix_id,
                title: name,
                description: description,
            })
                .then((resp) => {
                    console.log(resp);
                    gFn.toastConfirm("Salvo com sucesso!");
                    setLoading(false);
                    setName('');
                    setDescription('');
                    props.navigation.goBack();
                })
                .catch((error) => {
                    console.log(error);
                    gFn.toastConfirm("Ops, tivemos um problema!");
                })
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
                                Título
                            </Text>
                            <TextInput
                                value={name}
                                ref={nome}
                                onChangeText={(text) => setName(text)}
                                returnKeyType="next"
                                onSubmitEditing={() => { descricao.current.focus(); }}
                                blurOnSubmit={false}
                                style={styles.textInput}
                                placeholder="Nome da Grade"
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
                                placeholder="Descrição da Grade"
                            />
                        </View>

                        <View style={styles.areaButton}>
                            <TouchableOpacity
                                disabled={loading}
                                onPress={() => { saveGrid() }}
                                style={styles.touchable}
                            >
                                {
                                    loading ?
                                        <ActivityIndicator
                                            size="small"
                                            color={color.light}
                                        />
                                        :
                                        <Text style={styles.textTouch}>
                                            Salvar
                                        </Text>
                                }
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};
