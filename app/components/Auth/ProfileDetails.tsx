import { getCurrentProfile } from "@/app/services/profile";
import { User } from "@supabase/auth-js/dist/module/lib/types";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const ProfileDetails = ({ currentUser }: { currentUser: User | null }) => {
    const [profile, setProfile] = useState<any>(null);

    const getProfile = async () => {
        if (!currentUser) return;

        const { data, success } = await getCurrentProfile(currentUser?.id);

        if (success) {
            setProfile(data);
        }
    };

    useEffect(() => {
        getProfile();
    }, [currentUser]);

    return (
        <View className="flex-1 flex-col justify-center items-center gap-4">
            <Image
                className="size-40 rounded-full bg-cover bg-yellow-500"
                source={require("../../../assets/media/shotgun_charm_front.png")}
            />
            <Text className="text-white font-bold text-3xl">
                {profile?.username}
            </Text>
            <Text className="text-white">{currentUser?.email}</Text>
        </View>
    );
};

export default ProfileDetails;

const styles = StyleSheet.create({});
