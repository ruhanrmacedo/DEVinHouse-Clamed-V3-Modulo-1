import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

interface ProfileComponentProps {
    userData: {
        name: string;
        document: string;
        fullAddress: string;
        email: string;
        profile: string
    };
    onSave: (updatedData: { fullAddress: string; email: string; password: string }) => void;
}

const ProfileComponent: React.FC<ProfileComponentProps> = ({ userData, onSave }) => {
    const [fullAddress, setFullAddress] = useState(userData.fullAddress);
    const [email, setEmail] = useState(userData.email);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPasswordFields, setShowPasswordFields] = useState(false);

    const handleSave = () => {
        if (password !== confirmPassword) {
            alert("As senhas não conferem!");
            return;
        }
        onSave({ fullAddress, email, password });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Perfil</Text>
            <TextInput style={styles.input}
                value={userData.name}
                editable={false}
                placeholder="Nome completo"
            />
            <TextInput style={styles.input}
                value={userData.profile}
                editable={false}
                placeholder="Tipo de Usuário"
            />
            <TextInput style={styles.input}
                value={userData.document}
                editable={false}
                placeholder="CPF/CNPJ"
            />
            <TextInput style={styles.input}
                value={fullAddress}
                onChangeText={setFullAddress}
                placeholder="Endereço Completo"
            />
            <TextInput style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="Email"
                keyboardType="email-address"
            />

            <TouchableOpacity onPress={() => setShowPasswordFields(!showPasswordFields)} style={styles.button}>
                <Text style={styles.buttonText}>{showPasswordFields ? "Cancelar" : "Trocar Senha"}</Text>
            </TouchableOpacity>

            {showPasswordFields && (
                <>
                    <TextInput style={styles.input}
                        value={password}
                        onChangeText={setPassword}
                        placeholder="Nova Senha"
                        secureTextEntry
                    />
                    <TextInput style={styles.input}
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        placeholder="Confirmar Nova Senha"
                        secureTextEntry
                    />
                </>
            )}



            <TouchableOpacity onPress={handleSave} style={styles.button}>
                <Text style={styles.buttonText}>Salvar</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#1A5319'
    },
    title: {
        fontSize: 24,
        color: '#D6EFD8',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20
    },
    input: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 8,
        marginBottom: 10,
        marginTop: 10
    },
    button: {
        backgroundColor: '#508D4E',
        padding: 15, borderRadius: 8,
        alignItems: 'center',
        marginTop: 10
    },
    buttonText: {
        color: '#D6EFD8',
        fontSize: 16,
        fontWeight: 'bold'
    },
});

export default ProfileComponent;
