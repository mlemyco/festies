import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { getCurrentUser } from "../services/auth";
import { updatePreference } from "../services/preferences";
import { DisplayArtist } from "../types";

const SelectArtistCard = ({
    festivalId,
    displayArtist: artist,
}: {
    festivalId: number;
    displayArtist: DisplayArtist;
}) => {
    const { id: eventId } = useLocalSearchParams();

    // const preferences = ["none", "liked", "loved"];

    const [prefIdx, setPrefIdx] = useState<number>(0);

    const [liked, setLiked] = useState<boolean>(false);
    const [loved, setLoved] = useState<boolean>(false);

    const setPrefLevel = (prefLevel: number) => {
        setLiked(prefLevel === 1);
        setLoved(prefLevel === 2);
    };

    const togglePreference = async () => {
        const user = await getCurrentUser();

        setPrefIdx((prevPref) => {
            const newPref = (prevPref + 1) % 3;

            setPrefLevel(newPref);

            if (user) {
                updatePreference(festivalId, artist.id, newPref);
            }

            return newPref;
        });
    };

    useEffect(() => {
        if (artist.preference > 0) console.log(artist.name, artist.preference);
        setPrefLevel(artist.preference);
    }, [artist]);

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
                    {artist.name}
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
