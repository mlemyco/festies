import { Festival } from "@/app/types";
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import FestivalItem from "./FestivalItem";

const FestivalList = ({ festivals }: { festivals: Festival[] }) => {
    return (
        <View className="items-center">
            {festivals.length > 0 ? (
                <FlatList
                    data={festivals}
                    renderItem={({ item }) => <FestivalItem festival={item} />}
                    keyExtractor={(item) => item.id.toString()}
                />
            ) : (
                <Text className="text-white p-5">No festivals found.</Text>
            )}
        </View>
    );
};

export default FestivalList;

const styles = StyleSheet.create({});
