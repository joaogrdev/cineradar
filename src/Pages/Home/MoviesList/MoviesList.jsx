import { useEffect, useState } from "react";
import styles from "./MoviesList.module.css";
import api from "../../../Services/api";

const MoviesList = () => {
  const options = [
    { name: "Mais Populares", id: "popular" },
    { name: "Melhor Avaliados", id: "top_rated" },
    { name: "Mais Recentes", id: "upcoming" },
  ];

  const [moviesList, setMoviesList] = useState([]);
  const [filterSelected, setFilterSelected] = useState(options[0]);
  const [loading, setLoading] = useState(false);

  const getMostPopularMovies = async () => {
    setLoading(true);
    await api
      .get(`/movie/${filterSelected?.id}?language=pt-BR`)
      .then(({ data }) => {
        console.log(data.results);

        setMoviesList(data.results);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getMostPopularMovies();
  }, [filterSelected]);

  return (
    <section className={styles.section}>
      <div className={styles.top}>
        <h4 className={styles.title}>{filterSelected?.name}</h4>
        <div className={styles.containerOptions}>
          {options
            .filter((option) => option.id != filterSelected.id)
            .map((option) => (
              <p
                className={styles.option}
                onClick={() => setFilterSelected(option)}
                key={option.id}
              >
                {option.name}
              </p>
            ))}
        </div>
      </div>
      <div className={styles.container}>
        {loading ? (
          <p>Carregando...</p>
        ) : (
          moviesList.map((movie) => (
            <div className={styles.movie} key={movie.id}>
              <img
                src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                alt={movie.title}
                className={styles.movieImage}
              />
              <div className={styles.movieInfo}>
                <p className={styles.movieTitle}>{movie.title}</p>
                <div className={styles.lineInfo}>
                  <p className={styles.movieDate}>{new Date(movie.release_date).toLocaleString('pt-BR', { year: 'numeric', month: '2-digit', day: '2-digit' })}</p>
                  <p className={styles.movieRating}><i class="bi bi-star-fill"></i>{movie.vote_average.toFixed(1).replace(".", ",")}</p>
                </div>
                <p className={styles.movieDescription}>{movie.overview}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default MoviesList;
