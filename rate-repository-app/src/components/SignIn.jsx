import * as yup from 'yup';
import { useNavigate } from 'react-router-native';
import { useFormik } from 'formik';
import { Text, TextInput, Pressable, View, StyleSheet } from 'react-native';
import theme from "../styles/theme";
import useSignIn from '../hooks/useSignIn';
import useAuthStorage from '../hooks/useStorage';


const SignIn = () => {

    const navigate = useNavigate();

    const authStorage = useAuthStorage();

    const [signIn] = useSignIn();

    const initialValue = {
        username: "",
        password: "",
    };

    const onSubmit = async (values, { resetForm }) => {
        const { username, password } = values;
        try {
            const accessToken = await signIn({ username, password });

            await authStorage.setAccessToken(accessToken);

            console.log(accessToken)

            resetForm();

            navigate("/");
        } catch (error) {
            console.error("Login failed:", error.message);
        }
    };


    const validationSchema = yup.object().shape({
        username: yup.string().min(3, "Username must be at least 3 characters").required("Username is required"),
        password: yup.string().min(3, "Password must be at least 3 characters").required("Password is required"),
    });

    const formik = useFormik({
        initialValues: initialValue,
        validationSchema,
        onSubmit,
    });

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Sign In</Text>


            <View>
                <TextInput
                    placeholder='Username'
                    onChangeText={formik.handleChange('username')}
                    onBlur={formik.handleBlur('username')}
                    value={formik.values.username}
                    style={[
                        styles.input,
                        formik.touched.username && formik.errors.username && { borderColor: '#d73a4a' }
                    ]}
                />
                {formik.touched.username && formik.errors.username && (
                    <Text style={styles.error}>{formik.errors.username}</Text>
                )}
            </View>



            <View>
                <TextInput
                    placeholder='Password'
                    onChangeText={formik.handleChange('password')}
                    onBlur={formik.handleBlur('password')}
                    value={formik.values.password}
                    secureTextEntry
                    style={[
                        styles.input,
                        formik.touched.password && formik.errors.password && { borderColor: '#d73a4a' }
                    ]}
                />
                {formik.touched.password && formik.errors.password && (
                    <Text style={styles.error}>{formik.errors.password}</Text>
                )}
            </View>


            <Pressable onPress={formik.handleSubmit} style={styles.button}>
                <Text style={styles.buttonText}>Sign In</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginVertical: 50,
        padding: 20,
        fontFamily: theme.fonts.main,
    },
    heading: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#5d5d5d',
    },
    input: {
        height: 60,
        width: 370,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    button: {
        backgroundColor: '#0366d6',
        padding: 12,
        borderRadius: 5,
        alignItems: 'center',
        width: 370,
        height: 60,
        justifyContent: "center",
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    error: {
        color: 'red',
        marginLeft: 12,
        marginBottom: 5,
        alignSelf: 'flex-start',
    },
    error: {
        color: '#d73a4a',
        marginLeft: 12,
        alignSelf: 'flex-start',
        fontSize: 15,
    },
});

export default SignIn;
