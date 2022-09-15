import Navbar from './components/Navbar';
import Home from './Home';
import MovieList from './MovieList';
import AddMovie from './AddMovie';
import EditMovie from './EditMovie';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MovieDetails from './MovieDetails';

function App() {
  return (
    <Router>
    <div className="App">
      <Navbar />
      <div className="content">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/movies">
            <MovieList />
          </Route>
          <Route path="/movies/:id">
            <MovieDetails />
          </Route>
          <Route path="/addMovie">
            <AddMovie/>
          </Route>
          <Route path="/editMovie/:id">
            <EditMovie/>
          </Route>
        </Switch>
      </div>
    </div>
    </Router>
  );
}

export default App;