import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetcMovieDetails } from "@/services/api";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface infoProps {
  lable: string;
  value?: string | number | null;
}
const MovieDetails = () => {
  const { movie_id } = useLocalSearchParams<{ movie_id: string }>();
  const [details, setdetails] = useState<MovieDetails | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { bottom } = useSafeAreaInsets();
  const router = useRouter();
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
        className="absolute z-0 w-full h-full"
        resizeMode="cover"
      />
      {loading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color={"white"} />
        </View>
      ) : error ? (
        <View className="items-center justify-center flex-1">
          <Text className="font-medium text-2xl text-white">{error}</Text>
        </View>
      ) : (
        <View className="flex-1 ">
          <ScrollView contentContainerStyle={{ paddingBottom: hp(13) }}>
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
              <MovieInfo lable="Tagline" value={details?.tagline} />
              <MovieInfo
                lable="Genres"
                value={details?.genres.map((g) => g.name).join(" - ") || "N/A"}
              />
              <View className="flex-row gap-12">
                {details?.budget ? (
                  <MovieInfo
                    lable="Budget"
                    value={`$${details?.budget / 1_000_000} Million`}
                  />
                ) : null}
                {details?.revenue ? (
                  <MovieInfo
                    lable="Revenue"
                    value={`$${details?.revenue / 1_000_000} Million`}
                  />
                ) : null}
              </View>
              <MovieInfo
                lable="Production Companies"
                value={
                  details?.production_companies
                    ?.map((p) => p.name)
                    .join(" - ") || "N/A"
                }
              />
            </View>
          </ScrollView>
          <View
            className="absolute bottom-0 left-0 right-0 px-5"
            style={{ marginBottom: bottom }}
          >
            <TouchableOpacity
              className="flex-row z-50 bg-accent items-center justify-center py-4 rounded-lg gap-1 min-h-[50px]"
              onPress={() => router.back()}
            >
              <Ionicons name="arrow-back" color={"white"} />
              <Text className="text-white">Go Back</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

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

export default MovieDetails;
