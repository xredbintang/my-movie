import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchMoviesRequest,
  fetchMoviesSuccess,
  fetchMoviesFailure,
} from "../action/movieaction";
import axios from "axios";
import Homeview from "./Homeview";

const Home = () => {
  const dispatch = useDispatch();
  const { movies, randomMovie, loading } = useSelector((state) => state.movies);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [genreName, setGenreName] = useState("");
  const [genres, setGenres] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchMovies = async (page = 1, genreId = "") => {
    dispatch(fetchMoviesRequest());

    try {
      const url = genreId
        ? `https://api.themoviedb.org/3/discover/movie?api_key=5ee305687e9da2de1fccaf2d05799732&with_genres=${genreId}&page=${page}`
        : `https://api.themoviedb.org/3/movie/popular?api_key=5ee305687e9da2de1fccaf2d05799732&language=en-US&page=${page}`;

      const response = await axios.get(url);
      const moviesData = response.data.results;
      dispatch(fetchMoviesSuccess(moviesData));
      setTotalPages(response.data.total_pages);
      if (!genreId) setGenreName("");
    } catch (error) {
      dispatch(fetchMoviesFailure(error.message));
    }
  };

  const fetchGenres = async () => {
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/genre/movie/list?api_key=5ee305687e9da2de1fccaf2d05799732&language=en-US"
      );
      console.log(response.data.genres);
      setGenres(response.data.genres);
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
  };

  useEffect(() => {
    fetchGenres();
    fetchMovies(currentPage, selectedGenre);
  }, [currentPage, selectedGenre]); 

  const handleGenreChange = (genreId, genreName) => {
    setSelectedGenre(genreId);
    setCurrentPage(1); 
    fetchMovies(1, genreId);
    setGenreName(genreName);
  };

  const handleNextPage = useCallback(() => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  });

  const handlePreviousPage = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  });

  return (
    <Homeview
      movies={movies}
      randomMovie={randomMovie}
      loading={loading}
      handleGenreChange={handleGenreChange}
      genreName={genreName}
      genres={genres}p
      currentPage={currentPage} 
      totalPages={totalPages} 
      handleNextPage={handleNextPage} 
      handlePreviousPage={handlePreviousPage} 
    />
  );
};

export default Home;
