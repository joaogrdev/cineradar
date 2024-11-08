import React, { useEffect } from "react";
import NavBar from "../../Components/NavBar/NavBar";
import order from "../../Data/Order.json";
import api from "../../Services/api";

const Search = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const idFilter = searchParams.get("q");

  const urlAtual = window.location.href.split("/")[4];
  const filter = urlAtual.split("?")[0];

  const getMoviesByFilter = async (url) => {
    await api
      .get(`/discover/movie${url}`)
      .then(({ data }) => {
        console.log(data.results);
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
          idFilter + 1
        }-01-01&primary_release_date.lte=${idFilter + 10}-12-31`;
        break;
      case "ordenacao":
        url = order.find((item) => item.id === idFilter).url;
        break;
      case "genero":
        url = `?with_genres=${idFilter}`;
        break;
      case "pais":
        url = `?region=${idFilter}`;
        break;
      case "atores":
        url = `?with_cast=${idFilter}`;
        break;
      default:
        url = `?title=${idFilter}`;
        break;
    }

    getMoviesByFilter(url);
  }, [idFilter, filter]);

  return (
    <div>
      <NavBar />
      <p>{filter}</p>
    </div>
  );
};

export default Search;
