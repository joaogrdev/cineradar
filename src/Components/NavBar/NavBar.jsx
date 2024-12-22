import { useEffect, useState } from "react";
import styles from "./NavBar.module.css";
import { NavLink, useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [isSocialOpen, setIsSocialOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("home");

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSocial = () => setIsSocialOpen(!isSocialOpen);

  window.onload = function () {
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    if (window.location.href.includes("moviesList")) {
      setActiveMenu("moviesList");
    } else if (window.location.href.includes("filtersList")) {
      setActiveMenu("filtersList");
    } else {
      setActiveMenu("home");
    }
  }, [window.location.href]);

  console.log(activeMenu);

  const moveAnchor = (e, item) => {
    if(item === 'home'){
      window.location.href = '/cineradar';
      return;
    }
    e.preventDefault();
    setActiveMenu(item);
    document.getElementById(item).scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
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

      <h1 className={styles.title} onClick={() => navigate("/cineradar")}>
        CINERADAR
      </h1>

      <ul className={isMenuOpen ? styles.list : styles.lateralMenu}>
        <li className={styles.item}>
          <a
            href="#home"
            className={activeMenu === "home" ? styles.activeItemMenu : ""}
            onClick={(e) => moveAnchor(e, "home")}
          >
            Início
          </a>
        </li>
        <li className={styles.item}>
          <a
            href="#moviesList"
            className={activeMenu === "moviesList" ? styles.activeItemMenu : ""}
            onClick={(e) => moveAnchor(e, "moviesList")}
          >
            Filmes
          </a>
        </li>
        <li className={styles.item}>
          <a
            href="#filtersList"
            className={activeMenu === "filtersList" ? styles.activeItemMenu : ""}
            onClick={(e) => moveAnchor(e, "filtersList")}
          >
            Filtros
          </a>
        </li>
      </ul>

      <i
        className={`${styles.iconInfo} bi bi-info-circle-fill`}
        onClick={toggleSocial}
      ></i>
      <div
        className={`${styles.socialContainer} ${
          isSocialOpen ? styles.openSocial : ""
        }`}
      >
        <a target="_blank" href="www.google.com">
          <i title="Linkedin" class="bi bi-linkedin"></i>
        </a>
        <a target="_blank" href="www.google.com">
          <i title="Github" class="bi bi-github"></i>
        </a>
        <a target="_blank" href="www.google.com">
          <i title="Twitter" class="bi bi-box-arrow-up-right"></i>
        </a>
      </div>
    </nav>
  );
};

export default NavBar;
