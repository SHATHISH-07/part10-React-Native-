import * as yup from 'yup';
import { useNavigate } from 'react-router-native';
import { useFormik } from 'formik';
import { Text, TextInput, Pressable, View, StyleSheet } from 'react-native';
import theme from "../styles/theme";
import useSignUp from '../hooks/useSignUp';

const SignUpContainer = ({ values, handleChange, handleBlur, errors, touched, onSubmit }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Sign Up</Text>

            <View>
                <TextInput
                    placeholder='Username'
                    onChangeText={handleChange('username')}
                    onBlur={handleBlur('username')}
                    value={values.username}
                    testID='usernameInput'
                    style={[
                        styles.input,
                        touched.username && errors.username && { borderColor: '#d73a4a' }
                    ]}
                />
                {touched.username && errors.username && (
                    <Text style={styles.error}>{errors.username}</Text>
                )}
            </View>

            <View>
                <TextInput
                    placeholder='Password'
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                    secureTextEntry
                    testID='passwordInput'
                    style={[
                        styles.input,
                        touched.password && errors.password && { borderColor: '#d73a4a' }
                    ]}
                />
                {touched.password && errors.password && (
                    <Text style={styles.error}>{errors.password}</Text>
                )}
            </View>

            <View>
                <TextInput
                    placeholder='Repeat Password'
                    onChangeText={handleChange('passwordConfirmation')}
                    onBlur={handleBlur('passwordConfirmation')}
                    value={values.passwordConfirmation}
                    secureTextEntry
                    testID='passwordConfirmationInput'
                    style={[
                        styles.input,
                        touched.passwordConfirmation && errors.passwordConfirmation && { borderColor: '#d73a4a' }
                    ]}
                />
                {touched.passwordConfirmation && errors.passwordConfirmation && (
                    <Text style={styles.error}>{errors.passwordConfirmation}</Text>
                )}
            </View>

            <Pressable onPress={onSubmit} testID='submitButton' style={styles.button}>
                <Text style={styles.buttonText}>Sign Up</Text>
            </Pressable>
        </View>
    );
};

const SignUp = () => {
    const navigate = useNavigate();
    const [signUp] = useSignUp();

    const initialValues = {
        username: "",
        password: "",
        passwordConfirmation: ""
    };

    const onSubmit = async (values, { resetForm }) => {
        const { username, password } = values;
        try {
            await signUp({ username, password });
            resetForm();
            navigate("/");
        } catch (error) {
            console.error("Signup failed:", error.message);
        }
    };

    const validationSchema = yup.object().shape({
        username: yup
            .string()
            .min(3, "Username must be at least 3 characters")
            .max(30, "Username must be at most 30 characters")
            .required("Username is required"),
        password: yup
            .string()
            .min(3, "Password must be at least 3 characters")
            .max(50, "Password must be at most 50 characters")
            .required("Password is required"),
        passwordConfirmation: yup
            .string()
            .oneOf([yup.ref('password'), null], "Passwords must match")
            .required("Password confirmation is required")
    });

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit,
    });

    return (
        <SignUpContainer
            values={formik.values}
            handleChange={formik.handleChange}
            handleBlur={formik.handleBlur}
            errors={formik.errors}
            touched={formik.touched}
            onSubmit={formik.handleSubmit}
        />
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
        color: '#d73a4a',
        marginLeft: 12,
        alignSelf: 'flex-start',
        fontSize: 15,
    },
});

export default SignUp;
export { SignUpContainer };
