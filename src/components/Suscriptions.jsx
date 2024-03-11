import { useState } from "react";


export default function SuscriptionProfile({ subscribedClubs }) {
  const [clubs, setClubs] = useState(subscribedClubs);
//   const handleLeaveClubs = clubs.filter((club) => club.id !== clubId);
//   setClubs(updatedClubs);

return (
    <div className="card-container">
      {clubs.map((club) => (
        <div key={club.id}>
          <h3>{club.nombre}</h3>
          <button>
            Salir del club
          </button>
        </div>
      ))}
    </div>
  );
}
