import { useState } from "react";
import { removeSubscriptionFunction } from "../controllers/addSubscription";
import Swal from "sweetalert2";


export default function SuscriptionProfile({ subscribedClubs, idUser }) {
  const [clubs, setClubs] = useState(subscribedClubs);
  //   const handleLeaveClubs = clubs.filter((club) => club.id !== clubId);
  //   setClubs(updatedClubs);
  const mostrarAlert = () => {
    // Swal.fire('Registrado con éxito!', 'success');
    Swal.fire({
      icon: "success",
      title: "Desuscripción exitosa",
      text: "Se salió del grupo exitosamente",
      showCancelButton: false,
      showCloseButton: true,
      showConfirmButton: false,
    });
  };
  const leave = (clubnombre) => {
    console.log("Saliendo del club");

    removeSubscriptionFunction(idUser, clubnombre);
    console.log("Salir del club");
    mostrarAlert();
    

  };
  if (subscribedClubs !== "") {
    return (
      <div className="card-container">
        <h2 style={{ textAlign: "center" }}>Suscripciones</h2>
        {clubs.map((club) => (
          <div key={club.id}>
            <h3 style={{ textAlign: "center" }}>{club.nombre}</h3>
            <button
              style={{
                textAlign: "center",
                marginLeft: "25%",
              }}
              onClick={() => leave(club.nombre)}
            >
              Salir del club
            </button>
          </div>
        ))}
      </div>
    );
  }
}
