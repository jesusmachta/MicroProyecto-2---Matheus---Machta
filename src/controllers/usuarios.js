import { collection, updateDoc, doc} from "firebase/firestore";
import {auth,db} from '../firebase'; 
import { UserContext, useUser } from "../context/user";
import { updateEmail, updateProfile } from "firebase/auth";


export async function updateUser(id,  {email,favoriteGame, name}){
    const moviesCollection = collection(db, "Usuarios"); 
    await updateDoc(doc(moviesCollection, id),{
        email, 
        favoriteGame, 
        name, 
    }); 

    const userL = useUser(); 
    try{
        if(email){
            await updateEmail(userL, password); 
        }
        
        await updateProfile(userL, {
            displayName: name 
        }); 
        console.log("Se logró actualizar con éxito en la base de datos y en el auth"); 
    }catch(error){
        console.log("No se logró actualizar con éxito: ", error); 
    }

}