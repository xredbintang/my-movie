import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { rateFilm } from "../action/ratedaction";
import { useNavigate } from "react-router-dom";

const MovieDetailView = ({ movie, credits, similarMovies }) => {
  const topCast = credits.cast.slice(0, 6);
  const producers = credits.crew.filter((member) => member.job === "Producer");
  const theme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();
  const ratedFilms = useSelector((state) => state.ratings.ratedFilms);
  const navigate = useNavigate();
  const [alertMessage, setAlertMessage] = useState("");

  const currentRating =
    ratedFilms.find((film) => film.id === movie.id)?.userRating || 0;

  const handleRating = (rating) => {
    dispatch(rateFilm(movie.id, rating));
    setAlertMessage(`You rated "${movie.title}" ${rating} out of 5!`);
    setTimeout(() => setAlertMessage(""), 3000);
  };

  const removeRating = () => {
    dispatch(rateFilm(movie.id, 0));
    setAlertMessage(`You removed your rating from "${movie.title}"!`);
    setTimeout(() => setAlertMessage(""), 3000);
  };

  return (
    <div className={theme === "dark" ? "dark" : ""}>
      <div className="relative bg-white dark:bg-black text-white py-28 px-22">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
          }}
        ></div>

        <div className="max-w-5xl mx-auto px-4 grid grid-cols-[300px,690px] auto-rows-auto items-start relative z-10 pt-10 pb-10">
          {/* Gambar film dan Produser */}
          <div className="flex flex-col gap-6 max-w-[300px]">
            {/* Gambar film */}
            <div className="flex-shrink-0">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-72 h-100 rounded-lg"
              />
            </div>

            {alertMessage && (
              <div className=" flex flex-col alert alert-success max-w-72 text-white z-50  px-2 py-1 rounded-md text-sm transition-all duration-500">
                {alertMessage}
              </div>
            )}

            {/* Producer */}
            <div className="mt-6">
              <h2 className="text-2xl font-semibold mb-2 text-red-500">
                Producers
              </h2>
              <ul className="space-y-1">
                {producers.map((producer) => (
                  <li key={producer.id}>
                    <span className="font-semibold text-black dark:text-white">
                      {producer.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Detail film */}
          <div className="mt-6 md:mt-0 flex flex-col space-y-4 text-left">
            <h1 className="text-4xl font-bold text-red-500 drop-shadow-lg">
              {movie.title}
            </h1>
            <div className="text-black dark:text-white">
              <span>{movie.release_date.split("-")[0]}</span> &bull;{" "}
              <span>{movie.genres.map((genre) => genre.name).join(", ")}</span>
            </div>

            <p className="text-gray-900 dark:text-white font-semibold">
              {movie.overview}
            </p>
            <div className="flex space-x-4 items-center text-sm text-black dark:text-white">
              <span>⭐ {movie.vote_average}/10</span>
              <span>Runtime: {movie.runtime} mins</span>
            </div>

            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`cursor-pointer text-2xl ${
                    star <= currentRating ? "text-yellow-500" : "text-gray-400"
                  }`}
                  onClick={() => handleRating(star)}
                >
                  ★
                </span>
              ))}
              <span className="ml-2 text-lg text-gray-900 dark:text-white pr-5">
                {currentRating} / 5
              </span>
              <button
                onClick={removeRating}
                className="bg-red-500 rounded-lg font-poppins p-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.2rem"
                  height="1.2rem"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M6.187 8h11.625l-.695 11.125A2 2 0 0 1 15.121 21H8.879a2 2 0 0 1-1.996-1.875zM19 5v2H5V5h3V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1zm-9 0h4V4h-4z"
                  ></path>
                </svg>
              </button>
            </div>

            <a
              href={movie.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-red-600 text-white font-semibold py-2 px-6 shadow hover:shadow-lg transition-all duration-300 rounded-lg"
            >
              Visit
            </a>

            {/* Top Cast */}
            <div className="mt-4 text-black dark:text-white">
              <h2 className="text-2xl font-semibold mb-2 text-red-500">
                Top Cast
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {topCast.map((actor) => (
                  <div key={actor.id} className="flex flex-col items-center">
                    <img
                      src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                      alt={actor.name}
                      className="w-24 h-32 object-cover rounded-lg shadow-md"
                    />
                    <p className="text-center mt-2 font-semibold">
                      {actor.name}
                    </p>
                    <p className="text-center text-sm dark:text-white text-gray-900">
                      as {actor.character}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Similar Movies */}
            <h2 className="text-2xl font-semibold mb-4 text-red-500">
              Similar Movies
            </h2>
            <div className="overflow-x-auto mt-6 max-w-full flex">
              <div className="flex space-x-4">
                {similarMovies.map((similar) => (
                  <div
                    key={similar.id}
                    className="flex-shrink-0 w-32 rounded-lg p-2 hover:bg-white hover:ease-out duration-300 dark:hover:bg-black hover:-translate-y-3 mt-3"
                    onClick={() => navigate(`/movie-detail/${similar.id}`)}
                  >
                    <img
                      src={`https://image.tmdb.org/t/p/w200${similar.poster_path}`}
                      alt={similar.title}
                      className="w-full h-48 object-cover rounded-lg shadow-md"
                    />
                    <p className="text-center mt-2 font-semibold text-gray-900 dark:text-white">
                      {similar.title}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailView;
