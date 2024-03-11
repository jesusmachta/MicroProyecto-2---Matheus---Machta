
import { collection, updateDoc, doc} from "firebase/firestore";
import {db} from '../firebase'; 
import { updateEmail, updateProfile, sendEmailVerification } from "firebase/auth";
import Swal from 'sweetalert2'; 

export async function UpdateUserFunction({ id, email, favoriteGame, name,  userL, favoriteGameRef, emailRef, nameRef, username, usernameRef }) {

  const mostrarAlert =(text, icon, title) =>{
    Swal.fire({
      icon: icon, 
      title: title,
      text: text,
      showCancelButton: false,
      showCloseButton: true,
      showConfirmButton: false
    });
  }

      const usersCollection = collection(db, "Usuarios"); 
      console.log("Dentro de la funcion"); 
      console.log(favoriteGame); 
      if(favoriteGameRef !== null){
        favoriteGame = favoriteGameRef; 
        console.log(favoriteGame); 
      }

      if(emailRef !== null && emailRef.length >0 ){
        email = emailRef; 
        
      }

      if(nameRef !== null && nameRef.length > 0){
        name = nameRef; 
        console.log(name); 
      }

      if(usernameRef !== null && usernameRef.length>0){
        username = usernameRef; 
        
      }

    
      await updateDoc(doc(usersCollection, id),{
          email, 
          favoriteGame, 
          name, 
          username, 
           
      }); 
      window.location.reload(); 
      console.log("Se logro cambiar los datos en la base de datos");
      mostrarAlert("Se cambiaron sus datos exitosamente", 'success', 'Cambio de datos exitoso'); 
  
}