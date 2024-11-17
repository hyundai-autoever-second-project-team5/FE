import React, { useEffect, useState } from "react";
import Card from "../components/common/Card/Card";
import { getMovieSearch } from "../api/main";
import { useLocation } from "react-router-dom";
import GenreList from "../components/common/GenreList";

const Search = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (query) {
      getMovieSearch(query).then((res) => {
        console.log(res);
        setMovies(res);
      });
    }
  }, [query]);

  return (
    <div className="relative w-full max-w-[1400px] m-auto px-5 py-20 z-20 min-h-screen pt-36">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {movies?.map((item) => (
          <Card
            id={item?.movieId}
            posterSrc={
              item?.posterPath ||
              "https://image-cdn.hypb.st/https%3A%2F%2Fkr.hypebeast.com%2Ffiles%2F2023%2F11%2Fmarvel-reportedly-considering-reassembling-original-six-avengers-actors-for-new-film-info-1.jpg?q=75&w=800&cbr=1&fit=max"
            }
            title={item?.title}
          />
        ))}
      </div>
    </div>
  );
};

export default Search;
