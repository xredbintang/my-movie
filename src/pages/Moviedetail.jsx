import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import MovieDetailView from "./MovieDetailView";

const MovieDetail = () => {
  const { id } = useParams(); 
  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState(null); 
  const [similarMovies, setSimilarMovies] = useState([]); 

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        const movieResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=5ee305687e9da2de1fccaf2d05799732&language=en-US`
        );
        
        const creditsResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/credits?api_key=5ee305687e9da2de1fccaf2d05799732&language=en-US`
        );

        const similarMoviesResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/similar?api_key=5ee305687e9da2de1fccaf2d05799732&language=en-US&page=1`
        );
        
        setMovie(movieResponse.data);
        setCredits(creditsResponse.data); 
        setSimilarMovies(similarMoviesResponse.data.results);
      
      } catch (error) {
        console.error("Error fetching movie details:", error);
   
      }
    };

    fetchMovieDetail();
  }, [id]);



  if (!movie || !credits) {
    return (
      <p>No credit</p>
    )
  }

  return <MovieDetailView movie={movie} credits={credits} similarMovies={similarMovies}/>; 
};

export default MovieDetail;
