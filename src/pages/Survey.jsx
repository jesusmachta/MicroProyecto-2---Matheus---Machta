import {useState, useEffect} from 'react'; 
import { getGamesTitle } from './GetGames';



export default function Survey(){
  const [titles, setTitles] = useState([]); 
  useEffect(() => {
    async function fetchTitles() {
      const response = await getGamesTitle();
      setTitles(response);
    }

    fetchTitles();
  }, []);

  return (
    <select>
      {titles.map((title, index) => (
        <option key={index} value={title}>
          {title}
        </option>
      ))}
    </select>
  );


}

