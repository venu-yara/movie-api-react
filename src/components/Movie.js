import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";

import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Checkbox from "@material-ui/core/Checkbox";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";

import useMovieApi from "../hooks/useMovieApi";

import { TabButton } from "./styled";

const muiStyles = () => ({
  watchedChx: {
    display: "flex",
    alignItems: "center",
  },
  movieDetails: {
    justifyContent: "space-between",
    paddingLeft: 40,
    paddingRight: 40,
  },
  panelsCollapsed: {
    marginTop: 20,
  },
  searchTextField: {
    marginBottom: 20,
  },
  mySearchField: {
    minWidth: 280,
  },
});

const Movie = ({ classes }) => {
  const { movies, addToWatched } = useMovieApi();
  const [isWatched, setIsWatched] = useState(false);
  const [searchText, setSearchText] = useState("");

  return (
    <>
      <Grid container alignItems="baseline">
        <Grid item md={6} container>
          <TabButton active={!isWatched} onClick={() => setIsWatched(false)}>
            <VisibilityOffIcon />
            Unwatched
          </TabButton>
          <TabButton active={isWatched} onClick={() => setIsWatched(true)}>
            <VisibilityIcon />
            Watched
          </TabButton>
        </Grid>
        <Grid item md={6} container justify="flex-end">
          <TextField
            className={classes.mySearchField}
            variant="outlined"
            placeholder="Search My Movies"
            value={searchText}
            onChange={({ target: { value } }) => setSearchText(value)}
          />
        </Grid>
      </Grid>
      <div className={classes.panelsCollapsed}>
        {movies
          .filter(({ title }) => !searchText || title.includes(searchText))
          .filter(({ watched }) => (isWatched ? watched : !watched))
          .map((movie, idx) => (
            <ExpansionPanel key={`${idx}-panel`}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>{movie.title}</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className={classes.movieDetails}>
                <div>
                  <Typography>
                    Year: {new Date(movie.release_date).getFullYear()}
                  </Typography>
                  <Typography>Runtime: {movie.runtime} m</Typography>
                  <Typography>IMDB Score: {movie.vote_average}</Typography>
                </div>
                <div className={classes.watchedChx}>
                  <Checkbox
                    id={`${idx}-watch-check`}
                    checked={movie.watched}
                    onChange={({ target: { checked } }) =>
                      addToWatched(movie.id, checked)
                    }
                    color="primary"
                  />
                  <Typography style={{ fontSize: 14 }}>Watched</Typography>
                </div>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          ))}
      </div>
    </>
  );
};

export default withStyles(muiStyles)(Movie);
