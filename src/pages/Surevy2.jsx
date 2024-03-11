import React, { useState, useEffect, forwardRef } from "react";
import { getGamesTitle } from "./GetGames";
import styles from "./Survey2.module.css";

const Survey2 = forwardRef(({ setvalues, defaultValue }, ref) => {
  const [titles, setTitles] = useState([]);
  const [selectedValue, setSelectedValue] = useState(defaultValue);

  useEffect(() => {
    async function fetchTitles() {
      const response = await getGamesTitle();
      setTitles(response);
    }

    fetchTitles();
  }, []);

  const handleTitleChange = (event) => {
    setSelectedValue(event.target.value);
    setvalues((prev) => ({ ...prev, favoriteGame: selectedValue }));
  };

  return (
    <div className={styles.surveyContainer}>
      {" "}
      {/* Aplica el estilo al contenedor */}
      <select
        className={styles.dropdown}
        onChange={handleTitleChange}
        value={selectedValue}
        ref={ref}
      >
        {" "}
        {/* Aplica el estilo al dropdown */}
        {titles.map((title, index) => (
          <option key={index} value={title}>
            {title}
          </option>
        ))}
      </select>
    </div>
  );
});

export default Survey2;
