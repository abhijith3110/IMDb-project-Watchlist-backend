const fs = require('fs');
const movieData = 'movieData.json';

function readMovieData() {
  try {
    const data = fs.readFileSync(movieData, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

function writeMovieData(movie) {
  const data = JSON.stringify(movie, null, 2);
  fs.writeFileSync(movieData, data);
}

// Get all data
const getMovie = (req, res) => {
  const getMovieData = readMovieData();
  res.json(getMovieData);
};

// Create a watchlist
const createMovie = (req, res) => {
  const createMovieData = readMovieData();
  const watchlist = req.body;

  const existingMovie = createMovieData.find((movie) => movie.id === watchlist.id);

  if (existingMovie) {
    return res.json({ error: 'Movie with the same ID already exists' });
  }

  createMovieData.push(watchlist);
  writeMovieData(createMovieData);

  res.status(201).json({ message: 'WatchList Added successfully' });
};

// Delete movie data
const deleteMovieData = (req, res) => {
  const deleteMovie = readMovieData();
  const movieId = req.params.id;

  const movieIndex = deleteMovie.findIndex((movie) => movie.id === movieId);

  if (movieIndex === -1) {
    res.status(404).json({ error: 'Movie not found' });
  } else {
    deleteMovie.splice(movieIndex, 1);
    writeMovieData(deleteMovie);
    res.json({ message: 'Movie deleted successfully' });
  }
};

module.exports = {
  getMovie,
  createMovie,
  deleteMovieData,
};
