import { View, Text, Image, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { useNavigate } from "react-router-native"
import theme from "../styles/theme"
import { Linking } from 'react-native';

const RepositoryItem = ({ item, isSingle }) => {

    const navigate = useNavigate();


    const formatCount = (count) => {
        return count >= 1000
            ? (count / 1000).toFixed(1).replace(/\.0$/, '') + 'K'
            : count;
    };

    const handleOpenLink = async () => {
        const supported = await Linking.canOpenURL(item.url);
        if (supported) {
            Linking.openURL(item.url);
        } else {
            console.log("Can't open URL: ", item.url);
        }
    };





    return (
        <View style={styles.container}>
            <Pressable onPress={() => navigate(`/${item.id}`)}>
                <View testID='repositoryItem' >
                    <View style={styles.sec1}>
                        <Image
                            source={{ uri: item.ownerAvatarUrl }}
                            style={styles.image}
                        />
                        <View style={styles.heading}>
                            <Text style={styles.fullName}>{item.fullName}</Text>
                            <Text style={styles.description}>{item.description}</Text>
                            <Text style={styles.language}>{item.language}</Text>
                        </View>
                    </View>
                    <View style={styles.sec2}>
                        <View style={styles.statItem}>
                            <Text style={styles.statValue}>{formatCount(item.stargazersCount)}</Text>
                            <Text style={styles.statLabel}>Stars</Text>
                        </View>
                        <View style={styles.statItem}>
                            <Text style={styles.statValue}>{formatCount(item.forksCount)}</Text>
                            <Text style={styles.statLabel}>Forks</Text>
                        </View>
                        <View style={styles.statItem}>
                            <Text style={styles.statValue}>{formatCount(item.reviewCount)}</Text>
                            <Text style={styles.statLabel}>Reviews</Text>
                        </View>
                        <View style={styles.statItem}>
                            <Text style={styles.statValue}>{formatCount(item.ratingAverage)}</Text>
                            <Text style={styles.statLabel}>Rating</Text>
                        </View>
                    </View>
                </View>
            </Pressable>
            {
                isSingle && (
                    <Pressable style={styles.button} onPress={handleOpenLink}>
                        <Text style={styles.buttonText}>Open in GitHub</Text>
                    </Pressable>
                )
            }
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        backgroundColor: "#fff",
        padding: 15,
        marginVertical: 5,
        borderRadius: 6,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 3,
        fontFamily: theme.fonts.main,
    },

    sec1: {
        flexDirection: "row",
        marginBottom: 10,
    },

    heading: {
        flex: 1,
        flexDirection: "column",
        gap: 5,
    },

    image: {
        width: 60,
        height: 60,
        borderRadius: 6,
        marginRight: 12,
        overflow: "hidden",
    },

    fullName: {
        color: "#000",
        fontWeight: "bold",
        fontSize: 16,
    },

    description: {
        color: "#586069",
        fontSize: 14,
    },

    language: {
        backgroundColor: "#228dff",
        color: "#fff",
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 4,
        alignSelf: "flex-start",
        textAlign: "center",
        fontWeight: "500",
        fontSize: 14,
    },
    sec2: {
        flexDirection: "row",
        marginTop: 8,
        paddingHorizontal: 20,
        justifyContent: "space-between",
    },

    statItem: {
        flexDirection: "column",
        alignItems: "center",
    },

    statLabel: {
        fontSize: 14,
        color: "#555",
    },

    statValue: {
        fontWeight: "bold",
        fontSize: 16,
    },
    button: {
        backgroundColor: "#228dff",
        width: "100%",
        height: 50,
        padding: 10,
        borderRadius: 6,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
    },

    buttonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 17,
    },

});


export default RepositoryItem