import {InputControl} from './InputControl/InputControl'; 
import styles from './RegisterPage.module.css'; 
import { GoogleLoginButton } from './GoogleLoginButton';
export default function RegisterPage() {
    return(
    <div className = {styles.container}>
        <div className = {styles.innerBox}>
        <h1>¡Registrate!</h1>
        <InputControl
            label="Nombre"
            placeholder ="Ingrese su nombre"
            onChange={(event)=> 
                setvalues((prev)=> ({...prev, name: event.target.value}))
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
                setvalues((prev)=> ({...prev, password: event.target.value}))
            }
        />
        {/* falta las funcionalidades */}
        <button>Registrarse</button>
        <GoogleLoginButton></GoogleLoginButton>
        <button>Login</button>
        </div>
    </div>)
    
   
    
}
