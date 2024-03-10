import Navbar from "./Navbar";
import { InputControl2 } from "../pages/InputControl/InputControl2";
import styles from "./Perfil.module.css"; 
import { auth, db } from "../firebase"; 
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { collection,  where, query, getDocs } from "firebase/firestore"; 
import { UserContext, useUser } from "../context/user";
import Survey2 from "./Surevy2";
import { UpdateUserFunction } from "../controllers/updateUser";

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

  const favoriteGameRef = useRef();
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();



//   const handleSaveChanges =()=>{
//         setUserFavoriteGame(values.favoriteGame); 
//         UpdateUserFunction(userid, userEmail, userFavoriteGame, userName); 

//   }

  useEffect(()=>{
    if(userL){
      setUserEmail(userL.email);
    }

    const findUser = async()=>{
      try{
        const querySnapshot = await getDocs(query(collection(db, "Usuarios"), where('email','==', userEmail))); 
        querySnapshot.forEach((doc) =>{
          setUserid(doc.id); //la info que esta en el doc
          setUserName(doc.data().name); 
          setUserFavoriteGame(doc.data().favoriteGame); 
          console.log("juego favorito"); 
          console.log(userFavoriteGame); 
          console.log(typeof userFavoriteGame); 
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

  const update =() => {
        const favRef = favoriteGameRef.current.value; 
        console.log("Nuevo juego"); 
        console.log(favRef); 
        const mailRef = emailRef.current.value; 
        const nombreRef = nameRef.current.value; 
        const passRef = passwordRef.current.value; 
        // console.log("password en update"); 
        // console.log(passRef); 
        if (favRef !== '' || mailRef !== '' || nombreRef !== '' || passRef !== ''){
                UpdateUserFunction({ id: userid, email: userEmail, favoriteGame: userFavoriteGame,  name: userName, password: userPassword, userL: userL, favoriteGameRef: favRef, emailRef: mailRef, nameRef: nombreRef, passwordRef: passRef}); 
        }
       
        





  }

//   const handleUpdate = () => {
        
//     UpdateUserComponent({ id: userid, email: userEmail, userFavoriteGame,  name: userName, userL });
//   };

  if(datosCargados){
    return (
      <div className={styles.container}>
        <Navbar />
        <div>
          <h1>TU PERFIL</h1>
        </div>
        <h2 className={styles.editables}>Campos editables*</h2>
        <div className={styles.containerInfo}>
          <h2>*Nombre: </h2>
          <InputControl2
            placeholder = {userName}
        //     onChange = {(event) => 
        //       setUserName(event.target.value)
        
        //     }
          ref = {nameRef}
          readOnly = {false}
          ></InputControl2>
          <h2>Correo: </h2>
          <InputControl2
            placeholder = {userEmail}
        //     onChange ={(event)=>
        //       setUserEmail(event.target.value)
        //     }
        ref = {emailRef}
        readOnly = {true}
          ></InputControl2>
          <h2>*Juego favorito</h2>
          <Survey2
                setvalues={setvalues}
                defaultValue ={userFavoriteGame}
                ref = {favoriteGameRef}
          />
          {/* <InputControl
            placeholder = {userFavoriteGame}
            onChange ={(event)=>
              setUserFavoriteGame(event.target.value)
            }
          ></InputControl> */}
          <h2>Contraseña</h2>
          <InputControl2
            placeholder = {userPassword}
        //     onChange ={(event)=>
        //       setUserPassword(event.target.value)
        //     }
        readOnly = {true}
        ref = {passwordRef}
          ></InputControl2>
          <div className={styles.containerBotones}>
            <button onClick = {logOut} className={styles.botonIzq}>Cerrar sesión</button>
            <button onClick = {update} className={styles.botonDer}>Guardar Cambios</button>
          </div>
        </div>
      </div>
    );
  }
}

// favoriteGameRef, emailRef, nameRef, passwordRef })