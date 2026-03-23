import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, Linking, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import GradientButtonWithOutline from "../components/GradientComponents/GradientButtonWithOutline";
import {
    getFestivalEntriesFromName,
    getFestivalFromId,
} from "../services/events";
import { Festival } from "../types";
import { parseDate } from "../utils/_utils";
import ArtistList from "./ArtistList";

const handleEventLink = async (url?: string) => {
    if (url === undefined) return;

    // Check if the device can open the URL
    const supported = await Linking.canOpenURL(url);

    if (supported) {
        await Linking.openURL(url);
    } else {
        console.error(`Don't know how to open this URL: ${url}`);
    }
};

const FestivalDetails = () => {
    const { id } = useLocalSearchParams();

    const [currEntryFestival, setCurrEntryFestival] = useState<Festival | null>(
        null,
    );
    const [multiEntryFestival, setMultiEntryFestival] = useState<Festival[]>(
        [],
    );

    const fetchFestival = async () => {
        const currFestival: Festival = await getFestivalFromId(id);
        setCurrEntryFestival(currFestival);

        const festivalName = currFestival.name;
        const multiEntryFest: Festival[] =
            await getFestivalEntriesFromName(festivalName);
        setMultiEntryFestival(multiEntryFest);
    };

    useEffect(() => {
        fetchFestival();
    }, []);

    return (
        <SafeAreaView className="items-center mb-10 h-screen">
            <Text className="font-bold text-2xl mt-5 mb-2 mx-3 text-center text-white">
                {currEntryFestival?.name}
            </Text>

            <GradientButtonWithOutline
                onPress={() => handleEventLink(currEntryFestival?.link)}
                style={styles.button}
            >
                <Text className="text-white font-bold">Go to event</Text>
            </GradientButtonWithOutline>

            {/* ARTISTS */}
            <FlatList
                data={multiEntryFestival}
                renderItem={({ item: festivalDay }) => {
                    const festDate = parseDate(festivalDay.date);
                    const festWeekDay = festDate.toLocaleDateString("default", {
                        weekday: "long",
                    });
                    const festMonth = festDate.toLocaleDateString("default", {
                        month: "long",
                    });
                    const festMonthDay = festDate.getDate();

                    return (
                        <View className="mb-3">
                            <Text className="text-white mb-2 font-bold text-lg w-screen px-3">
                                {festWeekDay}, {festMonth} {festMonthDay}
                            </Text>

                            {festivalDay.artistList.length > 0 ? (
                                <ArtistList festivalDay={festivalDay} />
                            ) : (
                                <Text className="text-white text-center mb-2">
                                    No artists found for this day.
                                </Text>
                            )}
                        </View>
                    );
                }}
                keyExtractor={(item) => item.id.toString()}
            />
        </SafeAreaView>
    );
};

export default FestivalDetails;

const styles = StyleSheet.create({
    button: {
        // borderWidth: 1,
        // borderColor: "white",
        marginBottom: 15,
    },
});
