import React, { useRef, useState } from 'react';
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

export default function RegisterWorkOrder(props) {

    
    //==============================================================
    // Declarations Consts and States
    //==============================================================


    //State for spin loading button
    const [isLoginLoading, setIsLoginLoading] = useState('');

    //Declaration for reference in next focus textInput
    const servico = useRef();
    const cliente = useRef();
    const observacao = useRef();
    const totalNext = useRef();


    //Declaration states for const
    const [product, setProduct] = useState('');
    const [service, setService] = useState('');
    const [client, setClient] = useState('');
    const [note, setNote] = useState('');
    const [total, setTotal] = useState('');


    
    //==============================================================
    // OtherMethods
    //==============================================================

    //Function save product
    function saveWorkOrder() {
        setIsLoginLoading('true');
        //Aguardando implementação de salvar
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
                                Produto
                                </Text>
                            <TextInput
                                value={product}
                                onChangeText={(text) => setProduct(text)}
                                returnKeyType="next"
                                onSubmitEditing={() => { servico.current.focus(); }}
                                blurOnSubmit={false}
                                style={styles.textInput}
                                placeholder="Nome do Produto"
                            />
                        </View>

                        <View style={styles.element}>
                            <Text style={styles.titleInput}>
                                Serviço
                            </Text>
                            <TextInput
                                value={service}
                                ref={servico}
                                onChangeText={(text) => setService(text)}
                                returnKeyType="next"
                                onSubmitEditing={() => { descricao.current.focus(); }}
                                blurOnSubmit={false}
                                style={styles.textInput}
                                placeholder="Nome da família"
                            />
                        </View>

                        <View style={styles.element}>
                            <Text style={styles.titleInput}>
                                Cliente
                            </Text>
                            <TextInput
                                value={client}
                                ref={cliente}
                                onChangeText={(text) => setClient(text)}
                                returnKeyType="next"
                                onSubmitEditing={() => { note.current.focus(); }}
                                blurOnSubmit={false}
                                style={styles.textInput}
                                placeholder="Nome da família"
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
                                value={note}
                                onChangeText={(text) => setTotal(text)}
                                returnKeyType="next"
                                onSubmitEditing={() => { totalNext.current.focus(); }}
                                blurOnSubmit={false}
                                ref={observacao}
                                style={styles.textInputDescription}
                                placeholder="Insira uma observação"
                            />
                        </View>

                        <View style={styles.element}>
                            <Text style={styles.titleInput}>
                                Total
                            </Text>
                            <TextInput
                                value={total}
                                ref={totalNext}
                                keyboardType='numeric'
                                onChangeText={(text) => setNote(text)}
                                blurOnSubmit={false}
                                style={styles.textInput}
                                placeholder="Total"
                            />
                        </View>

                        <View style={styles.areaButton}>
                            <TouchableOpacity
                                disabled={
                                    isLoginLoading === '' ?
                                        false
                                        : true
                                }
                                onPress={saveWorkOrder.bind()}
                                style={styles.touchable}
                            >
                                {
                                    isLoginLoading === '' ?
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