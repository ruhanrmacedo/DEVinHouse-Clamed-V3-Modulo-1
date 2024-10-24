import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

type Product = {
    id: number;
    product_name: string;
    quantity: number;
    branch_name: string;
    image_url: string;
    description: string;
};

export default function ProductsPage() {
    const [allProducts, setAllProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch(`http://10.0.2.2:3000/products`);
            const data = await response.json();
            setAllProducts(data);
            setFilteredProducts(data);
        } catch (error) {
            console.error('Erro ao carregar produtos:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (text: string) => {
        setSearchTerm(text);
        const filtered = allProducts.filter((product) =>
            product.product_name.toLowerCase().includes(text.toLowerCase()) ||
            product.branch_name.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredProducts(filtered);
    };

    const renderProduct = ({ item }: { item: Product }) => (
        <View style={styles.card}>
            <Image source={{ uri: item.image_url }} style={styles.productImage} />
            <View style={styles.productInfo}>
                <Text style={styles.productName}>{item.product_name}</Text>
                <Text style={styles.productDetails}>Loja: {item.branch_name} - {item.quantity} Unidades</Text>
                <Text style={styles.productDescription}>{item.description}</Text>
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
            <Text style={styles.searchTitle}>O que você procura?</Text>
            <TextInput
                placeholder="Digite o nome do produto ou loja"
                style={styles.searchInput}
                value={searchTerm}
                onChangeText={handleSearch}
            />

            <Text style={styles.resultText}>{filteredProducts.length} produtos encontrados</Text>

            {filteredProducts.length === 0 && !loading && (
                <Text style={styles.noProductsText}>Nenhum produto encontrado</Text>
            )}

            <FlatList
                data={filteredProducts}
                keyExtractor={(item, index) => item?.id ? item.id.toString() : index.toString()}
                renderItem={renderProduct}
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
    searchTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#D6EFD8',
    },
    searchInput: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 12,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: '#80AF81',
    },
    searchButton: {
        backgroundColor: '#508D4E',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 16,
    },
    searchButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    resultText: {
        fontSize: 14,
        marginBottom: 8,
        color: '#D6EFD8',
    },
    noProductsText: {
        textAlign: 'center',
        fontSize: 14,
        color: '#666',
        marginBottom: 16,
    },
    list: {
        paddingBottom: 16,
    },
    card: {
        flexDirection: 'row',
        backgroundColor: '#D6EFD8',
        marginBottom: 12,
        borderRadius: 8,
        padding: 12,
        borderWidth: 1,
        borderColor: '#80AF81',
    },
    productImage: {
        width: 60,
        height: 60,
        marginRight: 12,
    },
    productInfo: {
        flex: 1,
    },
    productName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    productDetails: {
        fontSize: 14,
        marginBottom: 4,
        color: '#666',
    },
    productDescription: {
        fontSize: 12,
        color: '#999',
    },
});
