import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const SelectArtistCard = ({ artistName }: { artistName: string }) => {
    // const preferences = ["none", "liked", "loved"];

    const [prefIdx, setPrefIdx] = useState<number>(0);

    const [liked, setLiked] = useState<boolean>(false);
    const [loved, setLoved] = useState<boolean>(false);

    const togglePreference = () => {
        setPrefIdx((prevPref) => {
            const newPref = (prevPref + 1) % 3;

            setLiked(newPref === 1);
            setLoved(newPref === 2);

            return newPref;
        });
    };

    return (
        <Pressable
            onPress={togglePreference}
            className={`border border-white rounded-lg p-2`}
            style={[
                styles.equalCard,
                liked && styles.liked,
                loved && styles.loved,
            ]}
        >
            <View>
                <Text className={`text-white ${loved && "font-bold"}`}>
                    {artistName}
                </Text>
            </View>
        </Pressable>
    );
};

export default SelectArtistCard;

const styles = StyleSheet.create({
    equalCard: {
        flexBasis: "30%",
    },
    liked: {
        backgroundColor: "rgb(168 85 247 / 0.3);",
        borderColor: "rgb(168 85 247);",
    },
    loved: {
        backgroundColor: "rgb(168 85 247);",
        borderColor: "rgb(168 85 247);",
    },
});
