import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

interface CardButtonProps {
    title: string;
    imageSource: any;
    onPress: () => void;
}

const CardButton: React.FC<CardButtonProps> = ({ title, imageSource, onPress }) => {
    return (
        <View style={styles.card}>
            <Image source={imageSource} style={styles.cardImage} />
            <TouchableOpacity style={styles.cardButton} onPress={onPress}>
                <Text style={styles.buttonText}>{title}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#80AF81',
        width: '100%',
        borderRadius: 10,
        padding: 20,
        marginVertical: 10,
        alignItems: 'center',
    },
    cardImage: {
        width: 100,
        height: 100,
        marginBottom: 10,
    },
    cardButton: {
        backgroundColor: '#508D4E',
        padding: 10,
        borderRadius: 10,
    },
    buttonText: {
        color: '#D6EFD8',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default CardButton;
