import Navbar from "./Navbar";
import { InputControl } from "../pages/InputControl/InputControl";
import styles from "./Perfil.module.css"; 
import {auth,db} from '../firebase'; 
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {collection,  where, query, getDocs} from "firebase/firestore"; 
import { UserContext, useUser } from "../context/user";
import { updateUser } from "../controllers/usuarios";
// import {firestore} from 'firebase'; 

export default function Perfil() {
        // const[userOriginalEmail, setUserOriginalEmail] = useState(null);// el correo original del usuario por si desea cambiar tener como actualizar en auth
        const userL = useUser(); 
        console.log(userL); 
        const [userEmail, setUserEmail] = useState(null);  
        const nav = useNavigate(); 
        const [userid, setUserid] = useState(null); 
        const [userName, setUserName] = useState(null);
        const [userPassword, setUserPassword] = useState(null);
        const [userFavoriteGame, setUserFavoriteGame] = useState(null);
        const[datosCargados, setDatosCargados] = useState(false); 
        const handleUpdate = async()=> {
                console.log("Datos usuarios: ")
                console.log(userEmail); 
                console.log(userName); 
                console.log(userFavoriteGame); 

                await updateUser(userid, {userEmail, userFavoriteGame, userName}); 
        }; 

        useEffect(()=>{
                
                if(userL){
                        setUserEmail(userL.email);
                        // setUserOriginalEmail(userL.email);  
                        
                }

                const findUser = async()=>{
                        try{
                             
                                const querySnapshot = await getDocs(query(collection(db, "Usuarios"), where('email','==', userEmail))); 
                                
                                querySnapshot.forEach((doc) =>{
                                        setUserid(doc.id); 
                                        setUserName(doc.data().name); 
                                        setUserPassword(doc.data().password); 
                                        setUserFavoriteGame(doc.data().favoriteGame); 
                                        setDatosCargados(true); 
                                     });  
                        }catch(error){
                                        console.log("Error buscando el doc: ", error); 
                                }
        
                                        
                                     
                                
                    

                }; findUser(); 
        },[nav, userEmail, userL]); 

        // const changeValues =()=>{
        //     const documentRef = getDoc(db, collection, userid); 
        //     const fieldsToUpdate ={
        //         email: {userEmail}, 
        //         favoriteGame: {userFavoriteGame}, 
        //         name: {userName},
        //     }; 
        //     try{
        //         updateDoc(documentRef, fieldsToUpdate); 
        //     }catch{
        //         console.log("No se logró actulizar"); 
        //     }
        // }
        const logOut =() =>{
                auth.signOut(); 
                nav("/register"); 

        }
if(datosCargados){
    return (
        <div className={styles.container}>
            <Navbar />
            <div>
                <h1>TU PERFIL</h1>
            </div>
            <div className={styles.containerInfo}>
                <h2>Nombre: </h2>
                <InputControl
                        placeholder = {userName}
                        onChange = {(event) => 
                                setUserName(event.target.value)
                        }
                ></InputControl>
                <h2>Correo: </h2>
                <InputControl
                        placeholder = {userEmail}
                        onChange ={(event)=>
                                setUserEmail(event.target.value)
                        }
                ></InputControl>
                <h2>Contraseña: </h2>
                <InputControl
                 placeholder = {userPassword}
                ></InputControl>
                <h2>Juego favorito</h2>
                <div className={styles.containerBotones}>
                <button onClick = {logOut} className={styles.botonIzq}>Cerrar sesión</button>
                <button onClick = {handleUpdate} className={styles.botonDer}>Guardar Cambios</button>{" "}
                </div>
                 
                </div>
            </div>
            );
                    }
                }
