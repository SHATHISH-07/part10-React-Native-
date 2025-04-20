import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from "react-router-native";
import useCreateReview from '../hooks/useCreateReview';

const validationSchema = yup.object().shape({
    repositoryName: yup.string().required('Repository name is required'),
    ownerName: yup.string().required('Repository owner is required'),
    rating: yup
        .number()
        .required('Rating is required')
        .min(0, 'Minimum rating is 0')
        .max(100, 'Maximum rating is 100'),
    text: yup.string()
});

const CreateReview = () => {

    const [createReview] = useCreateReview();

    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            repositoryName: '',
            ownerName: '',
            rating: '',
            text: ''
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                const review = await createReview({
                    repositoryName: values.repositoryName,
                    ownerName: values.ownerName,
                    rating: values.rating,
                    text: values.text
                });

                navigate("/")

            } catch (err) {
                console.log('Error creating Review', err)
            }
        }
    });

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Create a Review</Text>

            <TextInput
                style={[styles.input, formik.errors.ownerName && { borderColor: 'red' }]}
                placeholder='Repository owner name'
                value={formik.values.ownerName}
                onChangeText={formik.handleChange('ownerName')}
            />
            {formik.touched.ownerName && formik.errors.ownerName && (
                <Text style={styles.errorText}>{formik.errors.ownerName}</Text>
            )}

            <TextInput
                style={[styles.input, formik.errors.repositoryName && { borderColor: 'red' }]}
                placeholder='Repository name'
                value={formik.values.repositoryName}
                onChangeText={formik.handleChange('repositoryName')}
            />
            {formik.touched.repositoryName && formik.errors.repositoryName && (
                <Text style={styles.errorText}>{formik.errors.repositoryName}</Text>
            )}

            <TextInput
                style={[styles.input, formik.errors.rating && { borderColor: 'red' }]}
                placeholder='Rating between 0 and 100'
                keyboardType='numeric'
                value={formik.values.rating}
                onChangeText={formik.handleChange('rating')}
            />
            {formik.touched.rating && formik.errors.rating && (
                <Text style={styles.errorText}>{formik.errors.rating}</Text>
            )}

            <TextInput
                style={[styles.input, { height: 150, textAlignVertical: 'top' }]}
                placeholder='Review'
                multiline
                value={formik.values.text}
                onChangeText={formik.handleChange('text')}
            />

            <Pressable style={styles.button} onPress={formik.handleSubmit}>
                <Text style={styles.buttonText}>Create a Review</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#5d5d5d'
    },
    input: {
        width: "100%",
        height: 60,
        borderWidth: 1,
        borderColor: "#ccc",
        paddingHorizontal: 10,
        marginVertical: 5,
        borderRadius: 5
    },
    button: {
        width: "100%",
        height: 60,
        backgroundColor: "#0366d6",
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20
    },
    buttonText: {
        color: "#fff",
        fontSize: 18
    },
    errorText: {
        color: 'red',
        marginBottom: 5
    }
});

export default CreateReview;
