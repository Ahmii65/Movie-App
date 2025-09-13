import { images } from "@/constants/images";
import { fetcMovieDetails } from "@/services/api";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, Text, View } from "react-native";

const MovieDetails = () => {
  const { movie_id } = useLocalSearchParams<{ movie_id: string }>();
  const [details, setdetails] = useState<MovieDetails | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    let isMounted = true; // assignment, not comparison

    const fetchDetails = async () => {
      try {
        setLoading(true);
        const data = await fetcMovieDetails(movie_id);
        if (isMounted) {
          // only set state if component is still mounted
          setdetails(data);
          setError(null);
        }
      } catch (err: any) {
        if (isMounted) {
          console.error(err);
          setError(err?.message || "An Error Occured");
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchDetails();

    return () => {
      isMounted = false; // cleanup to prevent updates after unmount
    };
  }, [movie_id]);

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute z-0" />

      {loading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size={24} color={"white"} />
        </View>
      ) : error ? (
        <View className="items-center justify-center flex-1">
          <Text className="font-medium text-2xl text-white">{error}</Text>
        </View>
      ) : (
        <View className="flex-1 items-center justify-center">
          <Text className="text-white font-medium text-6xl">Hello</Text>
        </View>
      )}
    </View>
  );
};

export default MovieDetails;
