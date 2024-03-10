import Navbar from "./Navbar";
import { InputControl } from "../pages/InputControl/InputControl";
import styles from "./Perfil.module.css"; 
import { auth, db } from "../firebase"; 
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { collection,  where, query, getDocs } from "firebase/firestore"; 
import { UserContext, useUser } from "../context/user";
import { UpdateUserComponent } from "../controllers/usuarios";
import Survey from "./Survey";

export default function Perfil() {
  const userL = useUser(); 
  const [userEmail, setUserEmail] = useState(null);  
  const nav = useNavigate(); 
  const [userid, setUserid] = useState(null); 
  const [userName, setUserName] = useState(null);
  const [userFavoriteGame, setUserFavoriteGame] = useState(null);
  const [userPassword, setUserPassword] = useState(null);
  const[datosCargados, setDatosCargados] = useState(false); 
  const [values, setvalues] = useState({ name: "", email: "", password: "",favoriteGame: "The Witcher 3: Wild Hunt" });

  useEffect(()=>{
    if(userL){
      setUserEmail(userL.email);
    }

    const findUser = async()=>{
      try{
        const querySnapshot = await getDocs(query(collection(db, "Usuarios"), where('email','==', userEmail))); 
        querySnapshot.forEach((doc) =>{
          setUserid(doc.id); 
          setUserName(doc.data().name); 
          setUserFavoriteGame(doc.data().favoriteGame); 
          setUserPassword(doc.data().password);
          setDatosCargados(true); 
        });  
      }catch(error){
        console.log("Error buscando el doc: ", error); 
      }
    }; 
    findUser(); 
  },[nav, userEmail, userL]); 

  const logOut =() =>{
    auth.signOut(); 
    nav("/register"); 
  }

  const handleUpdate = () => {
        setUserFavoriteGame(values.favoriteGame); 
    UpdateUserComponent({ id: userid, email: userEmail, userFavoriteGame,  name: userName, userL });
  };

  if(datosCargados){
    return (
      <div className={styles.container}>
        <Navbar />
        <div>
          <h1>TU PERFIL</h1>
        </div>
        <div className={styles.containerInfo}>
          <h2>Nombre: </h2>
          <InputControl
            placeholder = {userName}
            onChange = {(event) => 
              setUserName(event.target.value)
            }
          ></InputControl>
          <h2>Correo: </h2>
          <InputControl
            placeholder = {userEmail}
            onChange ={(event)=>
              setUserEmail(event.target.value)
            }
          ></InputControl>
          <h2>Juego favorito</h2>
          <Survey
                setvalues={setvalues}
                defaultValue ={userFavoriteGame}
          />
          {/* <InputControl
            placeholder = {userFavoriteGame}
            onChange ={(event)=>
              setUserFavoriteGame(event.target.value)
            }
          ></InputControl> */}
          <h2>Contraseña</h2>
          <InputControl
            placeholder = {userPassword}
            onChange ={(event)=>
              setUserPassword(event.target.value)
            }
          ></InputControl>
          <div className={styles.containerBotones}>
            <button onClick = {logOut} className={styles.botonIzq}>Cerrar sesión</button>
            <button onClick = {handleUpdate} className={styles.botonDer}>Guardar Cambios</button>
          </div>
        </div>
      </div>
    );
  }
}