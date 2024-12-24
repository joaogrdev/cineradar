import React, { useEffect, useState } from "react";
import styles from "./MovieDetails.module.css";
import NavBar from "../../Components/NavBar/NavBar";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../Services/api";
import Footer from "../../Components/Footer/Footer";
const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [movieDetails, setMovieDetails] = useState([]);
  const [genres, setGenres] = useState([]);
  const [trailers, setTrailers] = useState([]);
  const [cast, setCast] = useState([]);
  const [director, setDirector] = useState("");
  const [watchProviders, setWatchProviders] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [showWholeReview, setShowWholeReview] = useState("");

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
        const actingCast = data.cast.filter(
          (cast) => cast.known_for_department === "Acting"
        );
        const castWithImage = actingCast.filter(
          (cast) => cast.profile_path !== null
        );
        const tenFirstCast = castWithImage.slice(0, 10);
        setCast(tenFirstCast);

        const director = data.crew.filter((crew) => crew.job === "Director");
        const firstDirector = director.slice(0, 1);
        setDirector(firstDirector[0].name);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getWatchProviders = async () => {
    setLoading(true);
    await api
      .get(`/movie/${id}/watch/providers`)
      .then(({ data }) => {
        console.log(data.results.BR);
        setWatchProviders(data.results.BR.flatrate);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getReviews = async () => {
    setLoading(true);
    await api
      .get(`/movie/${id}/reviews?language=pt-br&page=1`)
      .then(({ data }) => {
        console.log(data.results);
        setReviews(data.results);
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
    getWatchProviders();
    getReviews();
  }, [id]);

  const searchMovieByGenre = (genreId) => {
    navigate(`/pesquisa/genero?q=${genreId}`);
  };

  const searchMovieByCast = (castId) => {
    navigate(`/pesquisa/atores?q=${castId}`);
  };

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
                <span
                  className={styles.genreItem}
                  onClick={() => searchMovieByGenre(genre.id)}
                >
                  {genre.name}
                </span>
              ))}
            </div>
            <h1 className={styles.title}>{movieDetails.title}</h1>

            <p className={styles.overview}>{movieDetails.overview}</p>
            <div className={styles.detailsMovie}>
              <span>IMDB {Number(movieDetails.vote_average).toFixed(1)}</span>
              <span>{movieDetails.runtime} min</span>
              <span>{movieDetails.release_date?.substring(0, 4)}</span>
              <span className={styles.director}>{director}</span>
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.lateralSection}`}>
        {watchProviders?.length > 0 && (
          <div className={styles.containerSection}>
            <p className={styles.subtitle}>Onde Assistir</p>
            {watchProviders.map((item) => (
              <img
                className={styles.watchImg}
                src={`https://image.tmdb.org/t/p/original${item.logo_path}`}
                alt=""
              />
            ))}
          </div>
        )}
      </section>

      {cast.length > 0 && (
        <section className={`${styles.section} ${styles.mainSection}`}>
        <div className={styles.containerSection}>
          <p className={styles.subtitle}>Elenco</p>
          <div className={styles.containerCast}>
            {cast.map((cast) => (
              <div
                onClick={() => searchMovieByCast(cast.id)}
                className={styles.castCard}
              >
                <img
                  src={`https://image.tmdb.org/t/p/original${cast.profile_path}`}
                  alt=""
                />
                <p>{cast.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      )}

      {trailers.length > 0 && (
        <section className={styles.section}>
          <div className={styles.containerSection}>
            <p className={styles.subtitle}>Trailer</p>
            <div className={styles.containerIframes}>
              {trailers.map((item) => (
                <iframe
                  src={`https://www.youtube.com/embed/${item.key}`}
                  title={item.name}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ))}
            </div>
          </div>
        </section>
      )}

      {reviews.length > 0 && (
        <section className={styles.section}>
          <div className={styles.containerSection}>
            <p className={styles.subtitle}>Avaliações</p>
            <div className={styles.containerReviews}>
              {reviews.map((item) => (
                <div className={styles.reviewCard}>
                  <div className={styles.reviewAuthor}>
                    <span>{item.author_details.username}</span>
                    <div className={styles.rating}>
                      <i class="bi bi-star-fill"></i>
                      <span>{item.author_details.rating}/10</span>
                    </div>
                  </div>

                  <div className={styles.boxContent}>
                    <p>{item.content}</p>
                  </div>

                  <div className={styles.reviewAvaliation}>
                      <i class="bi bi-hand-thumbs-up"></i>
                      <p>{Math.floor(Math.random() * 1000) + 1}</p>
                      <i class="bi bi-hand-thumbs-down"></i>
                      <p>{new Date(item.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default MovieDetails;
