import MovieForm from "./MovieForm";

/**
 * Represents the list of movies
 */
export default class MovieList {
    /**
     * @param {MovieDatabase} database The movie database
     */
    constructor(database) {
        this.database = database;

        this.listElement = document.querySelector(".movie-list");
        this.clearElement = document.querySelector(".clear-movies");
        this.clearElement.addEventListener("click", this.clear.bind(this));

        this.movieForm = new MovieForm(this.add.bind(this));
    }

    /** @param {Movie} movie */
    add(movie) {
        this.database.add(movie);
        // NOTE: this is inefficient, since it recreates all the lis every time a movie is added.
        // TODO: make more efficient
        this.render();
    }

    render() {
        this.clearView();
        const movieElements = this.database.findAll().map(movie => movie.createLi({
            onClick: movie => {
                this.database.remove(movie)
                this.render();
            }
        }))
        movieElements.forEach(movieElement => this.listElement.appendChild(movieElement));
    }

    clearView() {
        [...this.listElement.childNodes].forEach(element => this.listElement.removeChild(element));
    }

    clear() {
        this.clearView();
        this.database.clear();
    }
}