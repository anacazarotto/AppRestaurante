import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Updates from 'expo-updates';

export default function Welcome() {
    const navigation = useNavigation();
    const [tokenExists, setTokenExists] = React.useState(false);

    const checkToken = async () => {
        console.log('Checking token');
        try {
            const token = await AsyncStorage.getItem('token');
            setTokenExists(token);
        } catch (error) { }
    };

    const fetchUpdate = async () => {
        try {
            const update = await Updates.checkForUpdateAsync();

            if (update.isAvailable) {
                await Updates.fetchUpdateAsync();
                await Updates.reloadAsync();
            }
        } catch (error) { }
    };

    React.useEffect(() => {
        fetchUpdate();
        checkToken();
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            checkToken();
        }, [])
    );

    return (
        <View style={styles.container}>
            <View style={styles.navbar}>
                <Text style={styles.navbarTitle}>Restaurante Chapecó</Text>
            </View>
            <View style={styles.containerLogo}>
                <Image
                    source={require('../../assets/comida6.png')}
                    style={styles.sideImage}
                    resizeMode='contain' />
                <Animatable.Image
                    animation='flipInY'
                    source={require('../../assets/logonovo.png')}
                    style={styles.mainImage}
                    resizeMode='contain' />
                <Image
                    source={require('../../assets/comida5.png')}
                    style={styles.sideImage}
                    resizeMode='contain' />
            </View>
            <Animatable.View
                style={styles.containerForm}
                animation='fadeInUp'
                delay={600}
            >
                <Text style={styles.title}>O melhor de todos</Text>

                <TouchableOpacity style={styles.button} onPress={async () => await AsyncStorage.getItem('token') ? navigation.navigate('Home') : navigation.navigate('Login')}>
                    <Text style={styles.buttonText}>Acessar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.button2, { display: tokenExists ? 'none' : 'flex' }]} onPress={async () => navigation.navigate('Register')}>
                    <Text style={styles.buttonText}>Registrar</Text>
                </TouchableOpacity>
            </Animatable.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#595340"
    },
    navbar: {
        height: '10%',
        backgroundColor: '#595340',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Roboto',
        paddingHorizontal: '5%',
    },
    navbarTitle: {
        color: '#FFF',
        fontSize: 40, // 2.5rem
        fontWeight: 'bold',
    },
    containerLogo: {
        flex: 2,
        backgroundColor: "#e0d4aa",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    mainImage: {
        flex: 1,
        height: '100%',
    },
    sideImage: {
        flex: 1,
        height: '50%',
    },
    containerForm: {
        flex: 1,
        backgroundColor: '#FFF',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingStart: '5%',
        paddingEnd: '5%',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24, // 1.5rem
        fontWeight: 'bold',
        marginTop: 28,
        marginBottom: 12,
        textAlign: 'center'
    },
    text: {
        color: '#a1a1a1'
    },
    button: {
        backgroundColor: '#e0d4aa',
        borderRadius: 50,
        paddingVertical: 8,
        width: '60%',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    button2: {
        backgroundColor: '#e0d4aa',
        borderRadius: 50,
        paddingVertical: 8,
        width: '60%',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 18, // 1.125rem
        color: '#fff',
        fontWeight: 'bold'
    }
});