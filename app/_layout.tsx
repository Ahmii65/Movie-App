import { images } from "@/constants/images";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image, View } from "react-native";
import "./global.css";

export default function RootLayout() {
  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute z-0" resizeMode="cover" />
      <StatusBar hidden />
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "none",
        }}
      >
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="MovieDetails" />
      </Stack>
    </View>
  );
}
