import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import useFetch from "@/services/useFetch";
import { fetchMovieDetails } from "@/services/api";
import { COLORS } from "@/constants/colors";
import { icons } from "@/constants/icons";

const MovieInfo = ({
  label,
  value,
}: {
  label: string;
  value?: string | number | null;
}) => {
  return (
    <View style={{ gap: 8, marginVertical: 12 }}>
      <Text
        style={{ color: COLORS.light[300], fontWeight: "bold", fontSize: 16 }}
      >
        {label}
      </Text>
      <Text style={{ color: COLORS.light[200] }}>{value || "N/A"}</Text>
    </View>
  );
};

const MovieDetails = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const {
    data: movieDetails,
    loading: movieDetailsLoading,
    error: movieDetailsError,
  } = useFetch(() => fetchMovieDetails({ id }));

  console.log("moviedetails", movieDetails);

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
        <View style={{ marginTop: 6, padding: 16 }}>
          <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
            {movieDetails?.title}
          </Text>
          <View style={{ flexDirection: "row", gap: 15, marginTop: 10 }}>
            <Text style={{ color: COLORS.light[300], fontWeight: "bold" }}>
              {movieDetails?.release_date}
            </Text>
            <Text style={{ color: COLORS.light[300], fontWeight: "bold" }}>
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
          <MovieInfo label="Overview" value={movieDetails?.overview} />
          <MovieInfo
            label="Genres"
            value={movieDetails?.genres.map((genre) => genre.name).join(" - ")}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              columnGap: 30,
            }}
          >
            <MovieInfo
              label="Budet"
              value={
                movieDetails?.budget
                  ? `$${movieDetails.budget / 1000000} million`
                  : "N/A"
              }
            />
            <MovieInfo
              label="Revenue"
              value={
                movieDetails?.revenue
                  ? `$${Math.round(movieDetails.revenue / 1000000)} million`
                  : "N/A"
              }
            />
          </View>
          <MovieInfo
            label="Production Companies"
            value={movieDetails?.production_companies
              .map((company) => company.name)
              .join(" - ")}
          />
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Image source={icons.arrow} tintColor={"white"} />
            <Text style={{ color: "white", fontWeight: "bold" }}>Back</Text>
          </TouchableOpacity>
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
  backButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    backgroundColor: COLORS.accent,
    padding: 10,
    borderRadius: 20,
    marginTop: 10,
    marginBottom: 30,
  },
});
