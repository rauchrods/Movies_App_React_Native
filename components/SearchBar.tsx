import { Image, StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { COLORS } from "@/constants/colors";
import { icons } from "@/constants/icons";

interface SearchProps {
  onPress?: () => void;
  placeholder: string;
  onChangeText?: (text: string) => void;
  value?: string;
}

const SearchBar = ({
  onPress,
  placeholder,
  onChangeText,
  value,
}: SearchProps) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: COLORS.dark[100],
        paddingHorizontal: 20,
        marginHorizontal: 15,
        height: 50,
        gap: 10,
        marginVertical: 15,
        borderRadius: 30,
      }}
    >
      <Image
        source={icons.search}
        resizeMode="contain"
        style={{ width: 20, height: 20 }}
        tintColor={COLORS.light[100]}
      />
      <TextInput
        onPress={onPress}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={"#A8B5DB"}
        style={{
          flex: 1,
          color: COLORS.light[100],
        }}
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({});
