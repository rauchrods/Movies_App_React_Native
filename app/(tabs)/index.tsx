import {
  ActivityIndicator,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { COLORS } from "../../constants/colors";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";
import SearchBar from "@/components/SearchBar";
import { useRouter } from "expo-router";
import useFetch from "@/services/useFetch";
import { fetchMovies } from "@/services/api";
import MovieCard from "@/components/MovieCard";

const Index = () => {
  const router = useRouter();

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() => fetchMovies({ query: "" }));

  return (
    <SafeAreaView style={styles.container}>
      <Image source={images.bg} style={styles.bgImage} />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
      >
        <Image source={icons.logo} style={styles.logo} />
        {moviesLoading ? (
          <ActivityIndicator size="large" color="white" />
        ) : moviesError ? (
          <Text>Error: {moviesError.message}</Text>
        ) : (
          <View style={{ flex: 1, marginTop: 5 }}>
            <SearchBar
              onPress={() => router.push("/search")}
              placeholder="Search"
            />
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: 20,
                textAlign: "center",
                marginVertical: 10,
              }}
            >
              Latest Movies
            </Text>
            <FlatList
              data={movies}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => <MovieCard {...item} />}
              numColumns={3}
              columnWrapperStyle={{
                justifyContent: "space-between",
                gap: 10,
                paddingRight: 5,
                marginBottom: 5,
              }}
              style={{ marginTop: 5, paddingBottom: 30 }}
              scrollEnabled={false}
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  bgImage: {
    position: "absolute",
    width: "100%",
    zIndex: 0,
    // borderWidth: 1,
    // borderColor: "red",
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 5,
    // borderWidth: 1,
    // borderColor: "green",
  },
  logo: {
    width: 40,
    height: 40,
    marginTop: 20,
    marginHorizontal: "auto",
  },
});
