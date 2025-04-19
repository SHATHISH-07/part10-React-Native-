import React from 'react';
import { useQuery } from '@apollo/client';
import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';
import { useNavigate } from "react-router-native";
import theme from "../styles/theme"
import { ME } from "../graphql/queries";
import useSignOut from '../hooks/useSignOut';



const AppBar = () => {

    const navigate = useNavigate();
    const { data } = useQuery(ME);
    const signOut = useSignOut();

    const user = data?.me;

    const handleSignOut = async () => {
        await signOut();
        navigate("/");
    }

    return (
        <View style={styles.container}>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
                <AppBarTab text="Repositories" onPress={() => navigate("/")} />
                {user ? (
                    <AppBarTab text="Sign Out" onPress={handleSignOut} />
                ) : (
                    <AppBarTab text="Sign In" onPress={() => navigate("/signIn")} />
                )}
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
        gap: 130,
    }
});

export default AppBar;
