import React from "react";
import { StyleSheet, TextInput, View } from "react-native";

const SearchBar = ({
    setSearch,
}: {
    setSearch: React.Dispatch<React.SetStateAction<string>>;
}) => {
    return (
        <View className="bg-neutral-800 rounded-full p-3 m-2">
            <TextInput
                placeholder="Search festivals..."
                onChangeText={setSearch}
            />
        </View>
    );
};

export default SearchBar;

const styles = StyleSheet.create({});
