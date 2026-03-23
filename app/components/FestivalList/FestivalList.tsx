import { DisplayFestival } from "@/app/types";
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import FestivalItem from "./FestivalItem";

const FestivalList = ({ festivals }: { festivals: DisplayFestival[] }) => {
    return (
        <View className="mx-2">
            {festivals.length > 0 ? (
                <FlatList
                    className="w-screen h-screen"
                    data={festivals}
                    renderItem={({ item }) => <FestivalItem festival={item} />}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={{ paddingBottom: 200 }} // For bottom tab bar
                />
            ) : (
                <Text className="text-white p-5">No festivals found.</Text>
            )}
        </View>
    );
};

export default FestivalList;

const styles = StyleSheet.create({});
