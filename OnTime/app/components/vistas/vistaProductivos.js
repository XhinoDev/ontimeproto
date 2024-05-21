import {
    getDatabase,
    ref,
    get,
    onChildChanged,
    onChildAdded
  } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-database.js";
  import { renderTable } from "../renderTable.js";
  import { tabActive } from "../tabActive.js";
  import { Loader } from "../Loader.js";



  export function cargarVistaProductiva(user) {
    const db = getDatabase(), d = document;
    const refItems = ref(db, "productivos"), refChanges = ref(db, "registros");
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
      <button class="reg modal-boton">Agregar Viaje Adicional: +</button>
      <button class="entregaturno modal-boton">Resumen del Día</button>
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

    tabActive("productivos");

    d.querySelector("#thtable").insertAdjacentElement("beforeend", Loader());
    
    get(refItems)
   .then((snapshot) => {
       if (snapshot.exists()) {
       initialData = snapshot.val();
       renderTable(initialData); 
      } else {
        console.log("No se encontraron datos.");
      }
     })
   .catch((error) => {
       console.error("Error al obtener los datos:", error);
        });


      function mostrarPopup(data) {  
        if(document.getElementById("popupContent")){
           const node = document.getElementById("popupContent");
          if (node.parentNode.parentElement) {
             node.parentNode.parentElement.remove();
          }
        }
        

            if (localStorage.tabViajes === "true"){
              d.querySelector("#root").insertAdjacentHTML("beforeend", `
              <div class="popup-container" id="popupContainer">
              <div class="popup" id="popup">
                  <span id="popupContent" style="font-weight: bold;"></span>
                  <p class="popP" id="popopContentTH" style="font-size: 14px;"></p>
                  <p class="popP" style="font-weight: bold;" id="popupContent2"></p>
              </div>
              </div>
              `);

              const popupContainer = document.getElementById('popupContainer');
              const popupContent = document.getElementById('popupContent');
              const popupContent2 = document.getElementById('popupContent2');
              const popupContentTH = document.getElementById('popopContentTH');
          
              // Mostrar el contenido en el pop-up
              popupContent.textContent = `${data.user}`;
              popupContentTH.textContent = `Actualizó load: ${data.body.tracking}`;
              popupContent2.textContent = `${data.body.cliente.slice(0, 25)} - ${data.body.ruta.slice(0, 6)} - ${data.body.stop1.slice(0, 25)}`;
              
          
          
              // Mostrar el pop-up
              popupContainer.style.visibility = 'visible';
              
              // Ocultar el pop-up después de 3 segundos
              setTimeout(() => {
                  popupContainer.style.visibility = 'hidden';
              }, 5000);
            }

          
      }


    function updateItem (updateValue, keyUpdate){
      if (!updateValue || !keyUpdate ) return;
      if(!d.getElementById(`${keyUpdate}`) || d.getElementById(`${keyUpdate}`) === null) return;
           let status = d.getElementById(`status-${keyUpdate}`);
           let $estatusllegada = d.getElementById(`estatusllegada-${keyUpdate}`);
      
      d.querySelector(`#${keyUpdate} #status-${keyUpdate}`).value = updateValue.status;
       d.querySelector(`#${keyUpdate} #cporte-${keyUpdate}`).value = updateValue.cporte;
        d.querySelector(`#${keyUpdate} #bol-${keyUpdate}`).value = updateValue.bol;
        d.querySelector(`#${keyUpdate} #operador-${keyUpdate}`).value = updateValue.operador;
        d.querySelector(`#${keyUpdate} #inputUnidad-${keyUpdate}`).value = updateValue.unidad;
        d.querySelector(`#${keyUpdate} #inputCaja-${keyUpdate}`).value = updateValue.caja;
        d.querySelector(`#${keyUpdate} #estatusllegada-${keyUpdate}`).value = updateValue.estatusllegada;
        d.querySelector(`#${keyUpdate} #inputComentarios-${keyUpdate}`).value = updateValue.comentarios;
        d.querySelector(`#${keyUpdate} #inputLlegadaPU-${keyUpdate}`).value = updateValue.llegadareal1;
        d.querySelector(`#${keyUpdate} #inputSalidaPU-${keyUpdate}`).value = updateValue.salidareal1;
        d.querySelector(`#${keyUpdate} #inputLlegadaDL-${keyUpdate}`).value = updateValue.llegadareal2;
        d.querySelector(`#${keyUpdate} #inputSalidaDL-${keyUpdate}`).value = updateValue.salidareal2;
              
        if(updateValue.status.match("TRANSITO")){
          status.parentElement.style.backgroundColor = "#c2dffa";
        } else if(updateValue.status.match("DET") || updateValue.status.match("ESP")){
          status.parentElement.style.backgroundColor = "#791d1d4f";
        } else if(updateValue.status.match("PROVEE") || updateValue.status.match("PLANT") || updateValue.status.match("CARGA")){
          status.parentElement.style.backgroundColor = "#00508d59";
        } else if(updateValue.status.match("PENDIENTE")){
          status.parentElement.style.backgroundColor = "#f2aa0036";
        }   

        if(updateValue.estatusllegada.match("A TIEMPO")){
          $estatusllegada.parentElement.style.backgroundColor = "#c2dffa";
        } else if(updateValue.estatusllegada.match("DESFASADA")){
          $estatusllegada.parentElement.style.backgroundColor = "#e1dcc9";
        } else if(updateValue.estatusllegada.match("TARDE") || updateValue.estatusllegada.match("CRITICA")){
          $estatusllegada.parentElement.style.backgroundColor = "#bdaab9";
        } 

        
        

              d.getElementById(`${keyUpdate}`).classList.add("parpadeo");           
               setTimeout(function () {
                 d.getElementById(`${keyUpdate}`).classList.remove("parpadeo");
               }, 1000); 
           
      }

    


    if(localStorage.tabViajes === "true"){      
       onChildChanged(refItems, (snapshot) => {
         updateValue = snapshot.val();
         keyUpdate = snapshot.key;
         updateItem(updateValue, keyUpdate);
        }); 
      }

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

    onChildAdded(refChanges, (snapshot) => {
      let changes = snapshot.val();
      console.log(changes.user,`Actualizó Load: ${changes.body.tracking}`, changes);
      mostrarPopup(changes);
    }); 

}
