import React, { useEffect, useState, useMemo, useRef } from "react";
import styled from "styled-components";

import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import MenuItem from "@material-ui/core/MenuItem";
import SearchIcon from "@material-ui/icons/Search";

import useMovieApi from "../../hooks/useMovieApi";

const StyledMenu = styled.div`
  position: absolute;
  background-color: white;
  z-index: 9990;
  li {
    border: 2px solid #ccc;
  }
`;

const SearchInput = () => {
  const {
    movies,
    searchedMovies,
    searchMovieByNameDebounced,
    addToUnwatched,
  } = useMovieApi();

  const menuRef = useRef(null);
  const [dbSearchText, setDbSearchText] = useState("");
  const [hideMenu, setHideMenu] = useState(false);

  const handleClickOutOfMenu = (e) => {
    if (menuRef && menuRef.current && !menuRef.current.contains(e.target)) {
      setHideMenu(true);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutOfMenu);
    return () => document.addEventListener("mousedown", handleClickOutOfMenu);
  }, []);

  // Filter searched movies which are not included in movies
  const filteredMovies = useMemo(() => {
    const movieIds = movies.map(({ id }) => id);
    return searchedMovies.filter(({ id }) => !movieIds.includes(id));
  }, [movies, searchedMovies]);

  return (
    <div styled={{ position: "relative" }}>
      <TextField
        variant="outlined"
        placeholder="Search MovieDB"
        value={dbSearchText}
        onChange={({ target: { value } }) => {
          setHideMenu(false);
          setDbSearchText(value);
          searchMovieByNameDebounced(value);
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconButton>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      {dbSearchText && !hideMenu && (
        <StyledMenu ref={menuRef}>
          {filteredMovies.map((sm, idx) => (
            <MenuItem
              key={`${idx}-item`}
              onClick={() => {
                addToUnwatched(sm.id);
              }}
            >
              {sm.title}
            </MenuItem>
          ))}
        </StyledMenu>
      )}
    </div>
  );
};

export default SearchInput;
