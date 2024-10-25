import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const RatedMovies = () => {
  const ratedFilms = useSelector((state) => state.ratings.ratedFilms);
  const [movieDetails, setMovieDetails] = useState([]);
  const theme = useSelector((state) => state.theme.theme);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const movies = await Promise.all(
          ratedFilms.map(async (film) => {
            const response = await axios.get(`https://api.themoviedb.org/3/movie/${film.id}`, {
              params: {
                api_key: '5ee305687e9da2de1fccaf2d05799732', 
                language: 'en-US',
              },
            });
            return {
              id: film.id,
              title: response.data.title || 'Unknown Title',
              userRating: film.userRating,
              posterPath: response.data.poster_path, 
            };
          })
        );
        setMovieDetails(movies);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    if (ratedFilms.length > 0) {
      fetchMovieDetails();
    }
  }, [ratedFilms]);

  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      <div className='bg-gray-100 dark:bg-zinc-900 '>
        <div className="container mx-auto px-44 py-20 bg-gray-100 dark:bg-zinc-900">
          <h1 className="text-3xl font-bold mb-6 dark:text-white">Movies You <span className='text-red-500'>Rated</span></h1>
          {movieDetails.length === 0 ? (
            <p className="text-lg">You haven't rated any movies yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {movieDetails.map((film) => (
                film.userRating > 0 && ( 
                  <div key={film.id} className="py-10 border-none rounded-lg flex flex-col items-center hover:bg-base-300 dark:hover:bg-zinc-800 duration-300 hover:-translate-y-3"
                  onClick={() => navigate(`/movie-detail/${film.id}`)}
                    style={{ cursor: "pointer" }}>
                    {film.posterPath && ( 
                      <img
                        src={`https://image.tmdb.org/t/p/w500${film.posterPath}`} 
                        alt={film.title}
                        className="w-36 h-52 object-cover mb-2 rounded-lg" 
                      />
                    )}
                    <span className="text-xl font-semibold text-center text-black dark:text-white">{film.title}</span>
                    <span className="text-lg text-yellow-500">⭐ {film.userRating} / 5</span>
                  </div>
                )
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RatedMovies;
