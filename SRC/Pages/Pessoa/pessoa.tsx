import React from 'react';
import {
    TextInput,
    StyleSheet,
    Text,
    View,
    FlatList
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import api from '../../Services/api';
import { MyButton } from '../../Components/MyButton/MyButton';
import colors from '../../styles/colors';
import Loading from '../../Components/Loading/Loading';
import { LinkButton } from '../../Components/LinkButton/LinkButton';

import { SafeAreaView } from 'react-native-safe-area-context';

interface PessoaProps {
    nome: String,
    tamanho: Number,
    cintura: Number,
    quadril: Number,
    sexo: String
}

//type nameOfIcons = 'eye' | 'eye-off'

enum nameOfIcons {
    eye = 'eye',
    eyeOff = 'eye-off'
}

interface PasswordConfig {
    flShowPass: boolean,
    iconPass: nameOfIcons
}

interface listErrors {
    errors: string[];
}

export default function Login() {
    const [objPasswordConfig, setConfigForm] = React.useState<PasswordConfig>
        ({ flShowPass: false, iconPass: nameOfIcons.eye });

    const [objPasswordConfirmConfig, setConfigConfirmForm] = React.useState<PasswordConfig>
        ({ flShowPass: false, iconPass: nameOfIcons.eye });


    const [txtName, setName] = React.useState('')
    const [txtTamanho, setTamanho] = React.useState('')
    const [txtCintura, setCintura] = React.useState('')
    const [txtquadril, setquadril] = React.useState('')
    const [txtsexo, setsexo] = React.useState('')
    const navigation = useNavigation();
    const [flLoading, setLoading] = React.useState(false)
    const [lstErrors, setListErrors] = React.useState<listErrors>({ errors: [] });

    function handleChangeIcon() {
        let icone = objPasswordConfig.iconPass === nameOfIcons.eye ? nameOfIcons.eyeOff : nameOfIcons.eye;
        let flShowPass = !objPasswordConfig.flShowPass;
        setConfigForm({ iconPass: icone, flShowPass });
    }

    function handleChangeIconConfirm() {
        let icone = objPasswordConfirmConfig.iconPass === nameOfIcons.eye ? nameOfIcons.eyeOff : nameOfIcons.eye;
        let flShowPass = !objPasswordConfirmConfig.flShowPass;
        setConfigConfirmForm({ iconPass: icone, flShowPass });
    }


    async function handlePostPessoa() {

        let objPessoa: PessoaProps = {
            nome: txtName,
            tamanho: txtTamanho,
            cintura: txtCintura,
            quadril: txtquadril,
            sexo: txtsexo
            
        };

        if (txtName.trim() === '') {
            alert('Nome não enviado');
            return;
        }
        if (txtTamanho.trim() === '') {
            alert('Campo Tamanho não pode ser zero');
            return;
        }
        if (txtCintura.trim() === '') {
            alert('Campo Cintura não pode ser zero');
            return;
        }
        if (txtquadril.trim() === '') {
            alert('Campo Quadril não pode ser zero');
            return;
        }
        if (txtsexo.trim() != 'M' && 'F') {
            alert('Opção inválida');
            return;
        }
        setLoading(true);
        try {
            const response = await api.post(`/Pessoa`, objPessoa);
            alert('Pessoa Created!');
            navigation.navigate('Home');
        }
        catch (error) {
            setListErrors({ errors: error.response.data.errors });
        }
        setLoading(false);
    }

    if (flLoading) {
        return (<Loading />);
    }

    function navigateToBack() {
        navigation.goBack();
    }


    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.textTitle}>Preencha seus dados!</Text>
            <TextInput
                style={styles.textInput}
                placeholder="Nome"
                onChangeText={text => setName(text)}
                maxLength={50}
                value={txtName}
            />
            <TextInput
                style={styles.textInput}
                placeholder="Tamanho"
                onChangeText={text => setTamanho(text)}
                maxLength={50}
                value={txtTamanho}
            />
            <TextInput
                style={styles.textInput}
                placeholder="Cintura"
                onChangeText={text => setCintura(text)}
                maxLength={50}
                value={txtCintura}
            />

            <TextInput
                style={styles.textInput}
                placeholder="Quadril"
                onChangeText={text => setquadril(text)}
                maxLength={50}
                value={txtquadril}
            />

                <TextInput
                style={styles.textInput}
                placeholder="Sexo"
                onChangeText={text => setsexo(text)}
                maxLength={1}
                value={txtsexo}
            />


            <MyButton title='Salvar' onPress={handlePostPessoa} />
            <LinkButton title='Voltar'
                onPress={navigateToBack}
            />

            <FlatList

                data={lstErrors.errors}
                keyExtractor={error => error}
                showsVerticalScrollIndicator={false}
                renderItem={({ item: itemError }) => (
                    <Text>{itemError}</Text>

                )}
            />

        </SafeAreaView>

    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textTitle: {
        color: 'red',
        fontSize: 28,
        marginBottom: 8
    },
    textInput: {
        height: 40,
        borderColor: colors.gray,
        borderRadius: 8,
        borderWidth: 1,
        width: '70%',
        marginBottom: 16,
        paddingHorizontal: 8
    },
    textInputPassword: {
        height: 40,
        borderWidth: 0,
        width: '70%',
        marginBottom: 16,
        paddingHorizontal: 8
    },
    buttonIn: {
        backgroundColor: colors.redButton,
        borderRadius: 8,
        height: 50,
        width: '70%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonTextIn: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold'
    },
    passwordContainer: {
        marginBottom: 16,
        height: 40,
        borderColor: '#dcdce6',
        borderRadius: 8,
        borderWidth: 1,
        width: '70%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    iconEye: {
        paddingHorizontal: 8,
        marginTop: 6
    },
});