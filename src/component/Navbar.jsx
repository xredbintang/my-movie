import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toggleTheme } from "../action/themeaction";

const Navbar = () => {
  const theme = useSelector((state) => state.theme.theme);
  const dispatchReturn = useDispatch();

  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY && currentScrollY > 20) {
      setShowNavbar(false);
    } else {
      setShowNavbar(true);
    }

    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  useEffect(() => {
    console.log("Theme is:", theme);
  }, [theme]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className={theme === "dark" ? "dark" : ""}>
      <div
        className={`navbar shadow-xl w-full fixed p-2 top-0 z-50 dark:bg-transparent dark:text-white text-white font-montserrat transition-transform duration-300 ${
          showNavbar ? "translate-y-0" : "-translate-y-full"
        }`}
        style={{
          backgroundColor: "rgba(0,0, 0, 0.1)",
          backdropFilter: "blur(5px)",
        }}
      >
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
          </div>
          <a className="btn btn-ghost text-xl">
            <span className="text-succes text-red-500 ">MK</span>
            21
          </a>
        </div>
        <div className="navbar-center hidden lg:flex ">
          <ul className="drop-shadow-md menu menu-horizontal px-1 gap-3 dark:text-white text- font-semibold ">
            <li>
              <Link to="/">Home</Link>
            </li>

            <li>
              <Link to="/rated-movie">Rated Movies</Link>
            </li>
          </ul>
        </div>

        <form onSubmit={handleSearchSubmit} className="navbar-center">
          <div className="form-control">
            <input
              type="text"
              placeholder="Search for movie . . ."
              value={searchQuery}
              onChange={handleSearchChange}
              className="input bg-transparent text-white placeholder-white focus:outline-none"
              style={{
                width: "200px",
                padding: "4px 8px",
                border: "none",
                borderBottom: "1px solid red",
                borderRadius: "0",
              }}
            />
          </div>
        </form>

        <label className="flex cursor-pointer gap-2 ml-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="5" />
            <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
          </svg>
          <input
            type="checkbox"
            value="synthwave"
            className="toggle theme-controller"
            onClick={() => dispatchReturn(toggleTheme())}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        </label>
      </div>
    </div>
  );
};

export default Navbar;
