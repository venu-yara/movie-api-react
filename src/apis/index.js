import axios from "axios";
import * as queryString from "query-string";
export const baseUrl = "https://api.themoviedb.org";

const API_KEY = process.env.REACT_APP_API_KEY;

async function get(path, queryParams = {}) {
  const qry = queryString.stringify(
    { ...queryParams, api_key: API_KEY },
    { arrayFormat: "bracket" }
  );
  return await axios.get(`${path}${qry ? "?" : ""}${qry}`);
}

export function searchMovies(query) {
  return get(`${baseUrl}/3/search/movie`, { query });
}

export function getMovieDetails(movieId) {
  return get(`${baseUrl}/3/movie/${movieId}`);
}
