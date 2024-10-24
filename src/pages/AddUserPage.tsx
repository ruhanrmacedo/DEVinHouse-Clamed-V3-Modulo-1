import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function AddUserPage() {
    const [profile, setProfile] = useState<string | null>(null);
    const [name, setName] = useState('');
    const [document, setDocument] = useState('');
    const [fullAddress, setFullAddress] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigation = useNavigation();

    const handleRegister = async () => {
        if (!profile || !name || !document || !fullAddress || !email || !password || !confirmPassword) {
            Alert.alert('Erro', 'Todos os campos são obrigatórios!');
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert('Erro', 'As senhas não conferem!');
            return;
        }

        try {
            const response = await fetch('http://10.0.2.2:3000/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ profile, name, document, full_address: fullAddress, email, password }),
            });

            if (response.ok) {
                Alert.alert('Sucesso', 'Usuário cadastrado com sucesso!');
                navigation.goBack();
            } else {
                Alert.alert('Erro', 'Erro ao cadastrar usuário.');
            }
        } catch (error) {
            console.error('Erro ao cadastrar usuário:', error);
            Alert.alert('Erro', 'Erro na conexão com o servidor.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Criar Usuário</Text>
            <View style={styles.profileSelection}>
                <TouchableOpacity onPress={() => setProfile('motorista')}>
                    <Image
                        source={{ uri: 'https://cdn-icons-png.flaticon.com/512/5952/5952766.png' }}
                        style={[styles.profileIcon, profile === 'motorista' && styles.selected]}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setProfile('filial')}>
                    <Image
                        source={{ uri: 'https://cdn-icons-png.flaticon.com/512/4363/4363836.png' }}
                        style={[styles.profileIcon, profile === 'filial' && styles.selected]}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setProfile('admin')}>
                    <Image
                        source={{ uri: 'https://cdn-icons-png.flaticon.com/512/5322/5322033.png' }}
                        style={[styles.profileIcon, profile === 'admin' && styles.selected]}
                    />
                </TouchableOpacity>
            </View>

            <TextInput
                placeholder="Nome completo"
                style={styles.input}
                value={name}
                onChangeText={setName}
            />
            <TextInput
                placeholder="CPF/CNPJ"
                style={styles.input}
                value={document}
                onChangeText={setDocument}
            />
            <TextInput
                placeholder="Endereço Completo"
                style={styles.input}
                value={fullAddress}
                onChangeText={setFullAddress}
            />
            <Text style={styles.title}>Dados de Login</Text>
            <TextInput
                placeholder="Email"
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            <TextInput
                placeholder="Senha"
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <TextInput
                placeholder="Confirmar Senha"
                style={styles.input}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
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
    title: {
        fontSize: 24,
        fontWeight: '900',
        color: '#D6EFD8',
        textAlign: 'center',
        marginBottom: 16,
        marginTop: 16,
    },
    profileSelection: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 16,
    },
    profileIcon: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    selected: {
        borderWidth: 3,
        borderColor: '#508D4E',
    },
    input: {
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 8,
        marginVertical: 8,
        borderWidth: 1,
        borderColor: '#80AF81',
    },
    button: {
        backgroundColor: '#508D4E',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 16,
    },
    buttonText: {
        color: '#D6EFD8',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
