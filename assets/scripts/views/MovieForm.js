import { ValidationError } from "../utils.js";
import Movie from "../models/Movie.js";

/**
 * Represents a movie form. Handles submitting new movies and clearing the form inputs. 
 * Accepts an onSubmit parameter, which will allow another function to hook into movie creating
 */
export default class MovieForm {
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