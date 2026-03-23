import React from "react";
import { Pressable, StyleProp, StyleSheet, ViewStyle } from "react-native";
import GradientComponent from "./GradientComponent";

const GradientButton = ({
    children,
    style,
    onPress,
    disabled = false,
}: {
    children: React.ReactNode;
    style?: StyleProp<ViewStyle>;
    onPress: () => void;
    disabled?: boolean;
}) => {
    return (
        <GradientComponent
            style={[styles.button, style, disabled && styles.disabled]}
        >
            <Pressable
                onPress={onPress}
                className="rounded-full"
                style={({ pressed }) => [
                    pressed && { backgroundColor: "black" },
                ]}
                disabled={disabled}
            >
                {children}
            </Pressable>
        </GradientComponent>
    );
};

export default GradientButton;

const styles = StyleSheet.create({
    button: {
        borderRadius: 1000,
        paddingVertical: 8,
        paddingHorizontal: 15,
        textAlign: "center",
    },
    disabled: {
        opacity: 0.6,
    },
});
