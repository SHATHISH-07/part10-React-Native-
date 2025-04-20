import React, { useState } from "react";
import {
    FlatList,
    View,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Text,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useDebounce } from "use-debounce";
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";

const styles = StyleSheet.create({
    separator: {
        height: 10,
    },
    picker: {
        margin: 10,
        backgroundColor: "#f0f0f0",
        borderRadius: 5,
    },
    searchContainer: {
        position: "relative",
        margin: 10,
    },
    searchInput: {
        padding: 10,
        paddingRight: 40,
        backgroundColor: "#fff",
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 5,
    },
    clearButton: {
        position: "absolute",
        right: 10,
        top: 9,
    },
    clearButtonText: {
        fontSize: 18,
        color: "#888",
    },
});

const ItemSeparator = () => <View style={styles.separator} />;

class RepositoryListContainer extends React.Component {
    renderHeader = () => {
        const {
            orderBy,
            setOrderBy,
            orderDirection,
            setOrderDirection,
            searchKeyword,
            setSearchKeyword,
        } = this.props;

        return (
            <View>
                <View style={styles.searchContainer}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search repositories"
                        value={searchKeyword}
                        onChangeText={setSearchKeyword}
                    />
                    {searchKeyword.length > 0 && (
                        <TouchableOpacity
                            style={styles.clearButton}
                            onPress={() => setSearchKeyword("")}
                        >
                            <Text style={styles.clearButtonText}>✕</Text>
                        </TouchableOpacity>
                    )}
                </View>
                <View style={styles.picker}>
                    <Picker
                        selectedValue={orderBy}
                        onValueChange={(value) => {
                            setOrderBy(value);
                            setOrderDirection(
                                value === "RATING_AVERAGE_ASC" ? "ASC" : "DESC"
                            );
                        }}
                    >
                        <Picker.Item label="Latest repositories" value="CREATED_AT" />
                        <Picker.Item label="Highest rated repositories" value="RATING_AVERAGE" />
                        <Picker.Item label="Lowest rated repositories" value="RATING_AVERAGE_ASC" />
                    </Picker>
                </View>
            </View>
        );
    };

    render() {
        const { repositories, onEndReach } = this.props;

        return (
            <FlatList
                data={repositories}
                ItemSeparatorComponent={ItemSeparator}
                renderItem={({ item }) => (
                    <RepositoryItem item={item} isSingle={false} />
                )}
                keyExtractor={(item) => item.id}
                ListHeaderComponent={this.renderHeader}
                onEndReached={onEndReach}
                onEndReachedThreshold={0.5}
            />
        );
    }
}

const RepositoryList = () => {
    const [orderBy, setOrderBy] = useState("CREATED_AT");
    const [orderDirection, setOrderDirection] = useState("DESC");
    const [searchKeyword, setSearchKeyword] = useState("");
    const [debouncedSearchKeyword] = useDebounce(searchKeyword, 500);

    const { repositories, fetchMore } = useRepositories({
        orderBy: orderBy === "RATING_AVERAGE_ASC" ? "RATING_AVERAGE" : orderBy,
        orderDirection,
        searchKeyword: debouncedSearchKeyword,
    });

    return (
        <RepositoryListContainer
            repositories={repositories}
            orderBy={orderBy}
            setOrderBy={setOrderBy}
            orderDirection={orderDirection}
            setOrderDirection={setOrderDirection}
            searchKeyword={searchKeyword}
            setSearchKeyword={setSearchKeyword}
            onEndReach={fetchMore}
        />
    );
};

export default RepositoryList;
