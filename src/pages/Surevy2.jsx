import React, { useState, useEffect, forwardRef } from "react";
import { getGamesTitle } from "./GetGames";

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
    <select onChange={handleTitleChange} value={selectedValue} ref={ref}>
      {titles.map((title, index) => (
        <option key={index} value={title}>
          {title}
        </option>
      ))}
    </select>
  );
});

export default Survey2;
