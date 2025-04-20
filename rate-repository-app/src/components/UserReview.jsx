import { FlatList, View, Text, Button, Alert, StyleSheet } from "react-native";
import { useQuery, useMutation } from "@apollo/client";
import { GET_CURRENT_USER } from "../graphql/queries";
import { DELETE_REVIEW } from "../graphql/mutations";
import { useNavigate } from "react-router-native";
import { format } from "date-fns";

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: "#f9f9f9",
        flex: 1,
    },
    separator: {
        height: 10,
    },
    reviewItem: {
        padding: 15,
        backgroundColor: "white",
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    reviewTopRow: {
        flexDirection: "row",
    },
    ratingContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: "#0366d6",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 15,
    },
    rating: {
        color: "#0366d6",
        fontWeight: "bold",
        fontSize: 18,
    },
    infoContainer: {
        flex: 1,
    },
    reviewRepositoryName: {
        fontWeight: "bold",
        fontSize: 16,
        marginBottom: 4,
        color: "#0366d6",
    },
    date: {
        color: "gray",
        marginBottom: 6,
    },
    reviewText: {
        fontSize: 14,
    },
    buttonContainer: {
        marginTop: 15,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    buttonWrapper: {
        flex: 1,
        marginHorizontal: 5,
    },
});

const UserReview = () => {
    const navigate = useNavigate();
    const { data, loading, error, refetch } = useQuery(GET_CURRENT_USER, {
        variables: { includeReviews: true },
    });

    const [deleteReview] = useMutation(DELETE_REVIEW, {
        onCompleted: () => {
            refetch();
        },
    });

    const user = data?.me;
    const reviews = user?.reviews?.edges || [];

    const handleDeleteReview = (reviewId) => {
        Alert.alert(
            "Delete Review",
            "Are you sure you want to delete this review?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "OK",
                    onPress: () => deleteReview({ variables: { id: reviewId } }),
                },
            ],
            { cancelable: true }
        );
    };

    const handleViewRepository = (repoId) => {
        navigate(`/${repoId}`);
    };

    if (loading) return <Text>Loading...</Text>;
    if (error) return <Text>Error: {error.message}</Text>;

    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 20, textAlign: "center", color: "#5d5d5d" }}>
                Your Reviews
            </Text>
            <FlatList
                data={reviews}
                keyExtractor={(item) => item.node.id}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                renderItem={({ item }) => {
                    const review = item.node;
                    const formattedDate = format(new Date(review.createdAt), "dd.MM.yyyy");

                    return (
                        <View style={styles.reviewItem}>
                            <View style={styles.reviewTopRow}>
                                <View style={styles.ratingContainer}>
                                    <Text style={styles.rating}>{review.rating}</Text>
                                </View>
                                <View style={styles.infoContainer}>
                                    <Text style={styles.reviewRepositoryName}>
                                        {review.repository.fullName}
                                    </Text>
                                    <Text style={styles.date}>{formattedDate}</Text>
                                    <Text style={styles.reviewText}>{review.text}</Text>
                                </View>
                            </View>
                            <View style={styles.buttonContainer}>
                                <View style={styles.buttonWrapper}>
                                    <Button
                                        title="View Repository"
                                        onPress={() => handleViewRepository(review.repository.id)}
                                        color="#0366d6"
                                    />
                                </View>
                                <View style={styles.buttonWrapper}>
                                    <Button
                                        title="Delete Review"
                                        onPress={() => handleDeleteReview(review.id)}
                                        color="#d73a4a"
                                    />
                                </View>
                            </View>
                        </View>
                    );
                }}
            />
        </View>
    );
};

export default UserReview;
