import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import theme from "../styles/theme"


const RepositoryItem = ({ item }) => {


    const formatCount = (count) => {
        return count >= 1000
            ? (count / 1000).toFixed(1).replace(/\.0$/, '') + 'K'
            : count;
    };



    return (
        <View style={styles.container}>
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
    }

});


export default RepositoryItem