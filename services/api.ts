export const TMDB_CONFIG = {
  BASE_URL: "https://api.themoviedb.org/3",
  API_KEY: process.env.EXPO_PUBLIC_API_KEY,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_API_KEY}`,
  },
};

export const fetchMovies = async ({ query }: { query: string }) => {
  let endpoint = query
    ? `/search/movie?query=${encodeURIComponent(query)}`
    : `/discover/movie?sort_by=popularity.desc`;

  endpoint = TMDB_CONFIG.BASE_URL + endpoint;

  const response = await fetch(endpoint, {
    headers: TMDB_CONFIG.headers,
  });

  if (!response.ok) {
    //@ts-ignore
    throw new Error("Failed to fetch movies", response.statusText);
  }
  const data = await response.json();

  return data.results;
};

export const fetchMovieDetails = async ({
  id,
}: {
  id: string | string[];
}): Promise<MovieDetails | undefined> => {
  try {
    const endpoint =
      TMDB_CONFIG.BASE_URL + `/movie/${id}?api_key=${TMDB_CONFIG.API_KEY}`;

    const response = await fetch(endpoint, {
      method: "GET",
      headers: TMDB_CONFIG.headers,
    });

    if (!response.ok) {
      //@ts-ignore
      throw new Error("Failed to fetch movies", response.statusText);
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchMovieCredits = async ({ id }: { id: string }) => {
  const endpoint = TMDB_CONFIG.BASE_URL + `/movie/${id}/credits`;

  const response = await fetch(endpoint, {
    headers: TMDB_CONFIG.headers,
  });

  if (!response.ok) {
    //@ts-ignore
    throw new Error("Failed to fetch movies", response.statusText);
  }
  const data = await response.json();

  return data;
};

export const fetchMovieReviews = async ({ id }: { id: string }) => {
  const endpoint = TMDB_CONFIG.BASE_URL + `/movie/${id}/reviews`;

  const response = await fetch(endpoint, {
    headers: TMDB_CONFIG.headers,
  });

  if (!response.ok) {
    //@ts-ignore
    throw new Error("Failed to fetch movies", response.statusText);
  }
  const data = await response.json();

  return data;
};
