import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "./global.css";

export default function RootLayout() {
    return (
        <SafeAreaProvider>
            <Stack
                screenOptions={{
                    headerShown: false,
                    contentStyle: { backgroundColor: "#1d1d21" },
                }}
            >
                <Stack.Screen name="(tabs)" />
                <Stack.Screen name="festivals/[id]" />
            </Stack>
        </SafeAreaProvider>
    );
}
