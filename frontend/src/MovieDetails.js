import { useParams, useHistory } from "react-router-dom";
import useFetch from "./useFetch";
import React, { useState } from "react";
import axios from "axios";
import {BeatLoader} from 'react-spinners';
import { Link } from 'react-router-dom';


const MovieDetails = () => {
  
  const { id } = useParams();
  const {
    data: movie,
    isPending,
    error,
  } = useFetch("http://localhost:8000/api/movies/" + id);

  let history = useHistory();

  const [show, setShow] = useState(false);

  const handleDelete = (id) => {
    axios.delete(`/api/movies/${id}/`);
  };

  return (
    <div>
      {error && <div className="error">{error}</div>}
      {isPending && <div className="loading"><BeatLoader/></div>}
      {movie && (
        <div className="movie-details-box">
          <div className="flex-container">
            <div>
              <img src={movie.image_url} alt="movie cover" />
            </div>

            <div className="movie-details">
              <h1>{movie.title}</h1>
              <div className="flex-container">
                <p>{movie.year}</p>
                <p>|</p>
                <p>{movie.runtime} minutes</p>
                <p>|</p>
                <p>{movie.rating}</p>
                <span id="rating"></span>
              </div>
              <p id="description">{movie.description}</p>
              <br />

              <div className="flex-container2">
                <p id="topic">Stars: </p>
                <p>{movie.cast}</p>
              </div>

              <div className="flex-container2">
                <p id="topic">Directors: </p>
                <p>{movie.directors}</p>
              </div>

              <div className="flex-container2">
                <p id="topic">Genres:</p>
                <p>{Object.values(movie.genres).join(", ")}</p>
              </div>

              <div className="flex-container2">
                <p id="topic">Language: </p>
                <p>{movie.language}</p>
              </div>

              <div className="flex-container">

                <button class="button-trailer" onClick={() => setShow(!show)}>
                  Watch trailer
                </button>

                <button
                  class ="button-delete"
                  onClick={() => {
                    const confirmBox = window.confirm(
                      "Do you really want to delete this movie?"
                    );
                    if (confirmBox === true) {
                      handleDelete(movie.id);
                      window.location.replace("/movies");
                    }
                  }}
                >
                  Delete
                </button>

                <Link className="button-edit" role="button" to={`/editMovie/${movie.id}`}>Edit</Link>

              </div>
            </div>
          </div>

          {show ? (
            <div className="movie-trailer">
              <iframe title="trailer" src={movie.trailer_url}></iframe>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
