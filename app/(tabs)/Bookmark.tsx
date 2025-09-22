import { images } from "@/constants/images";
import React from "react";
import { Image, View } from "react-native";

export default function Bookmark() {
  return (
    <View className="bg-primary">
      <Image source={images.bg} resizeMode="cover" className="w-full h-full" />
    </View>
  );
}
