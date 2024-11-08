import styles from "./LandingPage.module.css";
import NavBar from "../../../Components/NavBar/NavBar";
import { useEffect, useState } from "react";
import api from "../../../Services/api";

export default function LandingPage() {
  const [cards, setCards] = useState([]);
  const [idActiveCard, setIdActiveCard] = useState(cards[4]?.id);
  const [activeCard, setActiveCard] = useState(cards[4]);
  const [generos, setGeneros] = useState([]);
  const [showModalTrailer, setShowModalTrailer] = useState(false);
  const [trailerKey, setTrailerKey] = useState("");

  useEffect(() => {
    api
      .get("/movie/now_playing?language=pt-BR")
      .then(({ data }) => {
        const primeirosSeisCards = data.results.slice(0, 6);
        setCards(primeirosSeisCards);
        setIdActiveCard(primeirosSeisCards[4]?.id);
        setActiveCard(primeirosSeisCards[4]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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

  const getTrailerById = (id) => {
    api
      .get(`/movie/${id}/videos?language=pt-BR`)
      .then(({ data }) => {
        const movieWithTheMinorPublishedDate = data.results
          .sort((a, b) => new Date(a.published_at) - new Date(b.published_at))
          .find((result) => result.type === "Trailer");
        setTrailerKey(movieWithTheMinorPublishedDate.key);
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

      <div className={styles.info}>
        <h1 className={styles.movieTitle}>{activeCard?.title}</h1>
        <div className={styles.containerDetails}>
          <span className={styles.movieGenres}>{generos.map((genero) => genero).join(" | ")}</span>
        </div>
        <div className={styles.btnsAction}>
          <i title="Ver Mais" className={`${styles.btnDetails} bi bi-plus`}></i>
          <i title="Assistir Trailer" className={`${styles.btnTrailer} bi bi-play-fill`} onClick={() => getTrailerById(activeCard?.id)}></i>
        </div>
      </div>

      <div className={styles.bg} onClick={() => setShowModalTrailer(false)}></div>

      {showModalTrailer && (
        <div className={styles.modalTrailer}>
          <iframe
            src={`https://www.youtube.com/embed/${trailerKey}`}
            title="YouTube video player"
            allowFullScreen
          />
          <i className={`${styles.btnCloseModalTrailer} bi bi-x`} onClick={() => setShowModalTrailer(false)}></i>   
        </div>
      )}
    </section>
  );
}
