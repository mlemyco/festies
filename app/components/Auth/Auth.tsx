import { login, signUp } from "@/app/services/auth";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import GradientButtonWithOutline from "../GradientComponents/GradientButtonWithOutline";
import TextBar from "../TextBar";

const Auth = ({
    setIsLoggedIn,
}: {
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const [isLoggingIn, setIsLoggingIn] = useState<boolean>(true);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [newEmail, setNewEmail] = useState<string>("");
    const [newUsername, setNewUsername] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    const [confirmedPassword, setConfirmedPassword] = useState<string>("");
    const [passwordsMatch, setPasswordsMatch] = useState<boolean>(false);

    const toggleLogin = () => {
        setIsLoggingIn(!isLoggingIn);
    };

    const handleConfirmedPassword = (confirmedPasswordInput: string) => {
        setConfirmedPassword(confirmedPasswordInput);
        setPasswordsMatch(confirmedPasswordInput === newPassword);
    };

    const handleLogIn = async () => {
        const { data, success } = await login(email, password);
        if (success) {
            setIsLoggedIn(true);
        }
    };

    const handleSignUp = async () => {
        const { data, success } = await signUp(
            newUsername,
            newEmail,
            newPassword,
        );
        if (success) {
            setIsLoggingIn(true);
            setIsLoggedIn(true);
        }
    };

    return (
        <View className="w-96 border border-neutral-700 rounded-3xl p-5">
            <Text className="text-white text-2xl font-bold text-center pb-2">
                {isLoggingIn ? "Login" : "Sign Up"}
            </Text>

            {isLoggingIn ? (
                <>
                    <TextBar
                        placeholder="email"
                        keyboardType="email-address"
                        autoComplete="email"
                        textContentType="emailAddress"
                        onChangeText={setEmail}
                    />
                    <TextBar
                        placeholder="password"
                        secureTextEntry
                        textContentType={"password"}
                        autoComplete={"password"}
                        onChangeText={setPassword}
                    />

                    <GradientButtonWithOutline
                        onPress={() => {
                            handleLogIn();
                        }}
                        style={styles.button}
                        disabled={!email || !password}
                    >
                        <Text className="text-white text-center font-bold">
                            Login
                        </Text>
                    </GradientButtonWithOutline>
                </>
            ) : (
                <>
                    <TextBar
                        placeholder="username"
                        onChangeText={setNewUsername}
                    />
                    <TextBar
                        placeholder="email"
                        keyboardType="email-address"
                        autoComplete="email"
                        textContentType="emailAddress"
                        onChangeText={setNewEmail}
                    />
                    <TextBar
                        placeholder="password"
                        secureTextEntry
                        // textContentType={"newPassword"}
                        // autoComplete={"new-password"}
                        onChangeText={setNewPassword}
                    />
                    <TextBar
                        placeholder="confirm password"
                        secureTextEntry
                        // textContentType="newPassword"
                        // autoComplete="new-password"
                        onChangeText={handleConfirmedPassword}
                    />

                    {confirmedPassword && !passwordsMatch && (
                        <Text className="text-rose-600 text-center">
                            Passwords don&apos;t match!
                        </Text>
                    )}

                    <GradientButtonWithOutline
                        onPress={() => {
                            if (passwordsMatch) {
                                handleSignUp();
                            }
                        }}
                        style={styles.button}
                        disabled={!passwordsMatch}
                    >
                        <Text className="text-white text-center font-bold">
                            Sign Up
                        </Text>
                    </GradientButtonWithOutline>
                </>
            )}

            <View className="flex-row justify-center items-center">
                <Text className="text-center text-white">
                    {isLoggingIn
                        ? "No account yet?  "
                        : "Already have an account?  "}
                </Text>
                <Pressable onPress={toggleLogin}>
                    <Text className="text-purple-500">
                        {isLoggingIn ? "Sign up." : "Login."}
                    </Text>
                </Pressable>
            </View>
        </View>
    );
};

export default Auth;

const styles = StyleSheet.create({
    button: {
        marginVertical: 15,
        alignSelf: "center",
    },
});
