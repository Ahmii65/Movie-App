import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

const MovieDetails = () => {
  const { movie_id } = useLocalSearchParams();
  console.log("Movie ID:", movie_id);
  return (
    <View className="flex-1 justify-center items-center">
      <Text>{movie_id}</Text>
    </View>
  );
};

export default MovieDetails;
