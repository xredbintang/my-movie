import "./App.css";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./component/Navbar";

import MovieDetail from "./pages/Moviedetail";
import { Provider, useSelector } from "react-redux";
import store from "./store/store";
import SearchPageView from "./component/SearchPageView";
import { FooterWithSitemap } from "./component/Footer";
import RatedMovies from "./pages/ratedMovie";



function App() {
  
  
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie-detail/:id" element={<MovieDetail />} />
            <Route path="/search" element={<SearchPageView />} />
            <Route path="/rated-movie" element={<RatedMovies/>}/>
          </Routes>
          <FooterWithSitemap />
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
