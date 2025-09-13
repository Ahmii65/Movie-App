import MovieCard from "@/components/MovieCard";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchQueryMovies } from "@/services/api";
import { updateSearchCount } from "@/services/appwrite";
import { Ionicons } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, Text, TextInput, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

export default function Search() {
  const [loading, setloading] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [data, setdata] = useState<Movie[]>([]);

  const [input, setInput] = useState<string>("");

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (input.trim()) {
        setloading(true);
        setdata([]);
        setError(null);
        fetchQueryMovies({ name: input })
          .then((data) => {
            setdata(data.results);
          })
          .catch((err) => {
            setError(err.message);
          })
          .finally(() => setloading(false));
      } else {
        setdata([]);
        setError(null);
        setloading(false);
      }
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [input]);

  useEffect(() => {
    const dbhandler = async () => {
      if (data.length > 0 && input.trim())
        await updateSearchCount(input, data[0]);
    };
    dbhandler();
  }, [data]);

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className=" z-0 absolute" resizeMode="cover" />
      <FlashList<Movie>
        className="flex-1 px-3"
        data={data}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: hp(8) }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <MovieCard {...item} />}
        numColumns={3}
        ListHeaderComponent={
          <View>
            <View className="items-center" style={{ marginTop: hp("7%") }}>
              <Image source={icons.logo} className="w-12 h-10" />
            </View>
            <View
              className="flex-row items-center p-[7.5px] bg-dark-200 rounded-full"
              style={{ marginTop: hp(2.5) }}
            >
              <View className="items-center justify-center pl-4">
                <Ionicons name="search" size={24} color="white" />
              </View>
              <TextInput
                placeholder="Search for Movies"
                placeholderTextColor={"white"}
                onChangeText={(text) => setInput(text)}
                value={input}
                className="justify-center flex-1 pl-2 text-white"
              />
            </View>
            {loading && (
              <ActivityIndicator color="white" size={30} className="my-1" />
            )}

            {error && (
              <Text className="text-red-500 text-center my-3 font-medium text-2xl">
                {error}
              </Text>
            )}
            {data.length > 0 && (
              <Text
                className="text-white text-2xl font-medium"
                style={{ marginVertical: hp(1.5) }}
              >
                Matched Results for{" "}
                <Text className="text-purple-500 text-2xl font-medium">
                  {input}
                </Text>
              </Text>
            )}
          </View>
        }
        ListEmptyComponent={
          !loading && !error ? (
            <View className="px-5" style={{ marginTop: hp(5) }}>
              <Text className="text-white text-center font-medium text-2xl">
                {input.trim() ? "No Result Found" : "Search For a Movie"}
              </Text>
            </View>
          ) : null
        }
      />
    </View>
  );
}
