import { useState, useEffect } from "react";
import { getGamesTitle } from "./GetGames";
import styles from "./Survey.module.css";

export default function Survey({ setvalues, defaultValue }) {
  const [titles, setTitles] = useState([]);

  useEffect(() => {
    async function fetchTitles() {
      const response = await getGamesTitle();
      setTitles(response);
    }

    fetchTitles();
  }, []);

  const handleTitleChange = (event) => {
    setvalues((prev) => ({ ...prev, favoriteGame: event.target.value }));
  };

  return (
    <div className={styles.surveyContainer}>
      {" "}
      <select
        className={styles.dropdown}
        onChange={handleTitleChange}
        value={defaultValue}
      >
        {" "}
        {titles.map((title, index) => (
          <option key={index} value={title}>
            {title}
          </option>
        ))}
      </select>
    </div>
  );
}
