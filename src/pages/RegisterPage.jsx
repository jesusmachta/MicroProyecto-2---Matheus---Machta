import styles from './RegisterPage.module.css';
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import { InputControl } from "./InputControl/InputControl";
import {auth } from "../firebase";
import { GoogleLoginButton } from './GoogleLoginButton';
import Survey from "./Survey"; 
// import { getGamesTitleHTML, getGames } from './GetGames';
import { saveUser } from './GuardarUsuarioDB';


export default function Register() {
 

    const navigate = useNavigate();
    const [values, setvalues] = useState({ name: "", email: "", password: "",favoriteGame: "The Witcher 3: Wild Hunt", subscriptions: [""] });
    const [errorMsg, setErrorMsg] = useState([]);
    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false); 
    const defaultValue = "The Witcher 3: Wild Hunt"; 
   
    const registro = () => {
      if (!values.name || !values.email || !values.password ) {
        setErrorMsg("Campos invalidos");
        return;
      }
      setErrorMsg("");
      setSubmitButtonDisabled(true);
      // console.log(selectedTitle); 
      // setvalues((prev) => ({
      //   ...prev,
      //   favoriteGame: selectedTitle,
      // }));

      createUserWithEmailAndPassword(auth, values.email, values.password, values.favoriteGame)
        .then(async (res) => {
          setSubmitButtonDisabled(false);
          const user = res.user;
          await updateProfile(user, {
            displayName: values.name,
            
          });
          console.log(values); 
          saveUser(values); 
           

          navigate("/");
        })
        .catch((err) => {
          setSubmitButtonDisabled(false);
          setErrorMsg(err.message);
        });
    };
    useEffect(() => {
      const guardarPerfil = async (user) => {
        try {
          const userProfile = {
            displayName: values.name,
          };
          await updateProfile(user, userProfile);
          // console.log(user);
          // saveUser(user); 
        } catch (error) {
          console.log(error);
        }
      };

   
      
      const unsubscribe = auth.onAuthStateChanged((user) => {
        if (user) {
          navigate("/");
          guardarPerfil(user);
        }
      });
      return unsubscribe;
    }, [navigate, values.name]);
  
    return (
      <div className={styles.container}>
        <div className={styles.innerBox}>
          <h1 className={styles.heading}>Registro</h1>
          <InputControl
            label="Nombre"
            placeholder="Ingrese un nombre"
            onChange={(event) =>
              setvalues((prev) => ({ ...prev, name: event.target.value }))
            }
          />
          <InputControl
            label="Email"
            placeholder="Ingrese un correo"
            onChange={(event) =>
              setvalues((prev) => ({ ...prev, email: event.target.value }))
            }
          />
          <InputControl
            label="Contraseña"
            placeholder="Ingrese una contraseña"
            onChange={(event) =>
              setvalues((prev) => ({ ...prev, password: event.target.value }))
            }
          />
          <p> Ingrese su juego favorito: </p>
            <Survey setvalues={setvalues}
            defaultValue={defaultValue}
            
              // onChange = {(event) =>
              //   setvalues((prev) => ({...prev, favoriteGame: selectedTitle}))
              // }
            ></Survey>
          <div className={styles.footer}>
            <b className={styles.error}>{errorMsg}</b>
            <button className = {styles.botonRegistro} onClick={registro} disabled={submitButtonDisabled}>
              Registrarse
            </button>
            <GoogleLoginButton></GoogleLoginButton>
            <button>
                <Link to="/login"> Iniciar sesión</Link>
            </button>
            
          </div>
        </div>
      </div>
    );
  }

  // const handleSelection = (event) => { // Función para manejar la selección del usuario
  //   setSelectedTitle(event.target.value);
  // }