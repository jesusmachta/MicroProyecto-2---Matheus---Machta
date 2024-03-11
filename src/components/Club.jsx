import { useState, useEffect } from "react";
import styles from "./Club.module.css";
import { getClub } from "../controllers/clubes";
import Navbar from "../pages/Navbar";
import ClubDetail from "./ClubDetail";

export default function Card() {
  const [clubes, setClubes] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedClub, setSelectedClub] = useState(null);

  useEffect(() => {
    async function fetchClubes() {
      const clubes = await getClub();
      setClubes(clubes);
    }

    fetchClubes();
  }, []);

  if (selectedClub) {
    return <ClubDetail club={selectedClub} />;
  }

  return (
    <div className={styles.root}>
      <Navbar />
      <input
        className={styles.search}
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Buscar club..."
      />
      <div className={styles["cards-container"]}>
        {clubes
          .filter((club) =>
            club.nombre
              ? club.nombre.toLowerCase().includes(search.toLowerCase())
              : false
          )
          .map((club) => (
            <div
              key={club.id}
              className={styles.card}
              onClick={() => setSelectedClub(club)}
            >
              <div>
                <div className={styles.nombre}>{club.nombre}</div>
                <div className={styles.descripcion}>{club.descripcion}</div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
