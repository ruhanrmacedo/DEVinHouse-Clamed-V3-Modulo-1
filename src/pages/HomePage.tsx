import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import Header from '../components/Header'; // Componente Header importado
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';


type RootStackParamList = {
    Produtos: undefined;
    Usuarios: undefined;
    Login: undefined;
    Movimentacoes: undefined
};

type HomeProps = StackNavigationProp<RootStackParamList, 'Produtos'>;

export default function HomePage() {
    const [userData, setUserData] = useState<{ name: string, profile: string } | null>(null);
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
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#508D4E" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Header
                userName={userData?.name || 'Usuário'}
                userImage="https://banner2.cleanpng.com/20180920/yko/kisspng-computer-icons-portable-network-graphics-avatar-ic-1713936211478.webp"
            />

            <View style={styles.cardsContainer}>
                <View style={styles.card}>
                    <Image
                        source={require('../../assets/farmacia.png')}
                        style={styles.cardImage}
                    />
                    <TouchableOpacity
                        style={styles.cardButton}
                        onPress={() => navigation.navigate('Produtos')}
                    >
                        <Text style={styles.buttonText}>Gerenciar Estoque</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.card}>
                    <Image
                        source={require('../../assets/usuarios.png')}
                        style={styles.cardImage}
                    />
                    <TouchableOpacity
                        style={styles.cardButton}
                        onPress={() => navigation.navigate('Usuarios')}
                    >
                        <Text style={styles.buttonText}>Gerenciar Usuários</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.card}>
                    <Image
                        source={require('../../assets/movimentacoes.png')}
                        style={styles.cardImage}
                    />
                    <TouchableOpacity
                        style={styles.cardButton}
                        onPress={() => navigation.navigate('Movimentacoes')}
                    >
                        <Text style={styles.buttonText}>Movimentações</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    card: {
        backgroundColor: '#80AF81',
        width: '100%',
        borderRadius: 10,
        padding: 20,
        marginVertical: 10,
        alignItems: 'center',
    },
    cardImage: {
        width: 100,
        height: 100,
        marginBottom: 10,
    },
    cardButton: {
        backgroundColor: '#508D4E',
        padding: 10,
        borderRadius: 10,
    },
    buttonText: {
        color: '#D6EFD8',
        fontSize: 16,
        fontWeight: 'bold',
    },
    logoutButton: {
        backgroundColor: '#80AF81',
        padding: 10,
        marginTop: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
});