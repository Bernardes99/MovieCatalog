import React from "react";
import { Link } from "react-router-dom";

const MoviesResult = (props) => {

  if (Object.keys(props.movies).length === 0) {
    console.log("oi")
    return(
      <div >
        <h3>No results!</h3>
      </div>
    ) 
  }   
  else {
    return (
      <div className="flex-container">
        {props.movies.map((movie) => (
          <Link to={`/movies/${movie.id}`} style={{ textDecoration: "none" }}>
            <div class="movies-box" key={movie.id}>
              <div class="movies-img">
                <img src={movie.image_url} alt="movie cover" />
              </div>
              <div class="movies-title">
                <p>{movie.title}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    );
  }
};

export default MoviesResult;
