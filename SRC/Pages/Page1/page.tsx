import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
//import colors from './src/styles/colors';
import { useNavigation } from '@react-navigation/core';
import { MyButton } from '../../Components/MyButton/MyButton';


export default function Page1() {
  
    const [txtCintura, setCintura] = React.useState('');
    const [txtquadril, setquadril] = React.useState('');
    const [txtsexo, setseo] = React.useState('');
    const [flVisualiza, setFlVisualiza] = React.useState(false);
    const navigation = useNavigation();

    function clickMe() {
        setFlVisualiza(true);
        var rcq = (txtCintura) /(txtquadril)
        if (rcq < 0.8)
        {
          alert('Risco Baixo!');
        }
        else 
         if (rcq > 0.8 && rcq < 0.85)
         {
            alert('Risco Moderado!');
         }
         else 
         if (rcq > 0.86)
         {
            alert('Risco Alto');
         }
    }

    function backToWelcome() {
        navigation.goBack();
    }


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    form: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    textInput: {
        height: 40,
        borderColor: 'gray',
        borderRadius: 8,
        borderWidth: 1,
        width: '100%',
        textAlign: 'center',
        marginBottom: 16
    },
    buttonClickMe: {
        marginTop: 16,
        backgroundColor: 'red',
        borderRadius: 8,
        height: 50,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textButtonClickMe: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold'
    },
    imcObesidadeIII: {
        color: 'red',
        fontWeight: 'bold',
        fontSize: 18
    },
    imcNormal: {
        color: 'blue',
        fontWeight: 'bold',
        fontSize: 18
    }
});
