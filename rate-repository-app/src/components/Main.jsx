import { StyleSheet, View } from 'react-native';
import { Route, Routes } from 'react-router-native';
import RepositoryList from "./RepositoryList";
import AppBar from "./AppBar"
import SignIn from './SignIn';
import theme from "../styles/theme"
import SingleRepository from './SingleRepository';
import CreateReview from './CreateReview';
import SignUp from "./SignUp";
import UserReview from './UserReview';



const Main = () => {
    return (
        <View style={styles.container}>
            <AppBar />
            <Routes>
                <Route path="/" element={<RepositoryList />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/:id" element={<SingleRepository />} />
                <Route path="/createReview" element={<CreateReview />} />
                <Route path="/signUp" element={<SignUp />} />
                <Route path="/userReview" element={<UserReview />} />
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