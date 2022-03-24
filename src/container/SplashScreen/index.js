import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ActivityIndicator,
  StatusBar
} from 'react-native';
import styles from './styles';
import { color } from '../../assets/AppStyles';


export default function SplashScreen(props) {


  //==============================================================
  // Declarations Consts and States
  //==============================================================

  const [isLoginLoading, setIsLoginLoading] = useState('');
  const infoUser = props.route.params != undefined ? props.route.params : '';



  //==============================================================
  // LifeCycle
  //==============================================================

  useEffect(() => {
    setTimeout(function () {
      callLogin()
    }, 3000)
  }, []);

  //==============================================================
  // OtherMethods
  //==============================================================

  function callLogin() {
    setIsLoginLoading('true');
    if (infoUser != '') {
      props.navigation.reset({
        routes: [{
          name: "DrawerNavigator",
          params: infoUser
        }]
      })
    } else {
      props.navigation.navigate("Login")
    }
  }


  //==============================================================
  // Render
  //==============================================================

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={color.primary} />
      <View style={styles.container}>
        <Image style={styles.logoShop}
          source={require("../../assets/img/shopcell.png")}
        />

        <ActivityIndicator
          size="large"
          color={color.primary}
          style={{ marginTop: 30 }}
        />

        {/* <TouchableOpacity onPress={() => { callLogin() }} style={styles.touchable}>
          {
            isLoginLoading === '' ?
              <Text style={styles.textButton}>
                Comece
              </Text>
              :
              <ActivityIndicator
                size="small"
                color="#fff"
              />
          }
        </TouchableOpacity> */}
      </View>
    </SafeAreaView>
  );
};
