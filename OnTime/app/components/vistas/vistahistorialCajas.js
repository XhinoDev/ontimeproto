import {
    getDatabase,
    ref,
    get,
    onChildChanged
  } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-database.js";
import { tabActive } from "../tabActive.js";
import { renderTableHistoryConv } from "../renderTableHistoryConv.js";

export function cargarVistaHistorialCajas(){
    const db = getDatabase(), d = document;
    const refItems = ref(db, "history-convs");
    let modal = document.getElementById("myModal");
    let keyUpdate = null, initialData = {},
    updateValue = {}; 
    tabActive("hCajas"); 

    
    get(refItems)
   .then((snapshot) => {
       if (snapshot.exists()) {
       initialData = snapshot.val();
       renderTableHistoryConv(initialData);
      } else {
        console.log("No se encontraron datos.");
      }
     })
   .catch((error) => {
       console.error("Error al obtener los datos:", error);
        });

}