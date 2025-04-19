import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';
import theme from "../styles/theme"


const AppBarTab = ({ text, onPress }) => {
    return (
        <Pressable onPress={onPress} style={styles.tab}>
            <Text style={styles.text}>{text}</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    tab: {
        padding: 12,
        fontFamily: theme.fonts.main,
    },
    text: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 20,
    },
});


export default AppBarTab;
