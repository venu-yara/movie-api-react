import React from "react";

import Box from "@material-ui/core/Box";

import Movie from "./Movie";
import SearchInput from "./custom/SearchInput";

const Main = () => {
  return (
    <Box p={6}>
      <SearchInput />
      <Movie />
    </Box>
  );
};

export default Main;
