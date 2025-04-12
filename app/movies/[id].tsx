import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import useFetch from "@/services/useFetch";
import { fetchMovieDetails } from "@/services/api";
import { COLORS } from "@/constants/colors";
import { icons } from "@/constants/icons";

const MovieDetails = () => {
  const { id } = useLocalSearchParams();

  const {
    data: movieDetails,
    loading: movieDetailsLoading,
    error: movieDetailsError,
  } = useFetch(() => fetchMovieDetails({ id }));

  //   console.log("movieDetails", movieDetails);
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.primary }}>
      <ScrollView style={{ paddingBottom: 40 }}>
        <View style={{}}>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500/${movieDetails?.poster_path}`,
            }}
            style={{ width: "100%", height: 550 }}
            resizeMode="stretch"
          />
        </View>
        <View style={{ marginTop: 6, padding: 14 }}>
          <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
            {movieDetails?.title}
          </Text>
          <View style={{ flexDirection: "row", gap: 15, marginTop: 10 }}>
            <Text style={{ color: "white", fontWeight: "bold" }}>
              {movieDetails?.release_date}
            </Text>
            <Text style={{ color: "white", fontWeight: "bold" }}>
              {movieDetails?.runtime} m
            </Text>
          </View>
          <View style={styles.ratingContainer}>
            <Image source={icons.star} />
            <Text style={{ color: "white", fontWeight: "bold" }}>
              {Math.round(movieDetails ? movieDetails.vote_average : 0)}
            </Text>
            <Text
              style={{
                color: COLORS.light[300],
                fontWeight: "bold",
                marginLeft: 8,
              }}
            >
              ({movieDetails?.vote_count} votes)
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default MovieDetails;

const styles = StyleSheet.create({
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 10,
    backgroundColor: COLORS.dark[100],
    padding: 10,
    alignSelf: "flex-start",
    borderRadius: 10,
  },
});
