import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import MovementCard from '../components/MovementCard';

type Movement = {
    id: number;
    produto: { nome: string; imagem: string };
    quantidade: number;
    status: string;
    origem: { nome: string; latitude: number; longitude: number };
    destino: { nome: string; latitude: number; longitude: number };
    historico: string[];
    motorista: string;
};

export default function DriverMovementsPage() {
    const [movements, setMovements] = useState<Movement[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMovements();
    }, []);

    const fetchMovements = async () => {
        try {
            const response = await fetch('http://10.0.2.2:3000/movements');
            const data = await response.json();
            setMovements(data);
        } catch (error) {
            console.error('Erro ao carregar movimentações:', error);
        } finally {
            setLoading(false);
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
            <FlatList
                data={movements}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <MovementCard movement={item} onUpdate={fetchMovements} />
                )}
                contentContainerStyle={styles.list}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1A5319',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    list: {
        padding: 16,
    },
});
