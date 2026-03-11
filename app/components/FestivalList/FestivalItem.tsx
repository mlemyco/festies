import { Festival } from "@/app/types";
import { Link } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const FestivalItem = ({ festival }: { festival: Festival }) => {
    return (
        <Pressable className="p-2 mx-3 my-2">
            <Link
                href={{
                    pathname: `/festivals/[id]`,
                    params: {
                        id: festival.id,
                    },
                }}
            >
                <View>
                    <Text className="text-white">{festival.name}</Text>
                    {/* <Link href={festival.link}>Go to Edmtrain event</Link> */}
                    <Text className="text-white">{festival.date}</Text>
                    {/* <Text>{festival.startTime}</Text>
                    <Text>{festival.endTime}</Text> */}
                </View>
            </Link>
        </Pressable>
    );
};

export default FestivalItem;

const styles = StyleSheet.create({});
