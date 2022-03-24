import { StyleSheet } from 'react-native';
import { color } from '../../assets/AppStyles';


const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
  
    actIndi: {
      marginTop: 50
    },
  
    logoShop: {
      resizeMode: 'center',
    },
  
    touchable: {
      marginTop: 100,
      width: '80%',
      height: 46,
      borderRadius: 6,
      backgroundColor: '#0090de',
      justifyContent: 'center',
      alignItems: 'center',
    },
  
    textButton: {
      color: "#fff",
      fontWeight: 'bold',
    },
  
  });

  export default styles;