export default class Movie {
    static nextMovieID = 1;
    constructor(title, genre, rating) {
        // Sets a unique movie ID for add/insert/remove.
        this.movieID = Movie.nextMovieID++;

        /** @type {string} */
        this.title = title;
        this.genre = genre;
        this.rating = rating;
    }

    createLi({ onClick } = {}) {
        const listElement = document.createElement("li");
        listElement.textContent = `${this.getFormattedTitle()} : ${this.genre} | ${this.rating}`;
        listElement.addEventListener("click", () => {
            onClick?.(this)
        })
        return listElement
    }

    getFormattedTitle() {
        return this.title.charAt(0).toUpperCase() + this.title.slice(1);
    }
}