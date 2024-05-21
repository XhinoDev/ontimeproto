import {
    getDatabase,
    ref,
    get,
    onChildChanged
  } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-database.js";
import { tabActive } from "../tabActive.js";
import { renderTableHistoryUnits } from "../renderTableHistoryUnits.js";

export function cargarVistaHistorialUnidades(){
    const db = getDatabase(), d = document;
    const refItems = ref(db, "history-units");
    let modal = document.getElementById("myModal");
    let keyUpdate = null, initialData = {},
    updateValue = {}; 
    tabActive("hUnidades"); 

    
    get(refItems)
   .then((snapshot) => {
       if (snapshot.exists()) {
       initialData = snapshot.val();
       renderTableHistoryUnits(initialData);
      } else {
        console.log("No se encontraron datos.");
      }
     })
   .catch((error) => {
       console.error("Error al obtener los datos:", error);
        });

}