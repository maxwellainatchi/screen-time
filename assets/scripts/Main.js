import MovieDatabase from "./models/MovieDatabase";
import MovieList from "./views/MovieList";
import MovieSearcher from "./views/MovieSearcher";

const movieDatabase = new MovieDatabase();
const movieList = new MovieList(movieDatabase);
const movieSearcher = new MovieSearcher(movieDatabase);
movieList.render();