import { Link } from "react-router-dom";

const Navbar = () => {
    return (
      <nav className="navbar">
        <Link to="/"><h1>Movies</h1></Link>
        <div className="links">
          <Link to="/">Home</Link>
          <Link to="/movies">Movies</Link>
          <Link to="/addMovie">Add Movie</Link>
        </div>
      </nav>
    );
  }
   
  export default Navbar;

  