import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

interface HeaderProps {
    userName: string;
    userImage: string;
}

const Header: React.FC<HeaderProps> = ({ userName, userImage }) => {
    return (
        <View style={styles.container}>
            <Image source={{ uri: userImage }} style={styles.profileImage} />
            <Text style={styles.text}>Olá, {userName}</Text>
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
});

export default Header;