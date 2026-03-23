import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";

const GradientComponent = ({
    children,
    style,
}: {
    children: React.ReactNode;
    style?: StyleProp<ViewStyle>;
}) => {
    return (
        <LinearGradient
            colors={[
                "rgba(255, 207, 102, 0.5)",
                "rgba(245, 88, 153, 0.5)",
                "rgba(173, 102, 255, 0.5)",
            ]}
            locations={[0.1, 0.5, 0.9]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={style}
        >
            {children}
        </LinearGradient>
    );
};

export default GradientComponent;

const styles = StyleSheet.create({});
