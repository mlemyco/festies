import React from "react";
import { FlatList, StyleSheet } from "react-native";
import SelectArtistCard from "../components/SelectArtistCard";
import { Artist } from "../types";

const ArtistList = ({
    artistList: initialArtistList,
}: {
    artistList: Artist[];
}) => {
    let artistNameList: string[] = [];

    let workingArtist = [];
    for (const currArtist of initialArtistList) {
        workingArtist.push(currArtist.name);

        if (currArtist.b2bInd) continue;

        artistNameList.push(workingArtist.join(" B2B "));
        workingArtist = [];
    }

    // Sort case-insensitive
    artistNameList.sort((a, b) =>
        a.localeCompare(b, "en", { sensitivity: "base" }),
    );

    return (
        <FlatList
            data={artistNameList}
            renderItem={({ item }) => <SelectArtistCard artistName={item} />}
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
