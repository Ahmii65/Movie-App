import { images } from "@/constants/images";
import React from "react";
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";

const Tabicons = ({ focused, icon, title }: any) => {
  return (
    <View>
      {focused ? (
        <ImageBackground
          className="flex flex-1 w-full min-w-[112px] min-h-[48px] flex-row gap-2 justify-center items-center mt-[15] rounded-full overflow-hidden "
          source={images.highlight}
        >
          <Image source={icon} tintColor="#151312" className="size-5" />
          <Text className="font-semibold text-secondary text-base">
            {title}
          </Text>
        </ImageBackground>
      ) : (
        <View className="justify-center size-full mt-2 items-center rounded-full">
          <Image source={icon} className="size-5" tintColor="#a8b5db" />
        </View>
      )}
    </View>
  );
};

export default Tabicons;

