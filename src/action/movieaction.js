
export const MOVIE_REQUEST = 'movies/movieRequest';
export const MOVIE_SUKSES = 'movies/movieSukses';
export const MOVIE_GAGAL = 'movies/movieGagal';


export const fetchMoviesRequest = () => ({
  type: MOVIE_REQUEST,
});

export const fetchMoviesSuccess = (movies) => ({
  type: MOVIE_SUKSES,
  payload: movies,
});

export const fetchMoviesFailure = (error) => ({
  type: MOVIE_GAGAL,
  error,
});
