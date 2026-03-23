import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

const GradientOutlineComponent = ({
    children,
    style,
}: {
    children: React.ReactNode;
    style?: StyleProp<ViewStyle>;
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
            style={[styles.outline, style]}
        >
            <View className="bg-bgColor">{children}</View>
        </LinearGradient>
    );
};

export default GradientOutlineComponent;

const styles = StyleSheet.create({
    outline: {
        padding: 2,
    },
});
