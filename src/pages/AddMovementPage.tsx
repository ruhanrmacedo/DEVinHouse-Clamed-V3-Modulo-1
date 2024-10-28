import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

type RootStackParamList = {
    Movements: undefined;
    AddMovement: undefined;
};

type AddMovementProps = StackNavigationProp<RootStackParamList, 'AddMovement'>;

type Branch = { id: number; name: string };
type Product = { product_id: number; product_name: string };

export default function AddMovementPage() {
    const [branches, setBranches] = useState<Branch[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [originBranch, setOriginBranch] = useState<number | null>(null);
    const [destinationBranch, setDestinationBranch] = useState<number | null>(null);
    const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
    const [quantity, setQuantity] = useState<string>('');
    const [observations, setObservations] = useState<string>('');
    const [loading, setLoading] = useState(true);

    const navigation = useNavigation<AddMovementProps>();

    useEffect(() => {
        fetchOptions();
    }, []);

    const fetchOptions = async () => {
        try {
            const [branchesResponse, productsResponse] = await Promise.all([
                fetch('http://10.0.2.2:3000/branches/options'),
                fetch('http://10.0.2.2:3000/products/options'),
            ]);
            const branchesData = await branchesResponse.json();
            const productsData = await productsResponse.json();
            setBranches(branchesData);
            setProducts(productsData);
        } catch (error) {
            console.error('Erro ao carregar opções:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async () => {
        if (originBranch === destinationBranch) {
            Alert.alert('Erro', 'A filial de origem e destino não podem ser iguais.');
            return;
        }

        if (!selectedProduct || !quantity || parseInt(quantity) <= 0) {
            Alert.alert('Erro', 'Preencha todos os campos corretamente.');
            return;
        }

        try {
            const response = await fetch('http://10.0.2.2:3000/movements', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    originBranchId: originBranch,
                    destinationBranchId: destinationBranch,
                    productId: selectedProduct,
                    quantity: parseInt(quantity),
                    observations: observations,
                }),
            });

            if (response.status === 400) {
                const { error } = await response.json();
                Alert.alert('Erro', error);
            } else {
                Alert.alert('Sucesso', 'Movimentação registrada com sucesso!');
                navigation.goBack();
            }
        } catch (error) {
            console.error('Erro ao cadastrar movimentação:', error);
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
            <Text style={styles.title}>Nova Movimentação</Text>

            <Picker
                selectedValue={originBranch}
                onValueChange={(itemValue) => setOriginBranch(itemValue)}
                style={styles.picker}
            >
                <Picker.Item label="Selecione a filial de origem" value="" />
                {branches.map((branch) => (
                    <Picker.Item key={branch.id} label={branch.name} value={branch.id} />
                ))}
            </Picker>

            <Picker
                selectedValue={destinationBranch}
                onValueChange={(itemValue) => setDestinationBranch(itemValue)}
                style={styles.picker}
            >
                <Picker.Item label="Selecione a filial de destino" value="" />
                {branches.map((branch) => (
                    <Picker.Item key={branch.id} label={branch.name} value={branch.id} />
                ))}
            </Picker>

            <Picker
                selectedValue={selectedProduct}
                onValueChange={(itemValue) => setSelectedProduct(itemValue)}
                style={styles.picker}
            >
                <Picker.Item label="Selecione o produto" value="" />
                {products.map((product) => (
                    <Picker.Item
                        key={product.product_id}
                        label={product.product_name}
                        value={product.product_id}
                    />
                ))}
            </Picker>

            <TextInput
                placeholder="Quantidade"
                keyboardType="numeric"
                value={quantity}
                onChangeText={setQuantity}
                style={styles.input}
            />

            <TextInput
                placeholder="Observações"
                multiline
                value={observations}
                onChangeText={setObservations}
                style={styles.textarea}
            />

            <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>Cadastrar</Text>
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
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#D6EFD8',
        marginBottom: 16,
    },
    picker: {
        backgroundColor: '#fff',
        marginBottom: 8,
        borderRadius: 8,
    },
    input: {
        backgroundColor: '#fff',
        padding: 12,
        marginBottom: 8,
        borderRadius: 8,
    },
    textarea: {
        backgroundColor: '#fff',
        padding: 12,
        marginBottom: 16,
        borderRadius: 8,
        height: 100,
    },
    button: {
        backgroundColor: '#508D4E',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
