import React, { createContext, useContext, useState } from "react";
import debouce from "lodash/debounce";
import { searchMovies, getMovieDetails } from "../apis";

const Context = createContext({
  searchedMovies: [],
  movies: [],
});

export const MovieApiProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [searchedMovies, setSearchedMovies] = useState([]);

  const searchMovieByName = async (name) => {
    try {
      if (!name) {
        setSearchedMovies([]);
        return;
      }
      const res = await searchMovies(name);
      setSearchedMovies(res.data.results);
    } catch (error) {
      console.info(error);
    }
  };
  const searchMovieByNameDebounced = debouce(searchMovieByName, 200);

  const addToWatched = (movieId, isChecked) => {
    const index = movies.findIndex((m) => m.id === movieId);
    let updatedMovies = movies.slice(0);
    updatedMovies[index] = {
      ...updatedMovies[index],
      watched: isChecked,
    };
    setMovies(updatedMovies);
  };
  const addToUnwatched = async (movieId) => {
    try {
      const res = await getMovieDetails(movieId);
      if (!movies.map(({ id }) => id).includes(res.data.id)) {
        setMovies(movies.concat(res.data));
      }
    } catch (error) {
      console.info(error);
    }
  };

  return (
    <Context.Provider
      value={{
        movies,
        searchedMovies,

        searchMovieByNameDebounced,
        addToWatched,
        addToUnwatched,
      }}
    >
      {children}
    </Context.Provider>
  );
};

const useMovieApi = () => useContext(Context);
export default useMovieApi;
