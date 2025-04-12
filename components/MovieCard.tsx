import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { icons } from "@/constants/icons";
import { COLORS } from "@/constants/colors";

const MovieCard = ({
  id,
  poster_path,
  title,
  vote_average,
  release_date,
}: Movie) => {
  const route = useRouter();
  return (
    <TouchableOpacity
      style={styles.movieCard}
      onPress={() => route.push(`/movies/${id}`)}
    >
      <Image
        source={{
          uri: poster_path
            ? `https://image.tmdb.org/t/p/w500/${poster_path}`
            : "https://placeholder.co/600x400/1a1a1a/ffffff.png",
        }}
        style={{
          width: "100%",
          height: 200,
          marginBottom: 5,
          borderRadius: 10,
        }}
      />
      <Text
        style={{ color: "white", fontWeight: "bold", marginBottom: 5 }}
        numberOfLines={1}
      >
        {title}
      </Text>
      <View style={styles.rating}>
        <Image source={icons.star} />
        <Text style={{ color: "white" }}>{Math.round(vote_average / 2)}</Text>
      </View>
      <View style={styles.releaseInfo}>
        <Text style={{ color: COLORS.light[200] }}>
          {release_date.split("-")[0]}
        </Text>
        <Text style={{ color: COLORS.light[200] }}>{"Movie"}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default MovieCard;

const styles = StyleSheet.create({
  movieCard: { width: "30%", marginBottom: 15 },
  rating: {
    flexDirection: "row",
    alignItems: "center",
    rowGap: 10,
    marginBottom: 3,
    columnGap: 5,
  },
  releaseInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
