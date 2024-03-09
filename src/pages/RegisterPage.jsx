import styles from './RegisterPage.module.css';
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import { InputControl } from "./InputControl/InputControl";
import {auth } from "../firebase";
import { GoogleLoginButton } from './GoogleLoginButton';
//import Survey from "./Survey"; 

export default function Register() {
    //const juegos = [" Catalina", "Jesus", "Luis"]
    const navigate = useNavigate();
    const [values, setvalues] = useState({ name: "", email: "", password: "" });
    const [errorMsg, setErrorMsg] = useState([]);
    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false); 
    const registro = () => {
      if (!values.name || !values.email || !values.password) {
        setErrorMsg("Campos invalidos");
        return;
      }
      setErrorMsg("");
      setSubmitButtonDisabled(true);
      createUserWithEmailAndPassword(auth, values.email, values.password)
        .then(async (res) => {
          setSubmitButtonDisabled(false);
          const user = res.user;
          await updateProfile(user, {
            displayName: values.name,
          });
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
          console.log(user);
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
          <div className={styles.footer}>
            <b className={styles.error}>{errorMsg}</b>
            <button onClick={registro} disabled={submitButtonDisabled}>
              Guardar
            </button>
            <GoogleLoginButton></GoogleLoginButton>
            <button>
                <Link to="/login"> Login</Link>
            </button>
          </div>
        </div>
      </div>
    );
  }

