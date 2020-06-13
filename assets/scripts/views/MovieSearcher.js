import { ValidationError } from "../utils";

export default class MovieSearcher {
    /**
     * @param {MovieDatabase} database The movie database
     */
    constructor(database) {
        this.database = database;

        this.listElement = document.querySelector(".searched-list");
        this.searchBox = document.querySelector(".searching-movie-title");
        this.submitButton = document.querySelector(".submit-movie-search");
        this.clearElement = document.querySelector(".clear-searched");

        this.submitButton.addEventListener("click", this.search.bind(this));
        this.clearElement.addEventListener("click", this.clearView.bind(this));
    }

    validate() {
        if (!this.searchBox.value) {
            throw new ValidationError("Please enter a title to search");
        }
    }

    search() {
        try {
            this.validate();
        } catch (error) {
            if (error instanceof ValidationError) {
                return error.alert();
            }
            // If error is not a validation error, we don't know how to handle it.
            throw error;
        }
        this.clearView();
        let text = this.searchBox.value;
        this.database.findAll(text).forEach(movie => this.listElement.appendChild(movie.createLi()));
        this.searchBox.value = ""
    }

    clearView() {
        [...this.listElement.childNodes].forEach(element => this.listElement.removeChild(element));
    }
}