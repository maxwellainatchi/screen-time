import Movie from "./Movie"

/**
 * Represents the movie database.
 * 
 * Handles adding new movies, searching, and clearing the list.
 */
export default class MovieDatabase {
    /** @type {Movie[]} */
    movies = [];

    clear() {
        this.movies = [];
    }

    /** @param {Movie} movie */
    add(movie) {
        this.movies.push(movie);
    }

    remove(movie) {
        const index = this.movies.indexOf(movie);
        this.movies.splice(index, 1);
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
    findAll(searchTitle) {
        if (!searchTitle) {
            return this.movies;
        }
        const title = searchTitle.toLowerCase();
        return this.movies.filter(movie => movie.title.toLowerCase().includes(title))
    }
}