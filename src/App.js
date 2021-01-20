import React from "react";
import { MovieApiProvider } from "./hooks/useMovieApi";
import Main from "./components/Main";

export default function App() {
  return (
    <div className="App">
      <MovieApiProvider>
        <Main />
      </MovieApiProvider>
    </div>
  );
}
