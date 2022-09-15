import React, { useState, useEffect } from "react";
import MoviesResult from "./components/MoviesResult";
import SearchBox from "./components/SearchBox";
import axios from "axios";

const Home = () => {

  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const getMovieRequest = async (searchValue) => {

    const url = `http://localhost:8000/api/movies/?search=${searchValue}`;
    axios.get(url).then((response) => {
		setMovies(response.data);
		console.log(response.data);
    });
  };

  useEffect(() => {getMovieRequest(searchValue);}, [searchValue]);

  return (
    <div className="homeSearch">
      <div className="searchbox">
        <h1>Search Movie by title</h1>
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>
      <div className="searchResults">
        <MoviesResult movies={movies} />
      </div>
    </div>
  );
};

export default Home;
