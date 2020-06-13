import MovieDatabase from "./models/MovieDatabase.js";
import MovieList from "./views/MovieList.js";
import MovieSearcher from "./views/MovieSearcher.js";

const movieDatabase = new MovieDatabase();
const movieList = new MovieList(movieDatabase);
const movieSearcher = new MovieSearcher(movieDatabase);
movieList.render();