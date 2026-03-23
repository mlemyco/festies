import { User } from "@supabase/auth-js/dist/module/lib/types";
import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Auth from "../components/Auth/Auth";
import ProfileDetails from "../components/Auth/ProfileDetails";
import { getCurrentUser } from "../services/auth";
import supabase from "../utils/supabase";

const Profile = () => {
    const insets = useSafeAreaInsets();

    // const [isLoggingIn, setIsLoggingIn] = useState<boolean>(true);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    const getUser = async () => {
        const user = await getCurrentUser();

        setCurrentUser(user);
        if (!user) {
            setIsLoggedIn(false);
        } else {
            setIsLoggedIn(true);
        }
    };

    const handleLogOut = async () => {
        const { error } = await supabase.auth.signOut({ scope: "local" });

        if (error) return;

        console.log("Logged out!");
        setIsLoggedIn(false);
    };

    useEffect(() => {
        getUser();
    }, [isLoggedIn]);

    return (
        <View
            style={{
                flex: 1,
                paddingTop: insets.top,
                paddingBottom: insets.bottom,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            {!isLoggedIn ? (
                <Auth setIsLoggedIn={setIsLoggedIn} />
            ) : (
                <>
                    <ProfileDetails currentUser={currentUser} />

                    <Pressable
                        onPress={handleLogOut}
                        className="rounded-full bg-purple-500/30 border border-purple-500 px-4 py-2"
                    >
                        <Text className="text-white">Log Out</Text>
                    </Pressable>
                </>
            )}
        </View>
    );
};

export default Profile;

const styles = StyleSheet.create({});
