import { useState } from "react";
import styles from "./NavBar.module.css";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [isSocialOpen, setIsSocialOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSocial = () => setIsSocialOpen(!isSocialOpen);

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

      <i className={`${styles.iconInfo} bi bi-info-circle-fill`} onClick={toggleSocial}></i>
      <div className={`${styles.socialContainer} ${isSocialOpen ? styles.openSocial : ""}`}>
        <a target="_blank" href="www.google.com"><i title="Linkedin" class="bi bi-linkedin"></i></a>
        <a target="_blank" href="www.google.com"><i title="Github" class="bi bi-github"></i></a>
        <a target="_blank" href="www.google.com"><i title="Twitter" class="bi bi-box-arrow-up-right"></i></a>
      </div>
    </nav>
  );
};

export default NavBar;
