import { icons } from "@/constants/icons";
import { useRouter } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP } from "react-native-responsive-screen";

const MovieCard = ({
  title,
  id,
  poster_path,
  vote_average,
  release_date,
}: Movie) => {
  const router = useRouter();
  return (
    <View style={{
        width: widthPercentageToDP(28),
        marginRight: 20, 
        marginBottom: 10, 
      }}>
    <TouchableOpacity
      onPress={() => {
        router.push("/MovieDetails");
      }}
      activeOpacity={0.8}
    >
      <Image
        source={{
          uri: poster_path
            ? `https://image.tmdb.org/t/p/w500/${poster_path}`
            : "https://placehold.co/600x400/1a1a1a/ffffff.png",
        }}
        className="w-full h-48 mb-2 rounded-lg"
        resizeMode="cover"
      />
      <Text
        className="text-white my-1 font-medium"
        style={{ fontSize: hp(1.75) }}
        numberOfLines={1}
      >
        {title}
      </Text>
      <View className="flex-row gap-2 items-center justify-space-between">
        <Image source={icons.star} className="w-4 h-4" />
        <Text className="text-white" style={{ fontSize: hp(1.6) }}>{Math.round(vote_average)}</Text>
      </View>
      <Text className="text-white" style={{ fontSize: hp(1.6) }}>{release_date?.split("-")[0]}</Text>
    </TouchableOpacity></View>
  );
};

export default MovieCard;
