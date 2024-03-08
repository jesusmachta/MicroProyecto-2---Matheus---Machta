import logo from '../assets'
export default function Navbar(){
    return(

        <header>
            <img src = {logo}></img>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/login">Registrarse</Link>
            </nav>
        </header>
    )
}