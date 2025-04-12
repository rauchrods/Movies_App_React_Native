import {
  Image,
  ImageBackground,
  ImageProps,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";

const TabIcon = ({
  focused,
  icon,
  title,
}: {
  focused: boolean;
  icon: ImageProps;
  title: string;
}) => {
  return focused ? (
    <ImageBackground source={images.highlight} style={styles.container}>
      <Image source={icon} tintColor={"#151312"} />
      <Text style={styles.text}>{title}</Text>
    </ImageBackground>
  ) : (
    <View style={styles.container}>
      <Image source={icon} tintColor={"#A8B5DB"} />
    </View>
  );
};

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarItemStyle: {
          marginTop: 4,
        },
        tabBarStyle: {
          backgroundColor: "#0f0D23",
          borderRadius: 50,
          marginHorizontal: 20,
          marginBottom: 36,
          height: 52,
          overflow: "hidden",
          position: "absolute",
          borderwidth: 1,
          borderColor: "#0f0d23",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }: { focused: boolean }) => (
            <TabIcon focused={focused} icon={icons.home} title={"Home"} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          headerShown: false,
          tabBarIcon: ({ focused }: { focused: boolean }) => (
            <TabIcon focused={focused} icon={icons.search} title={"Search"} />
          ),
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          title: "Saved",
          headerShown: false,
          tabBarIcon: ({ focused }: { focused: boolean }) => (
            <TabIcon focused={focused} icon={icons.save} title={"Save"} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }: { focused: boolean }) => (
            <TabIcon focused={focused} icon={icons.person} title={"Profile"} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    minWidth: 110,
    minHeight: 110,
    // borderRadius: "80%",
    gap: 4,
    overflow: "hidden",
  },
  text: {
    fontWeight: "bold",
    color: "black",
  },
});
