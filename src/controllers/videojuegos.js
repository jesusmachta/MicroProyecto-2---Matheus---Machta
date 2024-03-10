import {collection, getDocs} from "firebase/firestore";
import {db} from "../firebase";

// para obtener los juegos
export async function getGames(){
    
    const juegosRef = collection(db, 'Videojuegos'); 
    const juegosDoc = await getDocs(juegosRef); 
    const juegos = juegosDoc.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
    })); 
    console.log(juegos)
    console.log(typeof juegos); 
    return juegos;  
}

export async function getGamesTitle(){
    
    const juegosRef = collection(db, 'Videojuegos'); 
    const juegosDoc = await getDocs(juegosRef); 
    const juegos = juegosDoc.docs.map((doc) => doc.data().titulo); 
    console.log(juegos)
    return juegos;  

}

export async function getGamesGenre(){
    
    const juegosRef = collection(db, 'Videojuegos'); 
    const juegosDoc = await getDocs(juegosRef); 
    const juegos = juegosDoc.docs.map((doc) => doc.data().genero); 
    console.log(juegos)
    return juegos;  

}

export async function getGamesDescription(){
    
    const juegosRef = collection(db, 'Videojuegos'); 
    const juegosDoc = await getDocs(juegosRef); 
    const juegos = juegosDoc.docs.map((doc) => doc.data().descripcion); 
    console.log(juegos)
    return juegos;  

}