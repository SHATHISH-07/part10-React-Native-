import { FlatList, View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import React from 'react';
import { useParams } from 'react-router-native';
import useSingleRepository from '../hooks/useSingleRepository';
import RepositoryItem from './RepositoryItem';
import { format } from 'date-fns';


const ItemSeparator = () => <View style={styles.separator} />;

export const ReviewItem = ({ review }) => {
    return (
        <View style={stylesReview.container}>
            <View style={stylesReview.ratingContainer}>
                <Text style={stylesReview.rating}>{review.rating}</Text>
            </View>
            <View style={stylesReview.infoContainer}>
                <Text style={stylesReview.username}>{review.user.username}</Text>
                <Text style={stylesReview.date}>
                    {format(new Date(review.createdAt), 'dd.MM.yyyy')}
                </Text>
                <Text style={stylesReview.text}>{review.text}</Text>
            </View>
        </View>
    );
};


const SingleRepository = () => {
    const { id } = useParams();
    const { repository, loading, error } = useSingleRepository(id);

    if (loading) return <ActivityIndicator />;
    if (error) return <Text>Error: {error.message}</Text>;

    const reviews = repository?.reviews?.edges?.map(edge => edge.node) || []

    return (
        <FlatList
            data={reviews}
            renderItem={({ item }) => <ReviewItem review={item} />}
            keyExtractor={({ id }) => id}
            ItemSeparatorComponent={ItemSeparator}
            ListHeaderComponent={() => (
                <RepositoryItem item={repository} isSingle={true} />
            )}
        />
    );
};

export default SingleRepository;

const styles = StyleSheet.create({
    separator: {
        height: 10,
    },

});


const stylesReview = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 15,
        backgroundColor: 'white',
    },
    ratingContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: '#0366d6',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 15,
    },
    rating: {
        color: '#0366d6',
        fontWeight: 'bold',
        fontSize: 18,
    },
    infoContainer: {
        flex: 1,
    },
    username: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 4,
    },
    date: {
        color: 'gray',
        marginBottom: 6,
    },
    text: {
        fontSize: 14,
    },
});