import React, { Component } from "react";
import axios from "axios";
import { Multiselect } from 'multiselect-react-dropdown';

var selected_genres = []

class FormMovie extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      year: "",
      description: "",
      rating: "",
      trailer_url: "",
      image_url: "",
      directors: "",
      cast: "",
      language: "",
      runtime: "",
      options_list : [
        {genre: 'Action'},
        {genre: 'Adventure'},
        {genre: 'Animation'},
        {genre: 'Comedy'},
        {genre: 'Crime'},
        {genre: 'Drama'},
        {genre: 'Fantasy'},
        {genre: 'Fiction'},
        {genre: 'History'},
        {genre: 'Horror'},
        {genre: 'Mystery'},
        {genre: 'Musical'},
        {genre: 'Romance'},
        {genre: 'Sci-Fi'},
        {genre: 'Thriller'},
        {genre: 'Western'}
      ]
    };
  }

  // HANDLERS
  handleTitleChange = (event) => {
    this.setState({
      title: event.target.value,
    });
  };

  handleYearChange = (event) => {
    this.setState({
      year: event.target.value,
    });
  };

  handleDescriptionChange = (event) => {
    this.setState({
      description: event.target.value,
    });
  };

  handleRatingChange = (event) => {
    this.setState({
      rating: event.target.value,
    });
  };

  handleTrailerURLChange = (event) => {
    this.setState({
      trailer_url: event.target.value,
    });
  };

  handleImageURLChange = (event) => {
    this.setState({
      image_url: event.target.value,
    });
  };

  handleDirectorsChange = (event) => {
    this.setState({
      directors: event.target.value,
    });
  };

  handleCastChange = (event) => {
    this.setState({
      cast: event.target.value,
    });
  };

  handleLanguageChange = (event) => {
    this.setState({
      language: event.target.value,
    });
  };

  handleRuntimeChange = (event) => {
    this.setState({
      runtime: event.target.value,
    });
  };

  handleGenresChange = (event) => {
    this.setState({
      genres: event.target.value,
    });
  };

  // MULTISELECTOR
  onSelect(selectedList, selectedItem) {
    selected_genres=[]
    for(var i = 0; i < selectedList.length ; i++){
  
      selected_genres.push(selectedList[i].genre);
      }
    
  }

  onRemove(selectedList, removedItem) {
    selected_genres=[]
    for(var i = 0; i < selectedList.length ; i++){
  
      selected_genres.push(selectedList[i].genre);
      }

  }


  // SUBMIT
  handleSubmit = (event) => {
    //alert(`${this.state.title} ${this.state.year} ${this.state.description} ${this.state.rating} ${this.state.trailer_url} 
    //    ${this.state.image_url} ${this.state.directors} ${this.state.cast} ${this.state.language} ${this.state.runtime}`);

    console.log(selected_genres)

    const item = {
      title: this.state.title,
      year: this.state.year,
      description: this.state.description,
      rating: this.state.rating,
      trailer_url: this.state.trailer_url,
      image_url: this.state.image_url,
      directors: this.state.directors,
      cast: this.state.cast,
      language: this.state.language,
      runtime: this.state.runtime,
      genres: selected_genres,
    };

    axios.post("api/movies/", item)// POST para guardar no backend
    .then((response) => {
      alert("Movie successfully added!")
      window.location.replace("/movies");
    }, (error) => {
      alert(error)
    });

    //.then((res) => this.refreshList());
    event.preventDefault();
  };

  render() {
    const {
      title,
      year,
      description,
      rating,
      trailer_url,
      image_url,
      directors,
      cast,
      language,
      runtime,
      options_list,
    } = this.state;
    

    return (
      <div class="container">
        <form onSubmit={this.handleSubmit}>
          <div class="row">
            <div class="col-25">
              <label>Title: </label>
            </div>
            <div class="col-75">
              <input
                type="text"
                value={title}
                onChange={this.handleTitleChange}
              />
            </div>
          </div>

          <div class="row">
            <div class="col-25">
              <label>Year: </label>
            </div>
            <div class="col-75">
              <input
                type="number"
                value={year}
                onChange={this.handleYearChange}
              />
            </div>
          </div>

          <div class="row">
            <div class="col-25">
              <label>Description: </label>
            </div>
            <div class="col-75">
              <textarea
                value={description}
                onChange={this.handleDescriptionChange}
              />
            </div>
          </div>

          <div class="row">
            <div class="col-25">
              <label>Rating: </label>
            </div>
            <div class="col-75">
              <input
                type="number"
                value={rating}
                onChange={this.handleRatingChange}
              />
            </div>
          </div>

          <div class="row">
            <div class="col-25">
              <label>Runtime: </label>
            </div>
            <div class="col-75">
              <input
                type="number"
                value={runtime}
                onChange={this.handleRuntimeChange}
              />
            </div>
          </div>

          <div class="row">
            <div class="col-25">
              <label>Directors: </label>
            </div>
            <div class="col-75">
              <input
                type="text"
                value={directors}
                onChange={this.handleDirectorsChange}
              />
            </div>
          </div>

          <div class="row">
            <div class="col-25">
              <label>Cast: </label>
            </div>
            <div class="col-75">
              <input
                type="text"
                value={cast}
                onChange={this.handleCastChange}
              />
            </div>
          </div>

          <div class="row">
            <div class="col-25">
              <label>Language: </label>
            </div>
            <div class="col-75">
              <input
                type="text"
                value={language}
                onChange={this.handleLanguageChange}
              />
            </div>
          </div>

          <div class="row">
            <div class="col-25">
              <label>Cover image URL: </label>
            </div>
            <div class="col-75">
              <input
                type="text"
                value={image_url}
                onChange={this.handleImageURLChange}
              />
            </div>
          </div>

          <div class="row">
            <div class="col-25">
              <label>Trailer URL: </label>
            </div>
            <div class="col-75">
              <input
                type="text"
                value={trailer_url}
                onChange={this.handleTrailerURLChange}
              />
            </div>
          </div>

          <div class="row">
            <div class="col-25">
              <label>Genres: </label>
            </div>
            <div class="col-75">
              <Multiselect 
              options={options_list} 
              displayValue="genre"
              onSelect={this.onSelect} // Function will trigger on select event
              onRemove={this.onRemove}// Function will trigger on remove event
              />
            </div>
          </div>

          <button class="button-submit" type="submit">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default FormMovie;
