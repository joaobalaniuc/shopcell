import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    StatusBar
} from 'react-native';
import { color } from '../../assets/AppStyles';
import { Icon } from 'react-native-elements';
import styles from './styles';

export default function Services(props) {

    //==============================================================
    //OtherMethods
    //==============================================================

    //Function navigate for 
    function navigationNewWorkOrder() {
        props.navigation.navigate("RegisterWorkOrder");
    };

    return (

        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={color.primary} />
            <View style={styles.container}>
                <View style={styles.body}>
                    <View style={styles.dashboard}>
                        <View style={styles.bodyDashboard}>
                            <View style={styles.elementDashboard}>
                                <TouchableOpacity>
                                    <Text style={styles.textGraphic}>
                                        Consultar
                                    </Text>
                                    <View style={styles.iconDashbord}>
                                        <Icon
                                            size={60}
                                            color={color.tertiary}
                                            name='search-circle-outline'
                                            type='ionicon'
                                        />
                                    </View>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.elementDashboard}>
                                <TouchableOpacity onPress={navigationNewWorkOrder.bind()}>
                                    <Text style={styles.textGraphic}>
                                        Nova Ordem
                                </Text>
                                    <View style={styles.iconDashbord}>
                                        <Icon
                                            size={60}
                                            color={color.tertiary}
                                            name='add-outline'
                                            type='ionicon'
                                        />
                                    </View>
                                </TouchableOpacity>
                            </View>

                        </View>

                        <View style={styles.bodyDashboard}>
                            <View style={styles.elementDashboard}>
                                <TouchableOpacity >
                                    <Text style={styles.textGraphic}>
                                        Novo Serviço
                                </Text>
                                    <View style={styles.iconDashbord}>
                                        <Icon
                                            size={60}
                                            color={color.tertiary}
                                            name='construct-outline'
                                            type='ionicon'
                                        />
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                </View>
            </View>
        </SafeAreaView>
    );
};

