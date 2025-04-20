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
                {
                    user && (<AppBarTab text="Create a Review" onPress={() => navigate("/createReview")} />)
                }

                {
                    user && (<AppBarTab text="My Reviews" onPress={() => navigate("/userReview")} />)
                }


                {user ? (
                    <AppBarTab text="Sign Out" onPress={handleSignOut} />
                ) : (
                    <AppBarTab text="Sign In" onPress={() => navigate("/signIn")} />
                )}

                {
                    !user && (<AppBarTab text="Sign Up" onPress={() => navigate("/signUp")} />)
                }

            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight + 10,
        paddingBottom: 10,
        paddingHorizontal: 5,
        backgroundColor: '#24292e',
        fontFamily: theme.fonts.main,

    },
    scrollContainer: {
        flexDirection: "row",
        alignItems: "center",
    }
});

export default AppBar;
