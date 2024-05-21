import {
    getDatabase,
    ref,
    get,
    onValue,
    onChildChanged,
    update,
    remove
  } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-database.js";
  import { tabActive } from "../tabActive.js";
import { renderTableHistory } from "../renderTableHistory.js";
import { Loader } from "../Loader.js";


 // Función para cargar la vista productiva para el usuario dado
 export function cargarVistaHistorial(user) {
  const db = getDatabase(), d = document;
  const refItems = ref(db, "historialviajes");
  let modal = document.getElementById("myModal");
  let keyUpdate = null, initialData = {},
  updateValue = {};  

  d.querySelector(".head-ul").innerHTML = `
  <li class="head-li productivos">
  <a class="productivos">Productivos</a>
</li>
<li class="head-li retornables">
  <a>Retornables</a>
</li>
<li class="head-li historial">
  <a>Historial</a>
</li>
  `;

d.querySelector(".container-main").innerHTML = `
<div class="header-main">
<div class="detail-header-main">
  <div class="detail-date">
  <h2 style="padding: 0;font-size: 1.4rem;">HISTORIAL DE VIAJES COMPLETOS</h2>
  <button class="entregaturno modal-boton">Exportar a EXCEL</button>
  </div>
</div>
<form class="search-form">
  <div class="search-content">
    <img src="../app/assets/icons8-búsqueda-49.png"  alt="search" />
    <input
      type="search"
      name="search"
      placeholder="Buscar"
      class="input"
    />
  </div>
</form>
</div>
<div class="container-table">
<div id="thtable">

  
</div>
</div>
`;

  tabActive("historial");
  
  d.querySelector("#thtable").insertAdjacentElement("beforeend", Loader());

  get(refItems)
 .then((snapshot) => {
     if (snapshot.exists()) {
     initialData = snapshot.val();
     renderTableHistory(initialData); 
    } else {
      console.log("No se encontraron datos.");
    }
   })
 .catch((error) => {
     console.error("Error al obtener los datos:", error);
      });

  function updateItem (updateValue, keyUpdate){
    if (!updateValue || !keyUpdate ) return;
    if(!d.getElementById(`${keyUpdate}`) || d.getElementById(`${keyUpdate}`) === null) return;
    get(refItems)
    .then((snapshot) => {
     if (snapshot.exists()) {
     initialData = snapshot.val();
       renderTableHistory(initialData); 
       d.getElementById(`${keyUpdate}`).classList.add("parpadeo");
       setTimeout(function () {
         d.getElementById(`${keyUpdate}`).classList.remove("parpadeo"); // Elimina la clase de parpadeo después de 1 segundo
       }, 1000); 
     } else {
      console.log("No se encontraron datos.");
     }
      })
    .catch((error) => {
      if(d.getElementById(`${keyUpdate}`).classList.add("parpadeo") === null) return
       // console.error("Error al obtener los datos:", error);
         });
     
    }


  if(localStorage.tabViajes === "true"){      
    
    onChildChanged(refItems, (snapshot) => {
       updateValue = snapshot.val();
       keyUpdate = snapshot.key;
       updateItem(updateValue, keyUpdate);
      });

      d.addEventListener("search", e => {
        if(!e.target.matches("input[type='search']")) return false;
        if(!e.target.value)localStorage.removeItem("apiSearch");
    });

    d.addEventListener("submit", e => {
        
        if(!e.target.matches(".search-form")) return false;
        e.preventDefault();
        localStorage.setItem("apiSearch", e.target.search.value);
       //console.log(location.hash);
       
    });
    }

}