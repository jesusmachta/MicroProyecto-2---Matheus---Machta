import {Link} from 'react-router-dom'; 
import styles from "./Navbar.module.css"

 
export default function Navbar(){
    return(
        <header className={styles.container}>
            <div>
                <img className={styles.logo} src="https://cdn-icons-png.freepik.com/512/2737/2737379.png"/>
            </div>
            <div className = {styles.secondDiv}>
            <nav className={styles.navigation}>
                <Link to="/">PÁGINA PRINCIPAL</Link>
                <Link to="/register">REGISTRARSE</Link>
                <Link to="/Login">LOGIN</Link>
                <Link to ="/search">BUSCADOR </Link>
            </nav>
            </div>
            
        </header>
    )
}
