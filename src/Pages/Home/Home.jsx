import NavBar from "../../Components/NavBar/NavBar";
import LandingPage from "./LandingPage/LandingPage";
import MovieDetails from "../MovieDetails/MovieDetails";
import styles from "./Home.module.css";
import FiltersSection from "./FiltersSection/FiltersSection";
import MoviesList from "./MoviesList/MoviesList";
import Footer from "../../Components/Footer/Footer";

export default function Home() {
  return (
    <div className={styles.container}>
      <NavBar />
      <LandingPage />
      <FiltersSection />
      <MoviesList/>
      <Footer/>
    </div>
  );
}
