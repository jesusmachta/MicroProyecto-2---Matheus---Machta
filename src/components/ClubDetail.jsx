import { useState } from "react";
import PropTypes from "prop-types";
import styles from "./ClubDetail.module.css";
import VideoJuegoDetail from "./VideoJuegoDetail";
import Navbar from "../pages/Navbar";
export default function ClubDetail({ club }) {
  const [selectedVideojuego, setSelectedVideojuego] = useState(null);

  if (selectedVideojuego) {
    return <VideoJuegoDetail videojuego={selectedVideojuego} />;
  }

  const handleJoin = () => {
    console.log("Unirse al club");
  };

  return (
    <div className={styles.root}>
      <Navbar />
      <h1 className={styles.nombreClub}>{club.nombre}</h1>
      <p className={styles.descripcionClub}>{club.descripcion}</p>

      <div>
        <p>Juegos que utilizamos en nuestro club</p>
      </div>

      <div className={styles["cards-container"]}>
        {club.videojuegos.map((videojuego) => (
          <div
            key={videojuego}
            className={styles.card}
            onClick={() => setSelectedVideojuego(videojuego)}
          >
            <img src={`/${videojuego}.png`} alt={videojuego} />
          </div>
        ))}
      </div>

      <button className={styles.joinButton} onClick={handleJoin}>
        Unirse al club
      </button>
    </div>
  );
}

ClubDetail.propTypes = {
  club: PropTypes.shape({
    nombre: PropTypes.string.isRequired,
    descripcion: PropTypes.string.isRequired,
    videojuegos: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};
