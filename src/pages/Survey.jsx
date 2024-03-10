import {useState, useEffect} from 'react'; 
import { getGamesTitle } from './GetGames';



export default function Survey({setvalues, defaultValue}){
  const [titles, setTitles] = useState([]); 
  useEffect(() => {
    async function fetchTitles() {
      const response = await getGamesTitle();
      setTitles(response);
    }

    fetchTitles();
  }, []);
  const handleTitleChange=(event) =>{

    setvalues((prev)=>({...prev, favoriteGame: event.target.value,})); 
    // const selectedTitle = event.target.value;

    // console.log(event.target.value) ; 

    // setSelectedTitle=(selectedTitle); 
    // const getTitle = [setSelectedTitle]; 
    // getTitle(setSelectedTitle); 
  };

  return (
    <select onChange = {handleTitleChange} value={defaultValue}>
      {titles.map((title, index) => (
        <option key={index} value={title}>
          {title}
        </option>
      ))}
    </select>
  );


}

