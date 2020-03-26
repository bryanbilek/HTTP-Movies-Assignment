import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import UpdateMovie from "./Movies/UpdateMovie";
import axios from 'axios';

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);

  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => setMovieList(res.data))
      .catch(err => console.log(err.response));
  };

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  useEffect(() => {
    getMovieList();
  }, []);

  return (
    <>
      <SavedList list={savedList} />

      <Route exact path="/">
        <MovieList movies={movieList} />
      </Route>

      {/* <Route path="/movies/:id" render={props => (
        <Movie {...props} addToSavedList={addToSavedList} getMovieList={getMovieList} />)}/> */}

<Route path="/movies/:id">
  <Movie addToSavedList={addToSavedList} getMovieList={getMovieList} />
</Route>

<Route path="/update-movie/:id">
  <UpdateMovie addToSavedList={addToSavedList} getMovieList={getMovieList} movies={movieList}/>
</Route>
      

      {/* <Route exact path="/update-movie/:id" redner={props => (
         <UpdateMovie {...props} addToSavedList={addToSavedList} getMovieList={getMovieList} movies={movieList} />)}/> */}
    </>
  );
};

export default App;
