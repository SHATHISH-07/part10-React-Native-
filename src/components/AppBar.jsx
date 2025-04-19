import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';
import { useNavigate } from "react-router-native";
import theme from "../styles/theme"


const AppBar = () => {

    const navigate = useNavigate();

    return (
        <View style={styles.container}>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
                <AppBarTab text="Repositories" onPress={() => navigate("/")} />
                <AppBarTab text="Sign In" onPress={() => navigate("/signIn")} />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight + 10,
        paddingBottom: 10,
        paddingHorizontal: 10,
        backgroundColor: '#24292e',
        fontFamily: theme.fonts.main,

    },
    scrollContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 165,
    }
});

export default AppBar;
