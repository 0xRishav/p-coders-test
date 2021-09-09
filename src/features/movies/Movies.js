import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
} from "react";
import { useSelector } from "react-redux";
import { increasePage, loadMovies } from "../../features/movies/moviesSlice";
import missingPoster from "../../assets/placeholder_for_missing_posters.png";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useDispatch } from "react-redux";

function Movies({ searchInput }) {
  const { pageNum, movies } = useSelector((state) => state.movies);
  const [filteredMovies, setFilteredMovies] = useState([]);

  const dispatch = useDispatch();

  const observer = useRef();
  const lastMovieRef = useCallback(
    (node) => {
      if (pageNum > 3 || pageNum === 3) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          dispatch(increasePage());
        }
      });
      if (node) observer.current.observe(node);
    },
    [pageNum]
  );

  useEffect(() => {
    dispatch(loadMovies());
  }, [pageNum]);

  useEffect(() => {
    const fMovies = movies.filter((movie) =>
      movie?.name?.toLowerCase()?.includes(searchInput?.toLowerCase())
    );
    setFilteredMovies([...fMovies]);
  }, [searchInput]);
  return (
    <div className="grid grid-cols-3 gap-x-7 mx-7 mt-16">
      {(searchInput === "" ? movies : filteredMovies).map((movie, index) => {
        if (
          (searchInput === "" ? movies : filteredMovies).length ===
          index + 1
        ) {
          return (
            <div ref={lastMovieRef}>
              <LazyLoadImage
                effect="blur"
                src={
                  typeof movie["poster-image"] !== "undefined" &&
                  movie["poster-image"] !== "posterthatismissing.jpg"
                    ? require(`../../assets/${movie["poster-image"]}`).default
                    : missingPoster
                }
                alt="poster"
                className="w-full object-cover"
              />{" "}
              <p className="mb-10 text-left">{movie.name}</p>
            </div>
          );
        } else {
          return (
            <div>
              <LazyLoadImage
                effect="blur"
                src={
                  typeof movie["poster-image"] !== "undefined" &&
                  movie["poster-image"] !== "posterthatismissing.jpg"
                    ? require(`../../assets/${movie["poster-image"]}`).default
                    : missingPoster
                }
                alt="poster"
                className="w-full object-cover"
              />{" "}
              <p className="mb-10 text-left">{movie.name}</p>
            </div>
          );
        }
      })}
      {searchInput !== "" && filteredMovies.length === 0 && (
        <div>No Movies Match Your search</div>
      )}
    </div>
  );
}

export default Movies;
