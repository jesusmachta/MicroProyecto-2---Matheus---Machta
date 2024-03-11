import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styles from "./ClubDetail.module.css";
import VideoJuegoDetail from "./VideoJuegoDetail";
import Navbar from "../pages/Navbar";
import {
  addSubscriptionFunction,
  removeSubscriptionFunction,
} from "../controllers/addSubscription";
import { useUser } from "../context/user";
import { useNavigate } from "react-router-dom";
import {
  collection,
  where,
  query,
  getDocs,
  getFirestore,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import Swal from 'sweetalert2'; 

export default function ClubDetail({ club }) {
  const userL = useUser();
  const [userid, setUserid] = useState(null);
  const [selectedVideojuego, setSelectedVideojuego] = useState(null);
  const nav = useNavigate();
  const [datosCargados, setDatosCargados] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
  const [userSubscriptions, setUserSubscriptions] = useState([]);

  const mostrarAlert =(text, icon, title) =>{
    // Swal.fire('Registrado con éxito!', 'success'); 
    Swal.fire({
      icon: icon, 
      title: title,
      text: text,
      showCancelButton: false,
      showCloseButton: true,
      showConfirmButton: false
    });
  }

  useEffect(() => {
    if (userL) {
      setUserEmail(userL.email);
      console.log("Correo: ");
      console.log(userL.email);
    }
    const findUser = async () => {
      console.log("Se estan cargando los datos");
      try {
        const querySnapshot = await getDocs(
          query(collection(db, "Usuarios"), where("email", "==", userEmail))
        );
        console.log("snapshot");
        querySnapshot.forEach((doc) => {
          setUserid(doc.id); //la info que esta en el doc
          console.log("Usuario encontrado");
          setDatosCargados(true);
          console.log("despues de datos cardos = true");
        });
      } catch (error) {
        console.log("Error buscando el doc: ", error);
      }
    };
    findUser();
  }, [nav, userEmail, userL]);

  useEffect(() => {
    const fetchData = async () => {
      const db = getFirestore();
      const userRef = doc(db, "Usuarios", userid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const userData = userSnap.data();
        setUserSubscriptions(userData.subscriptions || []);
        setDatosCargados(true);
      }
    };

    fetchData();
  }, [userid]);

  const update = () => {
    console.log("eNTRO EN EL UPDATE PARA AGREGAR SUB");
    if (datosCargados) {
      addSubscriptionFunction(userid, club.nombre);
      console.log("Unirse al club");
      mostrarAlert("Se suscribió exitosamente al grupo",'success', 'Suscripción exitosa' ); 
    } else {
      console.log("Los datos todavía no estan cargados");
    }
  };

  const leave = () => {
    console.log("Saliendo del club");
    if (datosCargados) {
      removeSubscriptionFunction(userid, club.nombre);
      console.log("Salir del club");
      mostrarAlert("Se salió del grupo exitosamente", 'success', 'Desuscripción exitosa' ); 
    } else {
      console.log("Los datos todavía no estan cargados");
    }
  };

  if (selectedVideojuego) {
    return <VideoJuegoDetail videojuego={selectedVideojuego} />;
  }

  const isMember = userSubscriptions.find(
    (subscription) => subscription.nombre === club.nombre
  );

  return (
    <div className={styles.root}>
      <Navbar />
      <h1 className={styles.nombreClub}>{club.nombre}</h1>
      <p className={styles.descripcionClub}>{club.descripcion}</p>

      <div>
        <p>Juegos que utilizamos en nuestro club</p>
      </div>

      <div className={styles["cards-container"]}>
        {club.videojuegos.map((videojuego) => (
          <div key={videojuego} className={styles.card}>
            <img src={`/${videojuego}.png`} alt={videojuego} />
          </div>
        ))}
      </div>

      {isMember ? (
        <button className={styles.leaveButton} onClick={leave}>
          Salir del club
        </button>
      ) : (
        <button className={styles.joinButton} onClick={update}>
          Unirse al club
        </button>
      )}
    </div>
  );
}

ClubDetail.propTypes = {
  club: PropTypes.shape({
    nombre: PropTypes.string.isRequired,
    descripcion: PropTypes.string.isRequired,
    videojuegos: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};
