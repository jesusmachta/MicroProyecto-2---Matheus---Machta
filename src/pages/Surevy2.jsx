import React, { useState, useEffect, forwardRef } from 'react';
import { getGamesTitle } from './GetGames';

const Survey2 = forwardRef(({ setvalues, defaultValue }, ref) => {
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
    <select onChange={handleTitleChange} value={defaultValue} ref={ref}>
      {titles.map((title, index) => (
        <option key={index} value={title}>
          {title}
        </option>
      ))}
    </select>
  );
});

export default Survey2;