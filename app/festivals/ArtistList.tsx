import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import SelectArtistCard from "../components/SelectArtistCard";
import { getPreferencesForEvent } from "../services/preferences";
import { DisplayArtist, Festival } from "../types";

interface ArtistPreference {
    edmtrain_artist_id: number;
    preference: number;
}

const ArtistList = ({ festivalDay }: { festivalDay: Festival }) => {
    const [preferences, setPreferences] = useState<ArtistPreference[]>([]);
    const [displayArtists, setDisplayArtists] = useState<DisplayArtist[]>([]);

    const loadPreferences = async () => {
        const loadedPrefs = await getPreferencesForEvent(festivalDay.id);

        if (loadedPrefs) {
            setPreferences(loadedPrefs);
        }
    };

    const getDisplayArtists = () => {
        let displayArtistList: DisplayArtist[] = [];

        let workingDisplayArtist: DisplayArtist[] = [];
        for (const currArtist of festivalDay.artistList) {
            workingDisplayArtist.push({
                id: currArtist.id,
                name: currArtist.name,
                preference:
                    preferences.find(
                        (artistPref) =>
                            artistPref.edmtrain_artist_id === currArtist.id,
                    )?.preference || 0,
            });

            if (currArtist.b2bInd) continue;

            displayArtistList.push({
                id: workingDisplayArtist[0].id,
                name: workingDisplayArtist
                    .map((artist) => artist.name)
                    .join(" B2B "),
                preference: workingDisplayArtist[0].preference,
            });

            workingDisplayArtist = [];
        }

        // Sort case-insensitive
        displayArtistList.sort((a, b) =>
            a.name.localeCompare(b.name, "en", { sensitivity: "base" }),
        );

        setDisplayArtists(displayArtistList);
        // console.log("displayartists:", displayArtistList);
    };

    useEffect(() => {
        loadPreferences();
    }, [festivalDay]);

    useEffect(() => {
        getDisplayArtists();
    }, [preferences]);

    return (
        <FlatList
            data={displayArtists}
            renderItem={({ item }) => (
                <SelectArtistCard
                    festivalId={festivalDay.id}
                    displayArtist={item}
                />
            )}
            keyExtractor={(_, idx) => idx.toString()}
            numColumns={3}
            columnWrapperStyle={{
                justifyContent: "center",
                gap: 10,
                // paddingRight: 5,
                // marginHorizontal: 5,
                marginBottom: 10,
            }}
        />
    );
};

export default ArtistList;

const styles = StyleSheet.create({});
