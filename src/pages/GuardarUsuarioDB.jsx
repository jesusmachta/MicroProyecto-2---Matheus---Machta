import {collection, addDoc} from "firebase/firestore"; 
import {db} from "../firebase"; 

export async function saveUser(user){
    try{
        console.log('flaggggg'); 
        console.log(user); 
        const usuariosRef = collection(db, "Usuarios"); 
        await addDoc(usuariosRef, user); 
        console.log("guardado con exito"); 
    }catch(e){
        console.error('Error al guardar el usuario: ', e); 
    }
}





