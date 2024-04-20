const tmdbKey = "7aafd6c5ce407931282ef3cdb635fbf0";
const tmdbBaseUrl = "https://api.themoviedb.org/3/";
const playBtn = document.getElementById("playBtn");
const movieTitle = document.getElementById("movieTitle");
const moviePoster = document.getElementById("moviePoster");
const movieOverview = document.getElementById("movieOverview");
const movieReleaseDate = document.getElementById("movieReleaseDate");

const getGenres = async () => {
  const genreRequestEndpoint = "genre/movie/list";
  const requestParams = `?api_key=${tmdbKey}`;
  const urlToFetch = `${tmdbBaseUrl}${genreRequestEndpoint}${requestParams}`;

  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const jsonResponse = await response.json();
      const genres = jsonResponse.genres;
      return genres;
    }
  } catch (error) {
    console.log(error);
  }
};

const getMovies = async (selectedGenre) => {
  const discoverMovieEndpoint = "/discover/movie";
  const requestParams = `?api_key=${tmdbKey}&with_genre=${selectedGenre}`;
  const urlToFetch = `${tmdbBaseUrl}${discoverMovieEndpoint}${requestParams}`;

  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const jsonResponse = await response.json();
      const movies = jsonResponse.results;
      return movies;
    }
  } catch (error) {
    console.log(error);
  }
};

const getMovieInfo = async (movie) => {
  const movieId = movie.id;
  const movieEndPoint = "/movie/" + movieId;
  const requestParams = `?api_key=${tmdbKey}`;
  const urlToFetch = `${tmdbBaseUrl}${movieEndPoint}${requestParams}`;

  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const jsonResponse = await response.json();
      const movieInfo = jsonResponse;
      return movieInfo;
    }
  } catch (error) {
    console.log(error);
  }
};

const showRandomMovie = async () => {
  const movies = await getMovies();
  const randomMovie = movies[Math.floor(Math.random() * movies.length)];
  const movieInfo = await getMovieInfo(randomMovie);

  movieTitle.textContent = movieInfo.title;
  moviePoster.src = `https://image.tmdb.org/t/p/w500${movieInfo.poster_path}`;
  movieOverview.textContent = movieInfo.overview;
  movieReleaseDate.textContent = movieInfo.release_date;
};

getGenres().then(populateGenreDropdown);
playBtn.onclick = showRandomMovie;