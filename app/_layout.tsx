import { images } from "@/constants/images";
import { Stack } from "expo-router";
import { ImageBackground } from "react-native";
import { enableScreens } from "react-native-screens";
import "./global.css";
enableScreens(true);

export default function RootLayout() {
  return (
    <ImageBackground
      className="flex-1 bg-primary"
      source={images.bg}
      resizeMode="cover"
    >
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "none",
        }}
      >
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="MovieDetails" />
      </Stack>
    </ImageBackground>
  );
}
