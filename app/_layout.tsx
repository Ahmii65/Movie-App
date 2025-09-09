import { AppProvider } from "@/context/context";
import { Stack } from "expo-router";
import "./global.css";

export default function RootLayout() {
  return (
    <AppProvider>
      <Stack
        screenOptions={{ headerShown: false, animation: "slide_from_right" }}
      >
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="MovieDetails" />
      </Stack>
    </AppProvider>
  );
}
