import { DisplayFestival } from "@/app/types";
import { Link } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const FestivalItem = ({ festival }: { festival: DisplayFestival }) => {
    return (
        <Pressable className="p-2 my-1">
            <Link
                href={{
                    pathname: `/festivals/[id]`,
                    params: {
                        id: festival.id,
                    },
                }}
            >
                <View>
                    <Text className="text-white text-xl">{festival.name}</Text>
                    {/* <Link href={festival.link}>Go to Edmtrain event</Link> */}
                    <Text className="text-white italic">
                        {festival.dateRange}
                    </Text>
                    {/* <Text>{festival.startTime}</Text>
                    <Text>{festival.endTime}</Text> */}
                </View>
            </Link>
        </Pressable>
    );
};

export default FestivalItem;

const styles = StyleSheet.create({});
