import { useState } from "react";
import styles from "./NavBar.module.css";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [isSearchInputVisible, setIsSearchInputVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSearchInput = () => {
    if (isSearchInputVisible === true && searchTerm === "") {
      setIsSearchInputVisible(false);
    } else if (isSearchInputVisible === false) {
      setIsSearchInputVisible(true);
    } else {
      alert(searchTerm);
      //enviar termo de pesquisa
    }
  }

  window.onload = function() {
    window.scrollTo(0, 0);
};

  return (
    <nav className={styles.navbar}>
      {isMenuOpen ? (
        <i
          className={`${styles.iconOpenMenu} bi bi-list`}
          onClick={toggleMenu}
        ></i>
      ) : (
        <i
          className={`${styles.iconCloseMenu} bi bi-x`}
          onClick={toggleMenu}
        ></i>
      )}

      <h1 className={styles.title}>CINERADAR</h1>

      <ul className={isMenuOpen ? styles.list : styles.lateralMenu}>
        <li className={styles.item}>
          <NavLink
            to="/cineradar"
            className={({ isActive }) =>
              isActive ? styles.activeItemMenu : ""
            }
          >
            Início
          </NavLink>
        </li>
        <li className={styles.item}>
          <NavLink
            to="/cineradar/filme"
            className={({ isActive }) =>
              isActive ? styles.activeItemMenu : ""
            }
          >
            Filmes
          </NavLink>
        </li>
        <li className={styles.item}>
          <NavLink
            to="/cineradar/filme"
            className={({ isActive }) =>
              isActive ? styles.activeItemMenu : ""
            }
          >
            Filtros
          </NavLink>
        </li>
      </ul>

      <div className={styles.searchContainer}>
        {isSearchInputVisible && (
          <input
            className={styles.inputSearch}
            type="search"
            name="search"
            id="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        )}
        <i
          className={`${
            isSearchInputVisible ? styles.barSearch : styles.iconSearch
          } bi bi-search`}
          onClick={toggleSearchInput}
        ></i>
      </div>
    </nav>
  );
};

export default NavBar;
