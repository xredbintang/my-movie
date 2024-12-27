import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

const SearchPageView = () => {
  const [searchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const query = searchParams.get("query");
  const apiKey = "5ee305687e9da2de1fccaf2d05799732";
  const navigate = useNavigate();
  const theme = useSelector((state) => state.theme.theme);
  useEffect(() => {
    if (query) {
      const fetchMovies = async () => {
        try {
          const response = await axios.get(
            `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(
              query
            )}`
          );
          setMovies(response.data.results);
        } catch (error) {
          console.error("Error fetching data", error);
        } finally {
          setLoading(false);
        }
      };

      fetchMovies();
    }
  }, [query]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!movies.length) {
    return <p>No results found for "{query}".</p>;
  }

  return (
    <div className={theme === "dark" ? "dark" : ""}>
      <div className="p-10 bg-gray-100 dark:bg-zinc-900">
        <h2 className="text-2xl font-bold text-black dark:text-white mt-20 mb-10">
          Search results for "{query}"
        </h2>
        <div className="flex flex-col space-y-4">
          {movies.map((movie) => {
            const shortOverview =
              movie.overview.length > 100
                ? movie.overview.substring(0, 97) + "..."
                : movie.overview;

            return (
              <div
                key={movie.id}
                className="relative flex items-start space-x-4 p-4 rounded-lg transition duration-300 text-white"
                style={{
                  backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  borderRadius: "10px",
                  minHeight: "150px",
                  cursor: "pointer",
                }}
                onClick={() => navigate(`/movie-detail/${movie.id}`)} 
              >
                <div
                  className="absolute inset-0 bg-black opacity-60 rounded-lg"
                  style={{ zIndex: 1 }}
                ></div>

                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title}
                  className="w-32 h-auto object-cover rounded-lg z-10"
                />
                <div className="flex flex-col z-10">
                  {" "}
                  
                  <h3 className="text-2xl font-poppins mb-2 text-left">
                    {movie.title}
                  </h3>
                  <p className="text-gray-400 text-md text-left mb-5">
                    {shortOverview}
                  </p>
                  <span className="text-left">⭐ {movie.vote_average}/10</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SearchPageView;
