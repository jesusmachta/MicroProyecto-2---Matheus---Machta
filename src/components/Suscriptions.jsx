import { useState } from "react";
import { removeSubscriptionFunction } from "../controllers/addSubscription";

export default function SuscriptionProfile({ subscribedClubs, idUser }) {
  const [clubs, setClubs] = useState(subscribedClubs);
  //   const handleLeaveClubs = clubs.filter((club) => club.id !== clubId);
  //   setClubs(updatedClubs);
  const leave = (clubnombre) => {
    console.log("Saliendo del club");
   
      removeSubscriptionFunction(idUser, clubnombre);
      console.log("Salir del club");
  
  };

  return (
    <div className="card-container">
      {clubs.map((club) => (
        <div key={club.id}>
          <h3>{club.nombre}</h3>
          <button onClick={() => leave(club.nombre)}>Salir del club</button>
        </div>
      ))}
    </div>
  );
}
