import React, { useEffect, useState } from 'react';
import { Alert, TouchableOpacity, TextInput, View, StyleSheet, Text, ActivityIndicator, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const checkLogin = async () => {
            const user = await AsyncStorage.getItem('user');
            if (user && JSON.parse(user)?.name) {
                navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
            }
        };
        checkLogin();
    }, []);
    

    const handleLogin = async () => {
        if (email.trim() === ' ' || password.trim() === ' ') {
            Alert.alert('Erro', 'Preencha todos os campos!');
            return;
        }

        try {
            const response = await fetch('http://10.0.2.2:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                await AsyncStorage.setItem('user', JSON.stringify(data));
                navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
            } else {
                Alert.alert('Erro', 'Email ou senha incorretos!');
            }
        } catch (error) {
            Alert.alert('Erro', 'Erro ao fazer login!');
        }
    };

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#1A5319" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Image 
                    source={require('../../assets/guarda-chuva-logo2.png')}
                    style={styles.logo}
                />
                <Text style={styles.titleTop}>GUARDA-CHUVA</Text>
                <Text style={styles.titleBottom}>FARMÁCIAS</Text>
            </View>
            <TextInput
                style={styles.input}
                placeholder="E-mail"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <LinearGradient
                    colors={['#508D4E', '#80AF81']}
                    style={styles.gradient}
                >
                    <Text style={styles.buttonText}>Acessar</Text>
                </LinearGradient>
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1A5319',
        padding: 16,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#D6EFD8',
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: -20,
    },
    titleContainer: {
        marginBottom: 20,
        alignItems: 'center',
    },
    titleTop: {
        fontSize: 38,
        fontWeight: '900',
        color: '#D6EFD8',
        fontStyle: 'italic',
    },
    titleBottom: {
        fontSize: 14,
        color: '#D6EFD8',
        marginLeft: 135,
        marginTop: -10,
    },
    input: {
        height: 50,
        width: '80%',
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#80AF81',
        borderRadius: 30,
        paddingHorizontal: 15,
        backgroundColor: '#fff',
    },
    button: {
        height: 50,
        width: '80%',
        borderRadius: 30,
        overflow: 'hidden',
    },
    gradient: {
        paddingVertical: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});