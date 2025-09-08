import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { FlatList, Image, Text, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

export default function Home() {
  const [data, setdata] = useState<Movie[]>([]);
  const router = useRouter();
  useEffect(() => {
    fetchMovies().then((data) => {
      setdata(data.results);
    });
  }, []);
  return (
    <View className="flex-1 bg-primary">
      <StatusBar style="light" />
      <Image
        source={images.bg}
        className=" z-0 absolute"
        style={{ width: wp(100) }}
      />

      <FlatList<Movie>
        className="flex-1 px-3"
        data={data}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
        ListHeaderComponent={
          <View>
            <View className="items-center" style={{ marginTop: hp("7%") }}>
              <Image source={icons.logo} className="w-12 h-10" />{" "}
            </View>
            <SearchBar
              placeHolder={"Search for Movies"}
              onPress={() => router.push("/Search")}
            />
          </View>
        }
        renderItem={({ item }) => (
          <View className="flex-1">
            <Text className="text-white text-5xls">{item.title}</Text>
          </View>
        )}
      />
    </View>
  );
}
