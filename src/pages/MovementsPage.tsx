import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

type Movement = {
    id: number;
    produto: { nome: string; imagem: string };
    quantidade: number;
    status: string;
    origem: { nome: string };
    destino: { nome: string };
};

export default function MovementsPage() {
    const [movements, setMovements] = useState<Movement[]>([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

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

    const renderMovement = ({ item }: { item: Movement }) => (
        <View style={styles.card}>
            <Text style={styles.movementText}><Text style={styles.label}>Origem:</Text> {item.origem.nome}</Text>
            <Text style={styles.movementText}><Text style={styles.label}>Destino:</Text> {item.destino.nome}</Text>
            <Text style={styles.movementText}><Text style={styles.label}>Produto:</Text> {item.produto.nome} - {item.quantidade}</Text>
            <Text style={styles.movementText}><Text style={styles.label}>Status:</Text> {item.status}</Text>
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
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => navigation.navigate('AddMovement')}
            >
                <Text style={styles.addButtonText}>Adicionar Movimentação</Text>
            </TouchableOpacity>

            <FlatList
                data={movements}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderMovement}
                contentContainerStyle={styles.list}
            />
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
    card: {
        backgroundColor: '#D6EFD8',
        padding: 16,
        marginVertical: 8,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#80AF81',
    },
    movementText: {
        fontSize: 16,
        marginBottom: 4,
        color: '#1A5319',
    },
    label: {
        fontWeight: 'bold',
    },
    list: {
        paddingBottom: 16,
    },
    addButton: {
        backgroundColor: '#508D4E',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 16,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
