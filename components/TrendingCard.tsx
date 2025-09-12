import { images } from "@/constants/images";
import MaskedView from "@react-native-masked-view/masked-view";
import { useRouter } from "expo-router";
import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import {
  heightPercentageToDP,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

const TrendingCard = ({
  movie: { movie_id, title, poster_url },
  index,
}: TrendingCardProps) => {
  const router = useRouter();
  return (
    <Pressable
      style={{ width: wp(35) }}
      className="pl-[12] relative"
      onPress={() =>
        router.push({ pathname: "/MovieDetails", params: { movie_id } })
      }
    >
      <Image
        source={{ uri: poster_url }}
        className="w-full h-48 rounded-lg mb-2"
        resizeMode="cover"
      />
      <View className="absolute bottom-9 left-[-4px]">
        <MaskedView
          maskElement={
            <Text className="text-white text-7xl font-bold">{index + 1}</Text>
          }
        >
          <Image
            source={images.rankingGradient}
            className="size-16"
            resizeMode="cover"
          />
        </MaskedView>
      </View>
      <Text
        className="text-white font-medium my-1"
        style={{ fontSize: heightPercentageToDP(1.75) }}
        numberOfLines={1}
      >
        {title}
      </Text>
    </Pressable>
  );
};

export default TrendingCard;
