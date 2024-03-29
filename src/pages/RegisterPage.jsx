import styles from "./RegisterPage.module.css";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { InputControl } from "./InputControl/InputControl";
import { auth } from "../firebase";
import { GoogleLoginButton } from "./GoogleLoginButton";
import Survey from "./Survey";
import { saveUser } from "./GuardarUsuarioDB";
import Swal from "sweetalert2";

export default function Register() {
  const navigate = useNavigate();
  const [values, setvalues] = useState({
    name: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    favoriteGame: "The Witcher 3: Wild Hunt",
    subscriptions: "",
  });
  const [errorMsg, setErrorMsg] = useState([]);
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const mostrarAlert = () => {
    Swal.fire({
      icon: "success",
      title: "Registro exitoso",
      text: "Usted fue registrado exitosamente",
      showCancelButton: false,
      showCloseButton: true,
      showConfirmButton: false,
    });
  };

  const registro = () => {
    if (
      !values.name ||
      !values.lastName ||
      !values.username ||
      !values.email ||
      !values.password
    ) {
      setErrorMsg("Campos invalidos");
      return;
    }
    setErrorMsg("");
    setSubmitButtonDisabled(true);

    createUserWithEmailAndPassword(
      auth,
      values.email,
      values.password,
      values.favoriteGame
    )
      .then(async (res) => {
        setSubmitButtonDisabled(false);
        const user = res.user;
        await updateProfile(user, {
          displayName: values.name,
          displayLastname: values.lastName,
          displayUsername: values.username,
        });
        console.log(values);

        saveUser(values);
        mostrarAlert();

        navigate("/profile");
      })
      .catch((err) => {
        setSubmitButtonDisabled(false);
        setErrorMsg(err.message);
      });
  };
  [
    navigate,
    values.name,
    values.lastName,
    values.username,
    values.email,
    values.password,
    values.favoriteGame,
  ];
  useEffect(() => {
    const guardarPerfil = async (user) => {
      try {
        const userProfile = {
          displayName: values.name,
          displayLastname: values.lastName,
          displayUsername: values.username,
        };
        await updateProfile(user, userProfile);
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
  }, [navigate, values.name, values.lastName, values.username]);

  return (
    <div>
      <div>
        <h1 className={styles.heading}>Registro</h1>
        <InputControl
          label="Nombre"
          placeholder="Ingrese un nombre"
          onChange={(event) =>
            setvalues((prev) => ({ ...prev, name: event.target.value }))
          }
        />
        <InputControl
          label="Apellido"
          placeholder="Ingrese un apellido"
          onChange={(event) =>
            setvalues((prev) => ({ ...prev, lastName: event.target.value }))
          }
        />
        <InputControl
          label="Apodo"
          placeholder="Ingrese un apodo"
          onChange={(event) =>
            setvalues((prev) => ({ ...prev, username: event.target.value }))
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
        <Survey
          setvalues={setvalues}
          favoriteGame={values.favoriteGame}
          onChange={(selectedGame) =>
            setvalues((prev) => ({ ...prev, favoriteGame: selectedGame }))
          }
        />
        <div className={styles.footer}>
          <b className={styles.error}>{errorMsg}</b>
          <button
            className={styles.botonRegistroo}
            onClick={registro}
            disabled={submitButtonDisabled}
          >
            Registrarse
          </button>
          <GoogleLoginButton className={styles.botonRegistroo} />
          <button className={styles.botonRegistroo}>
            <Link to="/login"> Iniciar sesión</Link>
          </button>
        </div>
      </div>
    </div>
  );
}
