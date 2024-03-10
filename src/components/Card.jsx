import { useState, useEffect } from 'react';
import styles from './Card.module.css';
import { getGames } from "../controllers/videojuegos";
import Navbar from '../pages/Navbar';

export default function Card() {
  const [videojuegos, setVideojuegos] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchGames() {
      const games = await getGames();
      setVideojuegos(games);
    }

    fetchGames();
  }, []);

  return (
    <div className={styles.root}>
      <Navbar />
      <input className={styles.search} type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar videojuego..." />
      <div className={styles['cards-container']}>
        {videojuegos.filter(videojuego => videojuego.titulo.toLowerCase().includes(search.toLowerCase())).map((videojuego) => (
          <div key={videojuego.id} className={styles.card}>
            <img src={`/${videojuego.id}.png`} alt={videojuego.titulo} />
            <div>
              <div className={styles.titulo}>{videojuego.titulo}</div>
              <div className={styles.genero}>{videojuego.genero}</div>
              <div className={styles.descripcion}>{videojuego.descripcion}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}