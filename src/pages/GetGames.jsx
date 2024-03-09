
import {db} from '../firebase'; 
import {collection, getDocs, doc} from "firebase/firestore"; 
import Survey from "./Survey"; 




// para obtener los juegos
export async function getGames(){
    
        const juegosRef = collection(db, 'Videojuegos'); 
        const juegosDoc = await getDocs(juegosRef); 
        const juegos = juegosDoc.docs.map((doc) => doc.data()); 
        console.log(juegos)
        console.log(typeof juegos); 
        return juegos;  
  
}

// para tener una lista con solo los nombres de los videojuegos 


// export const generateListGames = (juegos)=>{
//     return juegos.map((juego) => juego.titulo); 
// }; 

// para obtener los juegos

export async function getGamesTitle(){
    
    const juegosRef = collection(db, 'Videojuegos'); 
    const juegosDoc = await getDocs(juegosRef); 
    const juegos = juegosDoc.docs.map((doc) => doc.data().titulo); 
    console.log(juegos)
    return juegos;  

}


// export async function getGamesTitleHTML(){
    
//     const juegosRef = collection(db, 'Videojuegos'); 
//     const juegosDoc = await getDocs(juegosRef); 
//     const juegos = juegosDoc.docs.map((doc) => doc.data().titulo); 
//     console.log(juegos)
//     return(
//         <Survey juegos = {juegos}></Survey>
//     ) 

// }
