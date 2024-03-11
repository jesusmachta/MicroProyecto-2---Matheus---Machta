import Navbar from "./Navbar";
import { InputControl2 } from "../pages/InputControl/InputControl2";
import styles from "./Perfil.module.css";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { collection, where, query, getDocs } from "firebase/firestore";
import { useUser } from "../context/user";
import Survey2 from "./Surevy2";
import { UpdateUserFunction } from "../controllers/updateUser";
import SuscriptionProfile from "../components/Suscriptions";
import Swal from "sweetalert2";

export default function Perfil() {
  const userL = useUser();
  const [userEmail, setUserEmail] = useState(null);
  const nav = useNavigate();
  const [userid, setUserid] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userLastName, setUserLastName] = useState(null);
  const [userUserName, setUserUserName] = useState(null);
  const [userFavoriteGame, setUserFavoriteGame] = useState(null);
  const [userPassword, setUserPassword] = useState(null);
  const [datosCargados, setDatosCargados] = useState(false);
  const [suscriptions, setSuscriptions] = useState([]);
  const [setvalues] = useState({
    name: "",
    lastname: "",
    username: "",
    email: "",
    favoriteGame: "The Witcher 3: Wild Hunt",
  });
  const mostrarAlert = (text, icon, title) => {
    // Swal.fire('Registrado con éxito!', 'success');
    Swal.fire({
      icon: icon,
      title: title,
      text: text,
      showCancelButton: false,
      showCloseButton: true,
      showConfirmButton: false,
    });
  };

  const favoriteGameRef = useRef();
  const nameRef = useRef();
  const lastnameRef = useRef();
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  useEffect(() => {
    if (userL) {
      setUserEmail(userL.email);
    }

    const findUser = async () => {
      try {
        const querySnapshot = await getDocs(
          query(collection(db, "Usuarios"), where("email", "==", userEmail))
        );
        querySnapshot.forEach((doc) => {
          setUserid(doc.id); //la info que esta en el doc
          setUserName(doc.data().name);
          console.log(userName);
          setUserLastName(doc.data().lastName);
          setUserUserName(doc.data().username);
          setUserFavoriteGame(doc.data().favoriteGame);
          setSuscriptions(doc.data().subscriptions);
          console.log("Suscripciones: ");
          console.log(suscriptions);
          console.log("juego favorito");
          console.log(userFavoriteGame);
          console.log(typeof userFavoriteGame);
          setUserPassword("*******");
          setDatosCargados(true);
          console.log("DATOS CARGADOS");
        });
      } catch (error) {
        console.log("Error buscando el doc: ", error);
      }
    };
    findUser();
  }, [nav, userEmail, userL]);

  const logOut = () => {
    auth.signOut();
    nav("/login");
    mostrarAlert(
      "Se cerró exitosamente su sesión",
      "success",
      "Sesión cerrada exitosamente"
    );
  };

  const update = () => {
    const favRef = favoriteGameRef.current.value;
    console.log("Nuevo juego");
    console.log(favRef);
    const mailRef = emailRef.current.value;
    const nombreRef = nameRef.current.value;
    const apellidoRef = lastnameRef.current.value;
    const apodoRef = usernameRef.current.value;
    const passRef = passwordRef.current.value;

    if (
      favRef !== "" ||
      mailRef !== "" ||
      nombreRef !== "" ||
      apellidoRef !== "" ||
      apodoRef !== "" ||
      passRef !== ""
    ) {
      UpdateUserFunction({
        id: userid,
        email: userEmail,
        favoriteGame: userFavoriteGame,
        name: userName,
        lastname: userLastName,
        username: userUserName,
        userL: userL,
        favoriteGameRef: favRef,
        emailRef: mailRef,
        nameRef: nombreRef,
        lastnameRef: apellidoRef,
        usernameRef: apodoRef,
      });
    }
  };

  if (datosCargados) {
    return (
      <div>
        <Navbar />
        <div>
          <h1>TU PERFIL</h1>
        </div>
        <h2 className={styles.editables}>Campos editables*</h2>
        <div>
          <h2>*Nombre: </h2>
          <InputControl2
            placeholder={userName}
            ref={nameRef}
            readOnly={false}
          ></InputControl2>
          <h2>*Apellido: </h2>
          <InputControl2
            placeholder={userLastName}
            ref={lastnameRef}
            readOnly={false}
          ></InputControl2>
          <h2>*Apodo: </h2>
          <InputControl2
            placeholder={userUserName}
            ref={usernameRef}
            readOnly={false}
          ></InputControl2>
          
          <h2>Correo: </h2>
          <InputControl2
            placeholder={userEmail}
            ref={emailRef}
            readOnly={true}
          ></InputControl2>
          <h2>*Juego favorito</h2>
          <Survey2
            setvalues={setvalues}
            defaultValue={userFavoriteGame}
            ref={favoriteGameRef}
          />
          <h2>Contraseña</h2>
          <InputControl2
            placeholder={userPassword}
            readOnly={true}
            ref={passwordRef}
          ></InputControl2>
          <div className="containerCartasPerfil">
            <SuscriptionProfile
              subscribedClubs={suscriptions}
              idUser={userid}
            ></SuscriptionProfile>
          </div>
          <div className={styles.containerBotones}>
            <button onClick={logOut}>Cerrar sesión</button>
            <button onClick={update}>Guardar Cambios</button>
          </div>
        </div>
      </div>
    );
  }
}
