import React, { Component } from "react";
import axios from "axios";
import { Multiselect } from 'multiselect-react-dropdown';

var selected_genres = []

class FormEdit extends Component {
  constructor(props) {
    super(props);

    // Ir buscar o id ao url
    const currentLocation = window.location;
    const arrayOfStrings = currentLocation.pathname.split('/');
    const movie_id = arrayOfStrings[2];

    this.state = {
      id: movie_id,
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
      preselected_genres: [],
      options_list: [
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
  
  // Pre preencher os campos
  componentDidMount() {

    const url = "http://localhost:8000/api/movies/" + this.state.id

    axios.get(url).then(resp => {
        let movie = resp.data //filme recebido

        let pre_selected =[] //lista no formato correto para por no multiselector
        for(var i = 0; i < movie.genres.length ; i++){

          var json_arr = {genre: movie.genres[i]}
          pre_selected.push(json_arr);
          }
        
        selected_genres = movie.genres // manter sempre a lista selected_genres atualizada        
        console.log(selected_genres)

        this.setState({
          title: movie.title,
          year: movie.year,
          description: movie.description,
          rating: movie.rating,
          trailer_url: movie.trailer_url,
          image_url: movie.image_url,
          directors: movie.directors,
          cast: movie.cast,
          language: movie.language,
          runtime: movie.runtime,
          preselected_genres: pre_selected ,
        }); 
    });
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

  // TENTATIVAS
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
      id: this.state.id,
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

    axios.put(`/api/movies/${item.id}/`, item) // update
    .then((response) => {
      alert("Movie successfully updated!")
      window.location.replace(`/movies/${item.id}/`);
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
      preselected_genres,
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
              //onChange = {this.handleOptionsChange}
              selectedValues={preselected_genres}  //Preselected value to persist in dropdown
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

export default FormEdit;