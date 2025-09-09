import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, Text, View } from "react-native";
import { heightPercentageToDP } from "react-native-responsive-screen";
interface Props {
  onPress: () => void;
}
const SearchBar = ({ onPress }: Props) => {
  return (
    <Pressable
      className="flex-row items-center bg-secondary rounded-full"
      style={{ marginTop: heightPercentageToDP(2.5),padding:15 }}
      onPress={onPress}
    >
      <View className="items-center justify-center pl-2">
        <Ionicons name="search" size={24} color="white" />
      </View>
      <Text className="justify-center flex-1 pl-2 color-white">
        Search for Movies
      </Text>
    </Pressable>
  );
};

export default SearchBar;
