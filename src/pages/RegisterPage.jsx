import {InputControl} from './InputControl/InputControl'; 
import styles from './RegisterPage.module.css'; 
import { GoogleLoginButton } from './GoogleLoginButton';
import {useState} from "react"; 
import { Link } from "react-router-dom";

export default function RegisterPage() {
    const[setValues] = useState({name:"", email:"", password:""}); 
    return(
    <div className = {styles.container}>
        <div className = {styles.innerBox}>
        <h1>¡Registrate!</h1>
        <InputControl
            label="Nombre"
            placeholder ="Ingrese su nombre"
            onChange={(event)=> 
                setValues((prev)=> ({...prev, name: event.target.value}))
            }
        />
        <InputControl
            label="Correo"
            placeholder="Ingrese su correo"
            onChange={(event)=>
                setValues((prev)=>({...prev, email: event.target.value}))
            }
        />
        <InputControl 
            label="Contraseña"
            placeholder="Ingrese una contraseña"
            onChange={(event) =>
                setValues((prev)=> ({...prev, password: event.target.value}))
            }
        />
        
        <button>Registrarse</button>
        <GoogleLoginButton></GoogleLoginButton>
        <button>
            <Link to="/login"> Login</Link>
        </button>
        
        </div>
    </div>)
    
   
    
}
