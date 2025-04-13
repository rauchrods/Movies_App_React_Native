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
import React, { useEffect, useState } from "react";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";
import { COLORS } from "@/constants/colors";
import SearchBar from "@/components/SearchBar";
import { useRouter } from "expo-router";
import useFetch from "@/services/useFetch";
import { fetchMovies } from "@/services/api";
import MovieCard from "@/components/MovieCard";

const Search = () => {
  const router = useRouter();

  const [query, setQuery] = useState<string>("");

  const {
    data: searchedMovies,
    loading: searchedMoviesLoading,
    error: searchedMoviesError,
    refetch: searchedMoviesRefetch,
    reset,
  } = useFetch(() => fetchMovies({ query: query }), false);

  // useEffect(() => {
  //   reset();
  // }, []);

  useEffect(() => {
    const func = async () => {
      if (query.trim()) {
        await searchedMoviesRefetch();
      } else {
        reset();
      }
    };

    const debounce = setTimeout(() => {
      func();
    }, 1000);

    return () => clearTimeout(debounce);
  }, [query]);

  // console.log("searchedMovies", searchedMovies);

  const onSearch = (text: string): void => {
    setQuery(text);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image source={images.bg} style={styles.bgImage} />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
      >
        <Image source={icons.logo} style={styles.logo} />
        {searchedMoviesLoading ? (
          <ActivityIndicator size="large" color="white" />
        ) : searchedMoviesError ? (
          <Text>Error: {searchedMoviesError.message}</Text>
        ) : (
          <View style={{ flex: 1, marginTop: 5 }}>
            <SearchBar
              // onPress={() => {}}
              placeholder="Search"
              onChangeText={onSearch}
              value={query}
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
              Search for {query} ?
            </Text>
            <FlatList
              data={searchedMovies}
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
              ListEmptyComponent={() =>
                !searchedMoviesLoading &&
                !searchedMoviesError && (
                  <View style={{ alignItems: "center", marginBottom: 10 }}>
                    <Text
                      style={{
                        color: COLORS.light[100],
                        fontSize: 28,
                        fontWeight: "bold",
                      }}
                    >
                      No results
                    </Text>
                  </View>
                )
              }
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Search;

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
