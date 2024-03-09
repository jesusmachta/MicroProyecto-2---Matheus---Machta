import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
export function GoogleSignUpButton(){
    const signinWithGoogle = async () =>{
        try{
            const result = await signInWithPopup(auth, googleProvider);
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
            <span>    Iniciar Sesión con Google</span>

        </button>
    )
}
