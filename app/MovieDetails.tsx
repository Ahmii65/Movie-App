import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetcMovieDetails } from "@/services/api";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, ScrollView, Text, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
interface infoProps {
  lable: string;
  value?: string | number | null;
}

const MovieInfo = ({ lable, value }: infoProps) => (
  <View className="items-start justify-center mt-5">
    <Text className="text-white" style={{ fontSize: hp(2) }}>
      {lable}
    </Text>
    <Text
      className="text-white mt-2"
      style={{ fontSize: hp(1.6), letterSpacing: 0.4 }}
    >
      {value || "N/A"}
    </Text>
  </View>
);
const MovieDetails = () => {
  const { movie_id } = useLocalSearchParams<{ movie_id: string }>();
  const [details, setdetails] = useState<MovieDetails | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        const data = await fetcMovieDetails(movie_id);
        setdetails(data);
        setError(null);
      } catch (err: any) {
        console.error(err);
        setError(err?.message || "An Error Occured");
        setLoading(false);
      } finally {
        setLoading(false);
        setError(null);
      }
    };
    fetchDetails();
  }, []);

  const funcToFix = (vote: number | undefined) => {
    let num = vote;
    const ratting = num?.toFixed(1);
    return ratting;
  };

  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="absolute z-0"
        resizeMode="cover"
        style={{ width: wp(100), height: hp(100) }}
      />
      {loading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size={24} color={"white"} />
        </View>
      ) : error ? (
        <View className="items-center justify-center flex-1">
          <Text className="font-medium text-2xl text-white">{error}</Text>
        </View>
      ) : (
        <View className="flex-1 ">
          <ScrollView contentContainerStyle={{ paddingBottom: hp(8) }}>
            <View>
              <Image
                source={{
                  uri: `https://image.tmdb.org/t/p/w500/${details?.poster_path}`,
                }}
                style={{
                  width: wp(100),
                  height: hp(60),
                  borderBottomRightRadius: 25,
                  borderBottomLeftRadius: 25,
                }}
                resizeMode="stretch"
              />
            </View>
            <View
              className="items-start justify-center"
              style={{ marginTop: hp(2), paddingHorizontal: wp(5) }}
            >
              <Text
                className="text-white font-bold "
                style={{ fontSize: hp(3.5) }}
              >
                {details?.original_title}
              </Text>
              <View className="flex-row mt-2 gap-2">
                <Text className="text-light-200">
                  {details?.release_date.split("-")[0]}
                </Text>
                <Text className="text-light-200" style={{ fontSize: hp(1.7) }}>
                  {details?.runtime}m
                </Text>
              </View>
              <View className="bg-dark-100 flex-row items-center mt-2 py-1 gap-2 px-1 rounded-md">
                <Image source={icons.star} className="size-4" />
                <Text className="text-white font-bold">
                  {funcToFix(details?.vote_average)}/10
                </Text>
                <Text className="text-light-200">
                  ({details?.vote_count} votes)
                </Text>
              </View>
              <MovieInfo lable="Overview" value={details?.overview} />
              <MovieInfo
                lable="Genres"
                value={details?.genres.map((g) => g.name).join(" - ") || "N/A"}
              />
            </View>
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default MovieDetails;
