class Movie {
    static nextMovieID = 1;
    constructor(title, genre, rating) {
        // Sets a unique movie ID for add/insert/remove.
        this.movieID = Movie.nextMovieID++;

        this.title = title;
        this.genre = genre;
        this.rating = rating;
    }

    createLi({ onClick }) {
        const listElement = document.createElement("li");
        listElement.textContent = `${this.getFormattedTitle()} : ${this.genre} | ${this.rating}`;
        listElement.addEventListener("click", () => {
            onClick(this)
        })
        return listElement
    }

    getFormattedTitle() {
        return this.title.charAt(0).toUpperCase() + this.title.slice(1);
    }
}

class ValidationError extends Error {
    constructor(message, element) {
        super(message);
        this.element = element
    }

    alert() {
        alert(`Error: ${this.message}`);
    }
}

/**
 * Represents a movie form. Handles submitting new movies and clearing the form inputs. 
 * Accepts an onSubmit parameter, which will allow another function to hook into movie creating
 */
class MovieForm {
    /**
     * @param {Function} onSubmit Allow something to happen with the movie when submitting the form
     */
    constructor(onSubmit) {
        this.onSubmit = onSubmit

        // The DOM element representing the title input
        this.titleInput = document.querySelector(".movie-title");
        // The DOM element representing the genre input
        this.genreInput = document.querySelector(".movie-genre");
        // The DOM element representing the rating input
        this.ratingInput = document.querySelector(".movie-rating");

        // The DOM element representing the submit button on the form
        this.submitButton = document.querySelector(".submit-movie-information");
        // Add the event listener to submit the button
        this.submitButton.addEventListener("click", this.submit.bind(this));
        // you could also do
        // this.submitButton.addEventListener("click", () => this.submit());
    }

    validate() {
        if (this.titleInput.value.trim() === "") {
            throw new ValidationError("Please add a title", this.titleInput)
        }
        if (this.genreInput.value === "") {
            throw new ValidationError("Please select a genre", this.genreInput);
        }
        if (this.ratingInput.value < 1 || this.ratingInput.value > 5) {
            throw new ValidationError("Please set a rating from 1 to 5");
        }
    }

    /**
     * Submit the form, clearing it, and pass the newly created movie to this.onSubmit.
     */
    submit() {
        try {
            this.validate();
        } catch (error) {
            if (error instanceof ValidationError) {
                return error.alert();
            }
            // If error is not a validation error, we don't know how to handle it.
            throw error;
        }
        const title = this.titleInput.value.trim();
        const genre = this.genreInput.value;
        const rating = parseInt(this.ratingInput.value);

        this.clear()
        const movie = new Movie(title, genre, rating);
        this.onSubmit(movie);

    }

    /**
     * Clear the movie form, resetting all the values back to their defaults.
     */
    clear() {
        this.titleInput.value = ""
        this.genreInput.selectedIndex = 1
        this.ratingInput.value = ""
    }
}

/**
 * Represents the movie database.
 * 
 * Handles adding new movies, searching, and clearing the list.
 */
class MovieDatabase {
    /** @type {Movie[]} */
    movies = [];

    clear() {
        this.movies = [];
    }

    /** @param {Movie} movie */
    add(movie) {
        this.movies.push(movie);
    }

    /** @param {Movie} movieToRemove */
    remove(movieToRemove) {
        const index = this.movies.findIndex(movie => movie.movieID === movieToRemove.movieID);
        if (index !== -1) {
            this.movies.splice(index, 1);
        } else {
            alert(`Error: Unknown movie ${movie.movieID} (${movie.title}) was attempted to be removed, but doesn't exist.`);
        }
    }

    /** @param {string} [searchTitle] */
    getMovies(searchTitle) {
        if (!searchTitle) {
            return this.movies;
        }
        // todo: implement searching
        throw Error("unimplemented")
    }
}

class MovieList {
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
        this.clear();
        const movieElements = this.database.getMovies().map(movie => movie.createLi({
            onClick: movie => this.database.remove(movie)
        }))
        movieElements.forEach(movieElement =>  this.listElement.appendChild(movieElement));
    }

    clear() {
        [...this.listElement.children].forEach(this.listElement.removeChild);
    }
}

function main() {
    const movieDatabase = new MovieDatabase();
    const movieList = new MovieList(movieDatabase);
    movieList.render();
}

// Wait for the DOM to load before constructing everything
window.addEventListener("DOMContentLoaded", main);