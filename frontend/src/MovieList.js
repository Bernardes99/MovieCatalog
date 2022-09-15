import { useForm } from "react-hook-form";
import React, { useState, useEffect } from "react";
import axios from "axios";
import MoviesResult from "./components/MoviesResult";

export default function App() {

    const [movies, setMovies] = useState([]);
    const [yearValue, setYearValue] = useState("");
    const [genreValue, setGenreValue] = useState("none");
    const [orderingOption, setOrderingOption] = useState("title");

    function setValues(data) {
        setYearValue(Object.values(data)[0])
        setGenreValue(Object.values(data)[1])
        setOrderingOption(Object.values(data)[2])
    }       
    const { register, handleSubmit } = useForm();
    const onSubmit = data => setValues(data);

    const getMovieRequest = async (yearValue, genreValue, orderingOption) => {    
        const url = `http://localhost:8000/api/movies/?year=${yearValue}&ordering=${orderingOption}`;
        axios.get(url).then((response) => {
            if (genreValue != "none" ) {
                const filtered = response.data.filter((movie)=> movie.genres.includes(genreValue)); 
                setMovies(filtered);
                console.log(filtered)
            } 
            else {
                setMovies(response.data);
                console.log(response.data)
            }
            //setMovies(response.data);
        });
    };

    useEffect(() => {getMovieRequest(yearValue, genreValue, orderingOption);}, [yearValue, genreValue, orderingOption]);

    return (
        <div className="movies-filter">
            <form onSubmit={handleSubmit(onSubmit)} className="filter-options">
                <div className="filter-options-year">
                    <label>Year: </label>
                    <input type="number" {...register("year")} />
                </div>
                <div className="filter-options-other">
                    <label>Genre: </label>
                    <select {...register("gender")}>
                        <option value="none">None</option>
                        <option value="Action">Action</option>
                        <option value="Adventure">Adventure</option>
                        <option value="Animation">Animation</option>
                        <option value="Comedy">Comedy</option>
                        <option value="Crime">Crime</option>
                        <option value="Drama">Drama</option>
                        <option value="Fantasy">Fantasy</option>
                        <option value="Fiction">Fiction</option>
                        <option value="History">History</option>
                        <option value="Horror">Horror</option>
                        <option value="Mystery">Mystery</option>
                        <option value="Musical">Musical</option>
                        <option value="Romance">Romance</option>
                        <option value="Sci-Fi">Sci-Fi</option>
                        <option value="Thriller">Thriller</option>
                        <option value="Western">Western</option>
                    </select>
                </div>

                <div className="filter-options-other">
                    <label>Order by: </label>
                    <select {...register("ordering")}>
                        <option value="title">Title - ascending</option>
                        <option value="-title">Title - descending</option>
                        <option value="rating">Rating - ascending</option>
                        <option value="-rating">Rating - descending</option>
                        <option value="year">Year - ascending</option>
                        <option value="-year">Year - descending</option>
                    </select>
                </div>
                
                <input className="button-filter" value="Filter" type="submit"/>
            </form>


            <div className="searchResults">
                <MoviesResult movies={movies} />
            </div>
        </div>
    );
}