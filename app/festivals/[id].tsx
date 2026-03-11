import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
    getFestivalEntriesFromName,
    getFestivalFromId,
} from "../services/events";
import { Festival } from "../types";
import ArtistList from "./ArtistList";

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
        <SafeAreaView className="items-center">
            <Text className="font-bold text-lg my-5 text-white">
                {currEntryFestival?.name}
            </Text>

            {/* ARTISTS */}
            <FlatList
                data={multiEntryFestival}
                renderItem={({ item }) =>
                    item.artistList.length > 0 ? (
                        <View className="mb-5">
                            <ArtistList artistList={item.artistList} />
                        </View>
                    ) : (
                        <Text className="text-white">
                            No artists found for this day.
                        </Text>
                    )
                }
                keyExtractor={(item) => item.id.toString()}
            />
        </SafeAreaView>
    );
};

export default FestivalDetails;

const styles = StyleSheet.create({});
