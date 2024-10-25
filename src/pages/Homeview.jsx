import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Homeview = ({
  movies,
  randomMovie,
  loading,
  handleGenreChange,
  genreName,
  genres,
  currentPage,
  totalPages,
  handleNextPage,
  handlePreviousPage,
}) => {
  const navigate = useNavigate();
  const theme = useSelector((state) => state.theme.theme);
  return (
    <div className={theme === "dark" ? "dark" : ""}>
      {!loading && randomMovie && (
        <div
          className="relative bg-black text-white py-20"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${randomMovie.backdrop_path})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-gray-100 to-transparent opacity-100 dark:bg-gradient-to-t dark:from-zinc-950 dark:to-transparent "></div>
          <div className="relative max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center min-h-[80vh]">
            <div className="flex-shrink-0 ml-11">
              <img
                src={`https://image.tmdb.org/t/p/w300${randomMovie.poster_path}`}
                alt={randomMovie.title}
                className="w-60 h-80 rounded-lg font-poppins"
              />
            </div>

            <div className="ml-8 mt-6 md:mt-0 flex flex-col space-y-4 items-start justify-center">
              <h1 className="text-5xl font-bold text-left text-white dark:text-white  drop-shadow-lg">
                {randomMovie.title}
              </h1>
              <div className="text-gray-900 dark:text-gray-400">
                <span>{randomMovie.release_date.split("-")[0]}</span> &bull;{" "}
                <span>{randomMovie.genre_ids.join(", ")}</span>
              </div>
              <p className="dark:text-white text-gray-900 max-w-xl text-left font-semibold">
                {randomMovie.overview}
              </p>
              <span className=" mt-auto items-center bg-gray-200 dark:bg-slate-900 dark:text-white rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                ⭐{randomMovie.vote_average}/10
              </span>
              <div className="flex space-x-4">
                <button
                  onClick={() => navigate(`/movie-detail/${randomMovie.id}`)}
                  className="text-white dark:text-white font-semibold py-2 px-6 bg-red-600 rounded-lg "
                >
                  Read More
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <section className="py-10 dark:bg-zinc-950 bg-gray-100">
        <div className="max-w-6xl mx-auto px-0 my-1">
          <div className="flex justify-start items-center mb-6 font-poppins">
            <div className="dropdown pl-4">
              <div
                tabIndex={0}
                role="button"
                className="btn border-none bg-transparent dark:text-white text-black underline underline-offset-4 decoration-red-500 dark:hover:bg-gray-950 hover:bg-gray-400 "
              >
                By Categories{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="0.42rem"
                  height="1.2rem"
                  viewBox="0 0 240 400"
                >
                  <path fill="currentColor" d="M0 171h232L116 287z"></path>
                </svg>
              </div>
              <ul className="dropdown-content menu bg-gray-800 text-white w-48 p-2 shadow">
                {genres.map((genre) => (
                  <li key={genre.id}>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handleGenreChange(genre.id, genre.name);
                      }}
                      className="block px-4 py-2 hover:bg-gray-700"
                    >
                      {genre.name}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href="/"
                    onClick={(e) => {
                      e.preventDefault();
                      handleGenreChange("", "All");
                    }}
                    className="block px-4 py-2 hover:bg-gray-700"
                  >
                    All
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {genreName && (
            <h2 className="text-2xl text-black dark:text-white mb-7">
              Categories{" "}
              <span
                style={{
                  padding: "4px 8px",
                  border: "none",
                  borderBottom: "1px solid red",
                  borderRadius: "0",
                }}
                className="text-red-500"
              >
                {genreName}
              </span>
            </h2>
          )}

          {loading ? (
            <div className="flex w-52 flex-col gap-4">
            <div className="skeleton h-32 w-full"></div>
            <div className="skeleton h-4 w-28"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
          </div>
          ) : (
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 ">
                {movies.map((movie) => (
                  <div
                    key={movie.id}
                    className="p-2 rounded-lg hover:bg-gray-300 dark:hover:bg-black hover:-translate-y-3 hover:ease-out duration-300"
                    onClick={() => navigate(`/movie-detail/${movie.id}`)}
                    style={{ cursor: "pointer" }}
                  >
                    <img
                      src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                      alt={movie.title}
                      className="w-full h-auto object-cover rounded-lg "
                      loading="lazy"
                    />
                    <h2 className="text-lg font-bold mt-2 text-black dark:text-white">
                      {movie.title}
                    </h2>

                    <p className="text-gray-600 dark:text-gray-50 ">
                      {movie.release_date}
                    </p>
                    <span className=" mt-auto items-center bg-gray-200 dark:bg-slate-900 dark:text-white rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                      ⭐{movie.vote_average}/10
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex justify-center mt-6 space-x-4 font-poppins">
                <button
                  className="bg-red-800 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-900 disabled:bg-gray-500 transition-all duration-300"
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <span className="dark:text-white text-black">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  className="bg-red-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-700 disabled:bg-gray-500 transition-all duration-300"
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Homeview;
