import React, { useEffect, useState } from 'react';
import { View, ScrollView, ActivityIndicator, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Header from '../components/Header';
import CardButton from '../components/CardButton';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

type RootStackParamList = {
    Produtos: undefined;
    Usuarios: undefined;
    Login: undefined;
    Movimentacoes: undefined;
    DriverMovements: undefined;
};

type HomeProps = StackNavigationProp<RootStackParamList, 'Produtos'>;

export default function HomePage() {
    const [userData, setUserData] = useState<{ name: string; profile: string } | null>(null);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation<HomeProps>();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const user = await AsyncStorage.getItem('user');
                if (user) {
                    setUserData(JSON.parse(user));
                }
            } catch (error) {
                console.error('Erro ao carregar dados do usuário: ', error);
            } finally {
                setLoading(false);
            }
        };
        fetchUserData();
    }, []);

    const handleLogout = async () => {
        await AsyncStorage.removeItem('user');
        navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#508D4E" />
            </View>
        );
    }

    const renderCards = () => {
        switch (userData?.profile) {
            case 'admin':
                return (
                    <>
                        <CardButton
                            title="Gerenciar Estoque"
                            imageSource={require('../../assets/farmacia.png')}
                            onPress={() => navigation.navigate('Produtos')}
                        />
                        <CardButton
                            title="Gerenciar Usuários"
                            imageSource={require('../../assets/usuarios.png')}
                            onPress={() => navigation.navigate('Usuarios')}
                        />
                    </>
                );
            case 'filial':
                return (
                    <>
                        <CardButton
                            title="Gerenciar Estoque"
                            imageSource={require('../../assets/farmacia.png')}
                            onPress={() => navigation.navigate('Produtos')}
                        />
                        <CardButton
                            title="Movimentações"
                            imageSource={require('../../assets/movimentacoes.png')}
                            onPress={() => navigation.navigate('Movimentacoes')}
                        />
                    </>
                );
            case 'motorista':
                return (
                    <CardButton
                        title="Movimentações Motorista"
                        imageSource={require('../../assets/movimentacoes.png')}
                        onPress={() => navigation.navigate('DriverMovements')}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <Header
                userName={userData?.name || 'Usuário'}
                userImage="https://banner2.cleanpng.com/20180920/yko/kisspng-computer-icons-portable-network-graphics-avatar-ic-1713936211478.webp"
            />

            <View style={styles.cardsContainer}>{renderCards()}</View>

            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        backgroundColor: '#1A5319',
        padding: 16,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardsContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    logoutButton: {
        backgroundColor: '#80AF81',
        padding: 10,
        marginTop: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: '#D6EFD8',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
