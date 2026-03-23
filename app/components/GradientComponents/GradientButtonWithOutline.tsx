import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import GradientButton from "./GradientButton";

const GradientButtonWithOutline = ({
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
        <LinearGradient
            colors={[
                "rgba(255, 207, 102)",
                "rgba(245, 88, 153)",
                "rgba(173, 102, 255)",
            ]}
            locations={[0.1, 0.5, 0.9]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[
                styles.outline,
                styles.button,
                style,
                // disabled && styles.disabled,
            ]}
        >
            <View className="bg-bgColor" style={styles.button}>
                <GradientButton
                    style={styles.button}
                    onPress={onPress}
                    disabled={disabled}
                >
                    {children}
                </GradientButton>
            </View>
        </LinearGradient>
    );
};

export default GradientButtonWithOutline;

const styles = StyleSheet.create({
    outline: {
        padding: 1,
    },
    button: {
        borderRadius: 1000,
    },
    disabled: {
        opacity: 0.6,
    },
});
