import { useState, useEffect } from "react";
import { getGamesTitle } from "./GetGames";

export default function Survey({ setvalues, defaultValue }) {
  const [titles, setTitles] = useState([]);

  // Cuando el componente se monta, obtiene los títulos de los juegos
  useEffect(() => {
    async function fetchTitles() {
      const response = await getGamesTitle();
      setTitles(response);
    }

    fetchTitles();
  }, []);

  // Cuando el usuario selecciona un juego, actualiza el estado `favoriteGame` en `Register`
  const handleTitleChange = (event) => {
    setvalues((prev) => ({ ...prev, favoriteGame: event.target.value }));
  };

  // Renderiza un dropdown con los títulos de los juegos
  return (
    <select onChange={handleTitleChange} value={defaultValue}>
      {titles.map((title, index) => (
        <option key={index} value={title}>
          {title}
        </option>
      ))}
    </select>
  );
}
