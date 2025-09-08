import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { TextInput, View } from "react-native";
import { heightPercentageToDP } from "react-native-responsive-screen";
interface Props {
  placeHolder: string;
  onPress: () => void;
}
const SearchBar = ({ placeHolder, onPress }: Props) => {
  const [textInput, settextInput] = useState<string>("");

  const handleQuery = (text: string) => {
    settextInput(text);
  };
  return (
    <View className="flex-row items-center p-2 rounded-full bg-secondary" style={{marginVertical:heightPercentageToDP(2)}}>
      <View className="items-center justify-center pl-2">
        <Ionicons name="search" size={24} color="#ab8bff" />
      </View>
      <TextInput
        placeholder={placeHolder}
        onChangeText={(text) => handleQuery(text)}
        onPress={onPress}
        placeholderTextColor={"#ab8bff"}
        className="justify-center flex-1 pl-2 color-accent"
      />
    </View>
  );
};

export default SearchBar;
