import {collection, getDocs} from "firebase/firestore";
import {db} from "../firebase";

// para obtener los clubes
export async function getClub(){
    
    const clubRef = collection(db, 'Club'); 
    const clubDoc = await getDocs(clubRef); 
    const club = clubDoc.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
    })); 
    console.log(club)
    console.log(typeof club); 
    return club;  
}