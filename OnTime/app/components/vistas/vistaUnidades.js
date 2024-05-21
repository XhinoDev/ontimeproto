import {
  getDatabase,
  ref,
  get,
  onValue,
  onChildChanged,
  update
  } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-database.js";
  import { tabActive } from "../tabActive.js";
import { renderTableUnits } from "../renderTableUnits.js";
import { ItemUnit } from "../ItemUnits.js";

 export function cargarVistaUnidades(user) {
  const db = getDatabase(), d = document;
  const refItems = ref(db, "subitem");
  let modal = document.getElementById("myModal");
  let keyUpdate = null,
  updateValue = {}; 

  d.querySelector(".head-ul").innerHTML = `
<li class="head-li unidades">
  <a class="unidades">Unidades</a>
</li>
<li class="head-li cajas">
  <a>Cajas</a>
</li>
<li class="head-li historialUnidades">
  <a>H. Unidades</a>
</li>
<li class="head-li historialCajas">
  <a>H. Cajas</a>
</li>
  `;

d.querySelector(".container-main").innerHTML = `
<div class="header-main">
<div class="detail-header-main">
  <div class="detail-date">
  <h3>Filtro por:</h3>
  <span><b>Estatus</b></span>
  </div>
</div>
<form>
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
  tabActive("unidades"); 

  get(refItems)
  .then((snapshot) => {
      if (snapshot.exists()) {
      const data = snapshot.val();
      renderTableUnits(data); 
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

         d.getElementById(`${keyUpdate}`).innerHTML = `${ItemUnit(updateValue, keyUpdate)}`;
         d.getElementById(`${keyUpdate}`).classList.add("parpadeo");
       setTimeout(function () {
         d.getElementById(`${keyUpdate}`).classList.remove("parpadeo");
       }, 1000); 
      
     }

    if(localStorage.tabUnit === "true" && localStorage.tabConveyance === "false" && localStorage.tabViajes === "false"){
    
      onChildChanged(refItems, (snapshot) => {
        updateValue = snapshot.val();
        keyUpdate = snapshot.key;
        updateItem(updateValue, keyUpdate);
       });
    }
        
}

