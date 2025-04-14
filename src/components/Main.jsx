import { StyleSheet, View } from 'react-native';
import RepositoryList from "./RepositoryList";
import AppBar from "./AppBar"
import { Route, Routes } from 'react-router-native';
import SignIn from './SignIn';
import theme from "../styles/theme"




const Main = () => {
    return (
        <View style={styles.container}>
            <AppBar />
            <Routes>
                <Route path="/" element={<RepositoryList />} />
                <Route path="/signIn" element={<SignIn />} />
            </Routes>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        flexShrink: 1,
        fontFamily: theme.fonts.main,
    },
});

export default Main;