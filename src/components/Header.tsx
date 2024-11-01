import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface HeaderProps {
    userName: string;
    userImage: string;
    userProfile: string;
}

const Header: React.FC<HeaderProps> = ({ userName, userImage, userProfile }) => {
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const navigation = useNavigation();

    const toggleDropdown = () => {
        setIsDropdownVisible(!isDropdownVisible);
    };

    const navigateToProfile = () => {
        setIsDropdownVisible(false);
        navigation.navigate("ProfilePage");
    };

    const handleLogout = async () => {
        await AsyncStorage.removeItem('user');
        navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
    };

    return (
        <View style={styles.container}>
            <Image source={{ uri: userImage }} style={styles.profileImage} />
            <Text style={styles.text}>Olá, {userName}, ({userProfile})</Text>

            <TouchableOpacity onPress={toggleDropdown} style={styles.dropdownButton}>
                <MaterialIcons name="more-vert" size={24} color="#D6EFD8" />
            </TouchableOpacity>

            {isDropdownVisible && (
                <View style={styles.dropdownMenu}>
                    <TouchableOpacity onPress={navigateToProfile} style={styles.menuItem}>
                        <Text style={styles.menuText}>Perfil</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleLogout} style={styles.menuItem}>
                        <Text style={styles.menuText}>Logout</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#80AF81",
        padding: 10,
        borderRadius: 8,
        position: "relative",
        zIndex: 1000, 
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    text: {
        color: "#D6EFD8",
        fontSize: 18,
        fontWeight: "bold",
    },
    dropdownButton: {
        marginLeft: 'auto',
        paddingHorizontal: 10,
    },
    dropdownMenu: {
        position: "absolute",
        top: 50,
        right: 10,
        backgroundColor: "#fff",
        borderRadius: 8,
        paddingVertical: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 10,
        zIndex: 1000, // Valor alto para garantir que o menu fique sobre os outros componentes
    },
    menuItem: {
        paddingVertical: 8,
        paddingHorizontal: 15,
    },
    menuText: {
        fontSize: 16,
        color: "#1A5319",
    },
});

export default Header;
