import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import { FlashList } from "@shopify/flash-list";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, Text, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

export default function Home() {
  const [loading, setloading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setdata] = useState<Movie[]>([]);
  const [pagee, setpage] = useState<number>(1);
  const router = useRouter();
  useEffect(() => {
    setloading(true);
    fetchMovies({ page: 1 })
      .then((data) => {
        setdata(data.results);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => setloading(false));
  }, []);

  const loadMore = () => {
    const nextPage = pagee + 1;
    setpage(nextPage);

    fetchMovies({ page: nextPage }).then((res) => {
      setdata((prev) => {
        const combined = [...prev, ...res.results];
        const unique = combined.filter(
          (movie, index, arr) =>
            arr.findIndex((m) => m.id === movie.id) === index
        );
        return unique;
      });
    });
  };
  return (
    <View className="flex-1 bg-primary">
      <StatusBar style="light" />
      <Image
        source={images.bg}
        className=" z-0 absolute"
        style={{ width: wp(100), height: hp(100) }}
        resizeMode="cover"
      />
      {loading ? (
        <ActivityIndicator
          size="large"
          color="white"
          className="items-center justify-center flex-1"
        />
      ) : error ? (
        <View className="flex-1 items-center justify-center">
          <Text className="text-white font-medium text-2xl">{error}</Text>
        </View>
      ) : (
        <FlashList<Movie>
          className="flex-1 px-3 "
          data={data}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingBottom: hp(9) }}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <View>
              <View className="items-center" style={{ marginTop: hp("7%") }}>
                <Image source={icons.logo} className="w-12 h-10" />
              </View>
              <SearchBar onPress={() => router.push("/Search")} />
              <Text
                className="text-white text-2xl font-medium"
                style={{ marginVertical: hp(1.5) }}
              >
                Latest Movies
              </Text>
            </View>
          }
          ListFooterComponent={<ActivityIndicator color="white" size={30} />}
          renderItem={({ item }) => <MovieCard {...item} />}
          onEndReached={loadMore}
          onEndReachedThreshold={0.1}
          numColumns={3}
        />
      )}
    </View>
  );
}
