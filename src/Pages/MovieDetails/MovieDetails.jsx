import React, { useEffect, useState } from "react";
import styles from "./MovieDetails.module.css";
import NavBar from "../../Components/NavBar/NavBar";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../Services/api";
const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [movieDetails, setMovieDetails] = useState([]);
  const [genres, setGenres] = useState([])
  const [trailers, setTrailers] = useState([])
  const [cast, setCast] = useState([])

'https://api.themoviedb.org/3/movie/12/credits?language=pt-br'

  const getMovieDetails = async () => {
    setLoading(true);
    await api
      .get(`/movie/${id}?language=pt-BR`)
      .then(({ data }) => {
        console.log(data);
        setGenres(data.genres);
        setMovieDetails(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getTrailersMovie = async () => {
    setLoading(true);
    await api
      .get(`/movie/${id}/videos?language=pt-br`)
      .then(({ data }) => {
        console.log(data.results);
        setTrailers(data.results);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getMovieCast = async () => {
    setLoading(true);
    await api
      .get(`/movie/${id}/credits?language=pt-br`)
      .then(({ data }) => {
        console.log(data.cast);
        const firstSixCast = data.cast.slice(0, 6);

        const castWithImage = data.cast.filter(cast => cast.profile_path !== null);
        setCast(castWithImage);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getMovieDetails();
    getTrailersMovie();
    getMovieCast();
  }, [id]);


  const searchMovieByGenre = (genre) => {
    navigate(`/cineradar/pesquisa/genero?q=${genre}`)
  }

  return (
    <div className={styles.container}>
      <NavBar />

      <div className={styles.imgBgContainer}>
        <img
          src={`https://image.tmdb.org/t/p/original/${movieDetails.backdrop_path}`}
          alt={movieDetails.title}
          className={styles.bgImage}
        />
        <div className={styles.bg}></div>
      </div>
      <section className={styles.top}>
        <div className={styles.movieInfoContainer}>
          <img
            src={`https://image.tmdb.org/t/p/original/${movieDetails.poster_path}`}
            className={styles.moviePoster}
            loading="lazy"
            alt=""
          />
          <div className={styles.info}>
          <div className={styles.genreContainer}>
              {genres.map((genre) => (
                <span className={styles.genreItem}
                onClick={() => searchMovieByGenre(genre.id)}
                >{genre.name}</span>
              ))}
            </div>
            <h1 className={styles.title}>{movieDetails.title}</h1>
            
            <p className={styles.overview}>{movieDetails.overview}</p>
            <div className={styles.detailsMovie}>
              <span>IMDB {movieDetails.vote_average}</span>
              <span>{movieDetails.runtime} min</span>
              <span>{movieDetails.release_date?.substring(0, 4)}</span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.containerVideos}>
          <p className={styles.subtitle}>Elenco</p>
          <div className={styles.containerCast}>
            {cast.map((cast) => (
              <div className={styles.castCard}>
                <img src={`https://image.tmdb.org/t/p/original${cast.profile_path}`} alt="" />
                <p>{cast.name}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.containerVideos}>
          <p className={styles.subtitle}>Teaser e Trailers</p>
          <div className={styles.containerIframes}>
            {trailers.map((trailer) => (
              <iframe
                src={`https://www.youtube.com/embed/${trailer.key}`}
                title={trailer.name}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
};

export default MovieDetails;
