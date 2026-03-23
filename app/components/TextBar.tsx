import React from "react";
import { StyleSheet, TextInput, TextInputProps } from "react-native";

const TextBar = ({ ...textInputProps }: TextInputProps) => {
    return (
        <TextInput
            className="bg-neutral-800 rounded-full py-3 px-4 mx-3 mt-3 mb-2 text-white"
            clearButtonMode="always"
            {...textInputProps}
        />
    );
};

export default TextBar;

const styles = StyleSheet.create({});
