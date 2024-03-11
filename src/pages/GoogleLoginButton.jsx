import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { saveUser } from "./GuardarUsuarioDB";
import { useNavigate } from "react-router-dom";
import styles from "./RegisterPage.module.css";
export function GoogleLoginButton() {
  const navigate = useNavigate();
  const signinWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const userCredential = result.user;
      // datos del usuario:
      const userEmail = userCredential.email;
      const name = userCredential.displayName;
      const password = "********";
      const favoriteGame = "The Witcher 3: Wild Hunt";
      const usuario = {
        email: userEmail,
        favoriteGame: favoriteGame,
        name: name,
        subscriptions: [""],
        lastName: "",
        username: "",
      };
      saveUser(usuario);
      navigate("/profile");

      // auth, values.email, values.password, values.favoriteGame
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className={styles.botonRegistroo}>
      <button onClick={signinWithGoogle}>
        <img
          src="https://cdn.icon-icons.com/icons2/2415/PNG/512/google_original_logo_icon_146496.png"
          alt="Google Icon"
          style={{ width: "15px", height: "15px", marginLeft: "30%" }}
        />
        <span>Registrate con Google</span>
      </button>
    </div>
  );
}
