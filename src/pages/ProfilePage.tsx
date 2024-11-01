import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProfileComponent from '../components/ProfileComponent';

export default function ProfilePage() {
    const [userData, setUserData] = useState<{ name: string; document: string; fullAddress: string; email: string; profile: string } | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const user = await AsyncStorage.getItem('user');
                if (user) setUserData(JSON.parse(user));
            } catch (error) {
                console.error("Erro ao carregar dados do usuário:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchUserData();
    }, []);

    const handleSave = async (updatedData: { fullAddress: string; email: string; password: string }) => {
        try {
            const updatedUser = { ...userData, ...updatedData };
            await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
            setUserData(updatedUser);
            Alert.alert("Sucesso", "Dados atualizados com sucesso!");
        } catch (error) {
            console.error("Erro ao salvar dados do usuário:", error);
            Alert.alert("Erro", "Erro ao salvar os dados.");
        }
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#508D4E" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {userData ? <ProfileComponent userData={userData} onSave={handleSave} /> : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, // Garante que a página ocupe toda a altura da tela
        backgroundColor: '#1A5319',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1A5319',
    },
});
