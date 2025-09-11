import axios from "axios";

const baseURL = `https://api.themoviedb.org/3`;
const movieEndpoint = (params: { page: number }) =>
  `${baseURL}/discover/movie?include_adult=false&page=${params.page}&sort_by=popularity.desc`;

const queryEndpoint = (params: { name: string }) =>
  `${baseURL}/search/movie?query=${encodeURIComponent(params.name)}`;

const apiCall = async (endpoint: string) => {
  const options = {
    method: "GET",
    url: endpoint,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`,
    },
  };
  try {
    const res = await axios.request(options);
    return res.data;
  } catch (error: any) {
    let errorMessage = "An unexpected error occurred.";
    if (error.response) {
      console.error("Error:", error.response.status, error.response.data);
      errorMessage = "Something went wrong. Please try again later.";
    } else if (error.request) {
      console.error("No response received:", error.request);
      errorMessage = "Unable to reach server. Check your internet.";
    } else {
      console.error("Error setting up request:", error.message);
    }
    throw error;
  }
};

export const fetchMovies = (params: { page: number }) => {
  return apiCall(movieEndpoint(params));
};
export const fetchQueryMovies = (params: { name: string }) => {
  return apiCall(queryEndpoint(params));
};
