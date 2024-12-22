import styles from "./LandingPage.module.css";
import { useEffect, useState } from "react";
import api from "../../../Services/api";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [idActiveCard, setIdActiveCard] = useState(cards[4]?.id);
  const [activeCard, setActiveCard] = useState(cards[4]);
  const [generos, setGeneros] = useState([]);
  const [showModalTrailer, setShowModalTrailer] = useState(false);
  const [trailerKey, setTrailerKey] = useState("");

  /*get a list of 6 current playing movies ------------------*/
  useEffect(() => {
    api
      .get("/movie/now_playing?language=pt-BR")
      .then(({ data }) => {
        const notAdultMovies = data.results.filter((movie) => movie.adult === false);
        const firstSixCards = notAdultMovies.slice(0, 6);
        setCards(firstSixCards);
        setIdActiveCard(firstSixCards[4]?.id);
        setActiveCard(firstSixCards[4]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  /*get the list of genres by current playing movies ------------------*/
  useEffect(() => {
    api
      .get(`/genre/movie/list?language=pt-BR`)
      .then(({ data }) =>
        setGeneros(
          data.genres
            .filter((genre) => activeCard.genre_ids.includes(genre.id))
            .map((genre) => genre.name)
        )
      )
      .catch((error) => {
        console.log(error);
      });
  }, [activeCard]);

  /*change card when click on arrows from carousel----------------*/
  const changeCard = (dir) => {
    const newCardOrder = [...cards];

    if (dir === "left") {
      const firstCard = newCardOrder[0];
      newCardOrder.shift(firstCard);
      newCardOrder.push(firstCard);
    } else {
      const lastCard = newCardOrder[newCardOrder.length - 1];
      newCardOrder.unshift(lastCard);
      newCardOrder.pop(lastCard);
    }

    setCards(newCardOrder);
    setIdActiveCard(newCardOrder[4]?.id);
    setActiveCard(newCardOrder[4]);
  };

  /*get most recent trailer by movie id ------------------*/
  const getTrailerById = (id) => {
    api
      .get(`/movie/${id}/videos?language=pt-BR`)
      .then(({ data }) => {
        const mostRecentTrailer = data.results
          .sort((a, b) => new Date(a.published_at) - new Date(b.published_at))
          .find((result) => result.type === "Trailer");
        setTrailerKey(mostRecentTrailer.key);
        setShowModalTrailer(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <section className={styles.container}>
      <img
        className={styles.imgFundo}
        src={"https://image.tmdb.org/t/p/original" + activeCard?.backdrop_path}
        alt=""
      />

      <div className={styles.info}>
        <h1 className={styles.movieTitle}>{activeCard?.title}</h1>
        <span className={styles.movieGenres}>{generos.join(" | ")}</span>
        <div className={styles.btnsAction}>
          <i title="Ver Mais" className={`${styles.btnDetails} bi bi-plus`} 
          onClick={() => navigate(`/filme/${activeCard?.id}`)}/>
          <i
            title="Assistir Trailer"
            className={`${styles.btnTrailer} bi bi-play-fill`}
            onClick={() => getTrailerById(activeCard?.id)}
          />
        </div>
      </div>

      <div className={styles.cards}>
        <i
          className={`${styles.arrow} bi bi-arrow-left-short`}
          onClick={() => changeCard("left")}
        ></i>

        {cards.map((card) => (
          <img
            key={card.id}
            id={card.id}
            className={`${idActiveCard === card.id && styles.active} ${
              styles.card
            }`}
            src={"https://image.tmdb.org/t/p/w500" + card.poster_path}
            alt={card.title}
          />
        ))}

        <i
          className={`${styles.arrow} bi bi-arrow-right-short`}
          onClick={() => changeCard("right")}
        ></i>
      </div>

      <div
        className={styles.bg}
        onClick={() => setShowModalTrailer(false)}
      ></div>

      {showModalTrailer && (
        <div className={styles.modalTrailer}>
          <iframe
            src={`https://www.youtube.com/embed/${trailerKey}`}
            title="YouTube video player"
            allowFullScreen
          />
          <i
            className={`${styles.btnCloseModalTrailer} bi bi-x`}
            onClick={() => setShowModalTrailer(false)}
          ></i>
        </div>
      )}
    </section>
  );
}
