const movieTitle = document.querySelector(".movie-title");
const movieGenre = document.querySelector('.movie-genre');
const movieRating = document.querySelector('.movie-rating');
const submitMovieInfo = document.querySelector('.submit-movie-information'); 
const clearMovies = document.querySelector('.clear-movies'); 
const movieList = document.querySelector(".movie-list"); 

const searchTitle = document.querySelector('.searching-movie-title'); 
const submitTitle = document.querySelector('.submit-movie-search'); 
const clearSearched = document.querySelector('.clear-searched'); 
const searchedList = document.querySelector(".searched-list"); 

//must be global arrays
const listOfMovies = [];
const allMovies = [];

function renderMovie() {
    listOfMovies.forEach((movie => {
        let { title, genre, rating, getFormattedTitle} = movie;
        getFormattedTitle = getFormattedTitle.bind(movie);
        movieElement = `${movie.getFormattedTitle()} : ${genre} | ${rating}`;
        const movieListItemElement = document.createElement("li");
        movieListItemElement.textContent = movieElement;
        movieList.append(movieListItemElement);
        movieListItemElement.addEventListener("click", () => {
            movieList.removeChild(movieListItemElement);
            allMovies.forEach((movie => {
                if(movie.title.includes(title)) {
                    let index = allMovies.indexOf(movie);
                    allMovies.splice(index, 1);
                }
            }))
        })
        listOfMovies.length = 0;
        movieTitle.value = "";
        movieGenre.value = "";
        movieRating.value = "";
    }))
}

function filterMovies() {
    searchTitle.value.trim();
    if(searchTitle.value.trim() === "" || allMovies.length === 0) {
        alert("Please enter a valid movie title.")
        searchTitle.value = "";
        return;
    }else {
        let filteredMovies = allMovies.filter((movie => {
            return movie.title.includes(searchTitle.value);
        }));
        filteredMovies.forEach((filteredMovie => {
            let { genre, rating, getFormattedTitle } = filteredMovie;
            getFormattedTitle = getFormattedTitle.bind(filteredMovie);
            let filteredElement = `${filteredMovie.getFormattedTitle()} : ${genre} | ${rating}`;
            let filteredItem = document.createElement("li");
            filteredItem.textContent = filteredElement;
            searchedList.append(filteredItem);
            searchTitle.value = "";
            filteredItem.addEventListener("click", () => {
                searchedList.removeChild(filteredItem);
            })
            searchTitle.value = "";
        }))
    }
}

function getAndVerifyUserInputs() {
    let title = movieTitle.value.trim();
    let genre = movieGenre.value.trim();
    let rating = movieRating.value.trim();

    if(title === "" ||
    genre === "" ||
    rating === "") {
        alert("Please enter a valid movie title, genre and rating.")
        movieTitle.value = "";
        movieGenre.value = "";
        movieRating.value = "";
        return;
    }else if (rating > 5 || rating < 1) {
        alert("Please enter a rating between 1 and 5.")
        movieRating.value = ""; 
        return;
    }else {
        let movie = {
            title,
            genre,
            rating,
            getFormattedTitle() {
                return this.title.charAt(0).toUpperCase() + this.title.slice(1); 
            }
        }
        listOfMovies.push(movie);
        allMovies.push(movie);
    }
    renderMovie();
}

function eventListeners() {
    movieGenre.value = "";
    submitMovieInfo.addEventListener("click", getAndVerifyUserInputs);
    submitTitle.addEventListener("click", filterMovies);
    
    clearMovies.addEventListener("click", () => {
        searchedList.textContent = "";
        movieList.textContent = "";
        allMovies.length = 0;
        listOfMovies.length = 0;
    })
    clearSearched.addEventListener("click", () => {
        searchedList.textContent = ""
    });
}

eventListeners();


