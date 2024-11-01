import React, { useEffect, useState } from 'react';
import {
    View, Text, Image, StyleSheet, TouchableOpacity, Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';


type Movement = {
    id: number;
    produto: { nome: string; imagem: string };
    quantidade: number;
    status: string;
    origem: { nome: string; latitude: number; longitude: number };
    destino: { nome: string; latitude: number; longitude: number };
    historico: { descricao: string; data: string }[];
    motorista: string;
};

interface MovementCardProps {
    movement: Movement;
    onUpdate: () => void;
}

const MovementCard: React.FC<MovementCardProps> = ({ movement, onUpdate }) => {
    const navigation = useNavigation();
    const [loggedUser, setLoggedUser] = useState<{ name: string } | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            const user = await AsyncStorage.getItem('user');
            if (user) {
                setLoggedUser(JSON.parse(user));
            }
        };
        fetchUser();
    }, []);

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'created':
                return 'Aguardando Coleta';
            case 'em transito':
                return 'Em Trânsito';
            case 'Coleta finalizada':
                return 'Coleta Finalizada';
            default:
                return status;
        }
    };

    const handleAction = async (action: 'start' | 'end') => {
        //Tira uma selfie para iniciar ou finalizar a entrega
        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        //Se a selfie foi tirada e o usuário está logado
        if (!result.canceled && loggedUser) {
            const { uri } = result.assets[0];
            const formData = new FormData();
            formData.append('file', {
                uri,
                type: 'image/jpeg',
                name: 'entrega.jpg',
            });
            formData.append('motorista', loggedUser.name);

            try {
                const response = await fetch(
                    `http://10.0.2.2:3000/movements/${movement.id}/${action}`,
                    {
                        method: 'PUT',
                        body: formData,
                        headers: { 'Content-Type': 'multipart/form-data' },
                    }
                );

                //Se a resposta for ok, atualiza a lista de movimentações
                if (response.ok) {
                    Alert.alert(
                        'Sucesso',
                        `Movimentação ${action === 'start' ? 'iniciada' : 'finalizada'}!`
                    );
                    onUpdate();
                } else {
                    const { error } = await response.json();
                    Alert.alert('Erro', error);
                }
            } catch (error) {
                console.error('Erro ao enviar imagem:', error);
            }
        } else {
            Alert.alert('Erro', 'Usuário não encontrado ou operação cancelada.');
        }
    };


    return (
        <View
            //Estiliza o card de acordo com o status da movimentação
            style={[
                styles.card,
                movement.status === 'created'
                    ? styles.pendingCard
                    : movement.status === 'em transito'
                        ? styles.inTransitCard
                        : styles.completedCard,
            ]}
        >
            <Image source={{ uri: movement.produto.imagem }} style={styles.productImage} />
            <Text style={styles.movementText}>
                <Text style={styles.label}>Origem:</Text> {movement.origem.nome}
            </Text>
            <Text style={styles.movementText}>
                <Text style={styles.label}>Destino:</Text> {movement.destino.nome}
            </Text>
            <Text style={styles.movementText}>
                <Text style={styles.label}>Produto:</Text> {movement.produto.nome} - {movement.quantidade}
            </Text>
            <Text style={styles.movementText}>
                <Text style={styles.label}>Status:</Text> {getStatusLabel(movement.status)}
            </Text>
            <Text style={styles.movementText}>
                <Text style={styles.label}>Histórico:</Text>
            </Text>
            
            {movement.historico.map((entry, index) => (
                <Text key={index} style={styles.historyEntry}>
                    - {entry.descricao.includes('Motorista')
                        ? `${entry.descricao} em ${entry.data}`
                        : `Pedido criado em ${entry.data}`}
                </Text>
            ))}

            
            <View style={styles.buttonContainer}>
                {movement.status !== 'Coleta finalizada' && (
                    <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() =>
                            handleAction(movement.status === 'created' ? 'start' : 'end')
                        }
                    >
                        <Text style={styles.buttonText}>
                            {movement.status === 'created' ? 'Iniciar Entrega' : 'Finalizar Entrega'}
                        </Text>
                    </TouchableOpacity>
                )}
                <TouchableOpacity
                    style={styles.mapButton}
                    onPress={() =>
                        navigation.navigate('MapaPage', {
                            origem: movement.origem,
                            destino: movement.destino
                        })
                    }
                >
                    <Text style={styles.buttonText}>Mapa</Text>
                </TouchableOpacity>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        padding: 16,
        marginVertical: 8,
        borderRadius: 8,
    },
    pendingCard: {
        backgroundColor: '#D3D3D3',
    },
    inTransitCard: {
        backgroundColor: '#FFA07A',
    },
    completedCard: {
        backgroundColor: '#98FB98',
    },
    productImage: {
        width: 100,
        height: 100,
        alignSelf: 'center',
        marginBottom: 8,
    },
    movementText: {
        fontSize: 16,
        marginBottom: 4,
    },
    label: {
        fontWeight: 'bold',
    },
    historyEntry: {
        fontSize: 14,
        color: '#333',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    actionButton: {
        backgroundColor: '#508D4E',
        padding: 10,
        borderRadius: 8,
    },
    mapButton: {
        backgroundColor: '#1E90FF',
        padding: 10,
        borderRadius: 8,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default MovementCard;
