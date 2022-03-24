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
import { addGroup, updateGroup } from '../../services/api';
import styles from './styles';
import { Icon } from 'react-native-elements';
import { color } from '../../assets/AppStyles';
import { Appbar } from 'react-native-paper';

import gFn from '../../libs/functions';

export default function RegisterSubGroupsProduct(props) {


    //==============================================================
    // Declaration consts and states
    //==============================================================


    //State for spin loading button
    const [loading, setLoading] = useState(false);

    //Declaration for reference in next focus textInput
    const nome = useRef();
    const descricao = useRef();


    //Declaration states for const
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [operation, setOperation] = useState('');
    const [id, setId] = useState('');
    const [item, setItem] = useState([]);
    const [index, setIndex] = useState('');


    //==============================================================
    // LifeCycle
    //==============================================================

    useEffect(() => {

        // Receive data info user for ListGroups
        const { operation, item, _id, subGroup } = props.route.params;

        if (operation == 1) {
            setIndex(props.route.params.index)
            setOperation(operation);
            setId(_id);
            setTitle(subGroup.title);
            setDescription(subGroup.description);
            setItem(item);
        } else {
            setId(_id);
            setOperation('');
            setTitle('');
            setDescription('');
            setItem(item);
        }
    }, [props.route.params]);


    //==============================================================
    // OtherMethods
    //==============================================================

    //Function save and update product
    async function saveSubGroup() {

        var currentSub = item;
        console.log("==================================================")
        console.log("==================================================")
        console.log(JSON.stringify(currentSub,null,4))
        console.log("==================================================")

        if(operation == 1){
            currentSub.splice(index, 1, {
                title: title,
                description: description,
            });
        } else {
            currentSub.push({
                title: title,
                description: description,
            });
        }

        setLoading(true);

        await updateGroup({
            _id: id,
            groupData: {
                subgroups: currentSub,
            }
        })
            .then((resp) => {
                console.log("UpdateGroup Resp: ", resp);
                setLoading(false);
                props.navigation.goBack();
            })
            .catch((error) => {
                console.log("UpdateGroup Error: ", error);
                setLoading(false);
                props.navigation.goBack();
            });
    };

    //==============================================================
    // Render
    //==============================================================

    return (

        <SafeAreaView>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Appbar.Header style={styles.appbar}>
                    <Appbar.BackAction onPress={() => { props.navigation.goBack() }} />
                    <Appbar.Content title="SubGrupos" subtitle="" />
                </Appbar.Header>
                <View style={styles.container}>
                    <View style={styles.layout}>

                        <View style={styles.element}>
                            <Text style={styles.titleInput}>
                                Título
                            </Text>
                            <TextInput
                                value={title}
                                ref={nome}
                                onChangeText={(text) => setTitle(text)}
                                returnKeyType="next"
                                onSubmitEditing={() => { descricao.current.focus(); }}
                                blurOnSubmit={false}
                                style={styles.textInput}
                                placeholder="Título do SubGrupo"
                            />
                        </View>

                        <View style={styles.element}>
                            <Text
                                style={styles.titleInput}
                            >
                                Observação
                            </Text>
                            <TextInput
                                multiline={true}
                                numberOfLines={4}
                                value={description}
                                onChangeText={(text) => setDescription(text)}
                                blurOnSubmit={false}
                                ref={descricao}
                                style={styles.textInputDescription}
                                placeholder="Descrição do SubGrupo"
                            />
                        </View>

                        <View style={styles.areaButton}>
                            <TouchableOpacity
                                disabled={loading}
                                onPress={() => { saveSubGroup() }}
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
