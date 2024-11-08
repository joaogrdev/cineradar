import React, { useEffect, useState } from "react";
import NavBar from "../../Components/NavBar/NavBar";
import order from "../../Data/Order.json";
import countries from "../../Data/Countries.json";
import api from "../../Services/api";

import styles from "./Search.module.css";
import FiltersSection from "../Home/FiltersSection/FiltersSection";
import { useLocation } from "react-router-dom";

const Search = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const idFilter = searchParams.get("q");

  const location = useLocation();

  const urlAtual = window.location.href.split("/")[5];
  const filter = urlAtual.split("?")[0]; 

  const [moviesList, setMoviesList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [resultTitle, setResultTitle] = useState("");

  const getMoviesByFilter = async (url) => {
    setLoading(true);
    if(url.includes("query")) {
      url = `/search/movie${url}&language=pt-BR`
    } else {
      url = `/discover/movie${url}&language=pt-BR`
    }

    await api
      .get(url)
      .then(({ data }) => {
        console.log(data.results);
        
        setMoviesList(data.results);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getActorName = async (idPerson) => {
    setLoading(true);
    await api
      .get(`/person/${idPerson}?language=pt-BR`)
      .then(({ data }) => {
        setResultTitle(`Filmes do(a) ${data.name}`);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getGenreName = async (idGenre) => {
    setLoading(true);
    await api
      .get(`/genre/movie/list?language=pt-BR`)
      .then(({ data }) => {
        setResultTitle(`Filmes de ${data.genres.find((item) => item.id == idGenre).name}`);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    let url = "";

    switch (filter) {
      case "decada":
        url = `?primary_release_date.gte=${
          Number(idFilter) + 1
        }-01-01&primary_release_date.lte=${Number(idFilter) + 10}-12-31`;
        setResultTitle("Filmes da Década de " + idFilter);
        break;
      case "ordenacao":
        url = order.find((item) => item.id === idFilter).url;
        setResultTitle(order.find((item) => item.id === idFilter).name);
        break;
      case "genero":
        url = `?with_genres=${idFilter}`;
        getGenreName(idFilter);
        break;
      case "pais":
        url = `?with_origin_country=${idFilter}`;
        setResultTitle(`Filmes do(a) ${countries.find((item) => item.id === idFilter).name}`);
        break;
      case "atores":
        url = `?with_cast=${idFilter}`;
        getActorName(idFilter);
        break;
      default:
        url = `?query=${idFilter}`;
        setResultTitle(`Filmes com o nome "${idFilter}"`);
        break;
    }

    getMoviesByFilter(url);
  }, [location]);

  return (
    <div>
      <NavBar />
      <FiltersSection/>
      <section className={styles.section}>
      <div className={styles.top}>
        <h4 className={styles.title}>{resultTitle}</h4>
      </div>
      <div className={styles.container}>
        {loading ? (
          <p>Carregando...</p>
        ) : moviesList.length > 0 ? (
          moviesList.map((movie) => (
            <div className={styles.movie} key={movie.id}>
              {movie.poster_path ? (
                <img
                src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                alt={movie.title}
                className={styles.movieImage}
              />
              ) : (
                <div className={`${styles.movieImage} ${styles.movieImagePlaceholder}`}>
                  <i class="bi bi-film"></i>
                </div>
              )}
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
        ) : (
          <p className={styles.erro}><i class="bi bi-exclamation-circle-fill"></i>Não foram encontrados filmes.</p>
        )}
      </div>
    </section>
    </div>
  );
};

export default Search;
