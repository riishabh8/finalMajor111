import { createContext, useState, useEffect } from "react";

const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [page, setPage] = useState(1);
  const [movies, setMovie] = useState([]);

  useEffect(() => {
    async function fetchApi() {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=1b6c5548b651ca79c1b54bb8139164dc&page=1&language=en-US&page=${page}`
      );
      const data = await response.json();
      setMovie(data.results);
    }
    fetchApi();
  }, [page]);

  return (
    <MovieContext.Provider
      value={{
        movies: movies,
        setMovie: setMovie,
        page: page,
        setPage: setPage,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export default MovieContext;
