import { useEffect, useState } from "react";
import styles from "./FiltersSection.module.css";
import iconRadar from "../../../Assets/iconRadar.svg";
import api from "../../../Services/api";
import countries from "../../../Data/Countries.json";
import decades from "../../../Data/Decades.json";
import order from "../../../Data/Order.json";
import { useNavigate } from "react-router-dom";

const FiltersSection = () => {
  const filtros = ["Década", "País", "Gênero", "Atores", "Ordenação"];

  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("");
  const [resultFilter, setResultFilter] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const getGenres = async () => {
    await api
      .get("/genre/movie/list?language=pt-BR")
      .then(({ data }) => {
        setResultFilter(data.genres);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getActors = async () => {
    await api
      .get("/person/popular")
      .then(({ data }) => {
        const excludedIds = [239507, 4095744, 3371804, 1907997];
        const notAdultActors = data.results.filter(
          (result) => !excludedIds.includes(result.id)
        );
        const onlyActors = notAdultActors.filter(
          (result) => result.known_for_department === "Acting"
        );
        setResultFilter(onlyActors);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getFilter = (filter) => () => {
    setActiveFilter(filter);

    switch (filter) {
      case "Década":
        setResultFilter(decades);
        break;
      case "Ordenação":
        setResultFilter(order);
        break;
      case "Gênero":
        getGenres();
        break;
      case "Atores":
        getActors();
        break;
      case "País":
        setResultFilter(countries);
        setRoute("?with_origin_country=");
        break;
      default:
        break;
    }
  };

  const searchByFilter = (item, tipo) => {
    const formatActiveFilter = activeFilter
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
    if (tipo === "filmes") {
      navigate(`/pesquisa/filmes?q=${item.id}`);
    } else {
      if (activeFilter === "Década") {
        navigate(`/pesquisa/${formatActiveFilter}?q=${item.name}`);
      } else {
        navigate(`/pesquisa/${formatActiveFilter}?q=${item.id}`);
      }
    }
  };

  return (
    <section className={styles.section} id="filtersList">
      <div className={styles.top}>
        <h4 className={styles.title}>
          Encontre o <span className={styles.contrast}>filme ideal</span> pra
          você!
        </h4>
        <div className={styles.containerSearch}>
          <input
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.inputSearch}
            placeholder="Procure pelo nome do filme..."
            autoComplete="off"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                searchByFilter({ id: searchTerm }, "filmes");
              }
            }}
          />
          <i
            className={`${styles.iconSearch} bi bi-search`}
            onClick={() => searchByFilter({ id: searchTerm }, "filmes")}
          ></i>
        </div>
      </div>
      <div className={styles.container}>
        {filtros.map((filtro) => (
          <span
            className={`${styles.filterCards} ${
              activeFilter === filtro ? styles.active : ""
            }`}
            onClick={getFilter(filtro)}
          >
            Por {filtro}
          </span>
        ))}
      </div>
      {activeFilter ? (
        <div className={styles.resultFilter}>
          {resultFilter &&
            resultFilter.map((item) => (
              <div className={styles.containerResultFilter}>
                <p
                  className={styles.itemResultFilter}
                  onClick={() => searchByFilter(item, "")}
                >
                  {item.name ? item.name : item.title}
                </p>
                {item.profile_path && (
                  <img
                    src={`https://image.tmdb.org/t/p/original${item.profile_path}`}
                    alt={item.name}
                    className={styles.photoActorFilter}
                  />
                )}
              </div>
            ))}
        </div>
      ) : null}
    </section>
  );
};

export default FiltersSection;
