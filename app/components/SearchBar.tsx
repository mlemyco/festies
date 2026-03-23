import React from "react";
import { StyleSheet } from "react-native";
import TextBar from "./TextBar";

const SearchBar = ({
    setSearch,
}: {
    setSearch: React.Dispatch<React.SetStateAction<string>>;
}) => {
    return (
        <TextBar placeholder="Search festivals..." onChangeText={setSearch} />
    );
};

export default SearchBar;

const styles = StyleSheet.create({});
