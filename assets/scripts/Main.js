import MovieDatabase from "./models/MovieDatabase";
import MovieList from "./views/MovieList";
import MovieSearcher from "./views/MovieSearcher";

function main() {
    const movieDatabase = new MovieDatabase();
    const movieList = new MovieList(movieDatabase);
    const movieSearcher = new MovieSearcher(movieDatabase);
    movieList.render();
}

// Wait for the DOM to load before constructing everything
window.addEventListener("DOMContentLoaded", main);