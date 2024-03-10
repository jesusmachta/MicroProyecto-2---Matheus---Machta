import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { saveUser } from "./GuardarUsuarioDB";
import { Navigate } from "react-router-dom";
export function GoogleLoginButton(){
    const signinWithGoogle = async () =>{
        try{
            const result = await signInWithPopup(auth, googleProvider);
            const userCredential = result.user; 
            // datos del usuario: 
            const userEmail = userCredential.email; 
            const name = userCredential.displayName; 
            const password = "********"; 
            const favoriteGame = "The Witcher 3: Wild Hunt"; 
            const usuario ={
                email: userEmail,
                favoriteGame: favoriteGame, 
                name: name, 
                password: password,  
            }
            saveUser(usuario); 
            Navigate('/profile'); 


            // auth, values.email, values.password, values.favoriteGame
            console.log(result);
            
        }catch (error){
            console.error(error);
        }
     };
    return(
        <button className="button-google" onClick={signinWithGoogle}>
                
            <img 
            src="https://cdn.icon-icons.com/icons2/2415/PNG/512/google_original_logo_icon_146496.png" 
            alt="Google Icon"
            style={{width: '15px', height:'15px'}}
            />
            <span>    Registrate con Google</span>

        </button>
    )
}