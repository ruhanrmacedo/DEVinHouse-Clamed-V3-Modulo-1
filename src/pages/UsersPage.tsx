import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Switch, FlatList, Image } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

type User = {
    id: number;
    name: string;
    profile: string;
    status: boolean;
};

export default function UsersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    const fetchUsers = async () => {
        try {
            const response = await fetch('http://10.0.2.2:3000/users');
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error('Erro ao carregar usuários:', error);
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            setLoading(true);
            const timer = setTimeout(() => {
                fetchUsers();
            }, 3000);
            
            return () => clearTimeout(timer);
        }, [])
    );

    const toggleStatus = async (userId: number) => {
        try {
            await fetch(`http://10.0.2.2:3000/users/${userId}/toggle-status`, {
                method: 'PATCH',
            });
            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user.id === userId ? { ...user, status: !user.status } : user
                )
            );
        } catch (error) {
            console.error('Erro ao atualizar status:', error);
        }
    };

    const getImageSource = (profile: string) => {
        switch (profile) {
            case 'motorista':
                return { uri: 'https://cdn-icons-png.flaticon.com/512/5952/5952766.png' };
            case 'filial':
                return { uri: 'https://cdn-icons-png.flaticon.com/512/4363/4363836.png' };
            case 'admin':
                return { uri: 'https://cdn-icons-png.flaticon.com/512/5322/5322033.png' };
            default:
                return { uri: 'https://cdn.iconscout.com/icon/premium/png-256-thumb/default-1890962-1601268.png?f=webp' };
        }
    };

    const renderUser = ({ item }: { item: User }) => (
        <View style={[styles.card, item.status ? styles.activeCard : styles.inactiveCard,]}>
            <Image source={getImageSource(item.profile)} style={styles.profileImagem} />
            <View style={styles.userInfo}>
                <Text style={styles.userName}>{item.name}</Text>
                <Text style={styles.userProfile}>{item.profile}</Text>
            </View>
            <View style={styles.actions}>
                <Switch
                    value={item.status}
                    onValueChange={() => toggleStatus(item.id)}
                />
                <TouchableOpacity
                    style={styles.manageButton}
                    onPress={() => navigation.navigate('EditUser', { userId: item.id })}
                >
                    <Text style={styles.manageButtonText}>Gerenciar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#508D4E" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={users}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderUser}
                contentContainerStyle={styles.list}
            />
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => navigation.navigate('AddUser')}
            >
                <Text style={styles.addButtonText}>Adicionar Usuário</Text>
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
    list: {
        paddingBottom: 16,
    },
    card: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        marginVertical: 8,
        borderRadius: 8,
        borderWidth: 2,
    },
    activeCard: {
        borderColor: '#80AF81',
        borderWidth: 2,
        backgroundColor: '#D6EFD8',
    },
    inactiveCard: {
        backgroundColor: '#FF6B6B',
    },
    profileImagem: {
        width: 50,
        height: 50,
        marginRight: 10,
    },
    userInfo: {
        flex: 1,
    },
    userName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1A5319',
    },
    userProfile: {
        fontSize: 14,
        color: '#508D4E',
    },
    actions: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    manageButton: {
        backgroundColor: '#508D4E',
        padding: 8,
        borderRadius: 8,
        alignItems: 'center',
        marginLeft: 10,
    },
    manageButtonText: {
        color: '#D6EFD8',
        fontSize: 14,
        fontWeight: 'bold',
    },
    addButton: {
        backgroundColor: '#80AF81',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 16,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
