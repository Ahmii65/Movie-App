import MovieCard from "@/components/MovieCard";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { AppContext } from "@/context/context";
import { fetchQueryMovies } from "@/services/api";
import { Ionicons } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import { debounce } from "lodash";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { Image, Text, TextInput, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

export default function Search() {
  const { loading, setloading } = useContext(AppContext)!;
  const [data, setdata] = useState<Movie[]>([]);
  const handlesearch = (text: string) => {
    if (text.trim() === "") {
      setdata([]);
      return;
    }
    setloading(true);
    fetchQueryMovies({ name: text }).then((data) => {
      setdata(data.results);
      setloading(false);
    });
  };
  const handleDebounce = useCallback(debounce(handlesearch, 150), []);
  useEffect(() => {
    return () => handleDebounce.cancel();
  }, [handleDebounce]);
  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className=" z-0 absolute"
        style={{ width: wp(100) }}
      />
      <FlashList<Movie>
        className="flex-1 px-3"
        data={data}
        estimatedItemSize={243}
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
              className="flex-row items-center p-[7.5px] bg-secondary rounded-full"
              style={{ marginTop: hp(2.5) }}
            >
              <View className="items-center justify-center pl-4">
                <Ionicons name="search" size={24} color="white" />
              </View>
              <TextInput
                placeholder="Search for Movies"
                placeholderTextColor={"white"}
                onChangeText={(text) => handleDebounce(text)}
                className="justify-center flex-1 pl-2 color-white"
              />
            </View>
            {data.length > 0 && (
              <Text
                className="text-white text-2xl font-medium"
                style={{ marginVertical: hp(1.5) }}
              >
                Matched Results
              </Text>
            )}
          </View>
        }
      />
    </View>
  );
}
